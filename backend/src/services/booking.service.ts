import { prisma } from "../config/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import crypto from "crypto";

// ─── Types cho Raw SQL Results ─────────────────────
interface AvailableUnit {
  inventory_unit_id: string;
  barcode: string;
  size: string;
  color: string;
}

interface BookingItemRaw {
  id: string;
  inventory_unit_id: string;
  item_type: string;
  start_date: Date;
  end_date: Date;
}

// ─── Trạng thái hợp lệ của đơn đặt ────────────────
const VALID_STATUSES = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED", "RETURNED"] as const;
type BookingStatus = (typeof VALID_STATUSES)[number];

export class BookingService {
  /**
   * 1. Kiểm tra tình trạng trống (Availability) của 1 sản phẩm
   * Dùng Raw SQL để kiểm tra GiST constraint trên `daterange`
   */
  static async checkAvailability(productId: string, startDate: string, endDate: string) {
    const availableUnits = await prisma.$queryRaw<AvailableUnit[]>`
      SELECT iu.id as inventory_unit_id, iu.barcode, pv.size, pv.color
      FROM "InventoryUnit" iu
      JOIN "ProductVariant" pv ON iu.variant_id = pv.id
      WHERE pv.product_id = ${productId}::uuid
      AND iu.status = 'AVAILABLE'
      AND NOT EXISTS (
        SELECT 1 FROM "BookingItem" bi 
        WHERE bi.inventory_unit_id = iu.id
        AND bi.rental_period && daterange(${startDate}::date, ${endDate}::date, '[]')
      )
    `;

    return availableUnits;
  }

  /**
   * 2. Tạo đơn đặt thuê mới
   * BẮT BUỘC dùng Transaction để nếu lỗi ở BookingItem thì hủy luôn Booking
   */
  static async createBooking(data: {
    userId: string;
    totalPrice: number;
    items: {
      inventoryUnitId: string;
      startDate: string;
      endDate: string;
    }[];
  }) {
    return await prisma.$transaction(async (tx) => {
      // Bước 1: Tạo bảng Booking chính
      const booking = await tx.booking.create({
        data: {
          user_id: data.userId,
          total_price: data.totalPrice,
          status: "PENDING",
        },
      });

      // Bước 2: Tạo các món đồ bên trong (BookingItem)
      for (const item of data.items) {
        const itemId = crypto.randomUUID();

        try {
          // Phải dùng executeRaw vì Prisma không hỗ trợ insert trực tiếp kiểu daterange
          await tx.$executeRaw`
            INSERT INTO "BookingItem" (id, booking_id, inventory_unit_id, item_type, rental_period)
            VALUES (
              ${itemId}::uuid, 
              ${booking.id}::uuid, 
              ${item.inventoryUnitId}::uuid, 
              'PRIMARY', 
              daterange(${item.startDate}::date, ${item.endDate}::date, '[]')
            )
          `;
        } catch (error: any) {
          // Bắt lỗi xung đột thời gian (GiST Exclusion Constraint)
          if (
            error.code === "P2010" || 
            (error.message && error.message.includes("conflicting key value"))
          ) {
            throw ApiError.conflict(
              `Sản phẩm (Unit: ${item.inventoryUnitId}) đã bị đặt trong khoảng thời gian này! Vui lòng chọn ngày khác.`
            );
          }
          throw error;
        }
      }

      return booking;
    });
  }

  /**
   * 3. Lấy chi tiết 1 đơn đặt
   */
  static async getBookingById(bookingId: string) {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      throw ApiError.notFound("Không tìm thấy đơn đặt");
    }

    // Vì Prisma bỏ qua trường Unsupported("daterange"), ta phải dùng raw sql để lấy ra dạng text
    const items = await prisma.$queryRaw<BookingItemRaw[]>`
      SELECT id, inventory_unit_id, item_type, 
             lower(rental_period) as start_date, 
             upper(rental_period) as end_date
      FROM "BookingItem"
      WHERE booking_id = ${bookingId}::uuid
    `;

    return {
      ...booking,
      items,
    };
  }

  /**
   * 4. Cập nhật trạng thái đơn
   */
  static async updateStatus(bookingId: string, status: string) {
    // Validate trạng thái hợp lệ
    if (!VALID_STATUSES.includes(status as BookingStatus)) {
      throw ApiError.badRequest(
        `Trạng thái "${status}" không hợp lệ. Chỉ chấp nhận: ${VALID_STATUSES.join(", ")}`
      );
    }

    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) throw ApiError.notFound("Không tìm thấy đơn đặt");

    return await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
    });
  }

  /**
   * 5. Checkout từ Giỏ hàng (Cart)
   */
  static async checkoutCart(userId: string, addressData: any, paymentMethod: string) {
    return await prisma.$transaction(async (tx) => {
      // 1. Get cart
      const cart = await tx.cart.findUnique({
        where: { user_id: userId },
        include: { items: { include: { variant: { include: { product: true } } } } }
      });

      if (!cart || cart.items.length === 0) {
        throw ApiError.badRequest("Giỏ hàng của bạn đang trống!");
      }

      // 2. Create Address
      const address = await tx.address.create({
        data: {
          user_id: userId,
          full_name: addressData.fullName,
          phone: addressData.phone,
          street: addressData.street,
          city: addressData.city,
          district: addressData.district,
          ward: addressData.ward,
        }
      });

      // 3. Calculate total price
      let totalPrice = 0;
      for (const item of cart.items) {
        const durationDays = Math.ceil((item.rental_end_date.getTime() - item.rental_start_date.getTime()) / (1000 * 3600 * 24));
        totalPrice += Number(item.variant.product.rental_price) * (durationDays || 1);
      }
      
      const shippingFee = 30; // 30K phí ship giả định
      totalPrice += shippingFee;

      // 4. Create Booking
      const booking = await tx.booking.create({
        data: {
          user_id: userId,
          total_price: totalPrice,
          shipping_fee: shippingFee,
          status: "PENDING",
          shipping_address_id: address.id
        }
      });

      // 5. Create PaymentTransaction
      await tx.paymentTransaction.create({
        data: {
          booking_id: booking.id,
          amount: totalPrice,
          provider: paymentMethod || "COD",
          status: "PENDING"
        }
      });

      // 6. Assign Inventory Units & Create BookingItems
      for (const item of cart.items) {
        const startStr = item.rental_start_date.toISOString().split('T')[0];
        const endStr = item.rental_end_date.toISOString().split('T')[0];

        const availableUnits = await tx.$queryRaw<AvailableUnit[]>`
          SELECT iu.id as inventory_unit_id
          FROM "InventoryUnit" iu
          WHERE iu.variant_id = ${item.variant_id}::uuid
          AND iu.status = 'AVAILABLE'
          AND NOT EXISTS (
            SELECT 1 FROM "BookingItem" bi 
            WHERE bi.inventory_unit_id = iu.id
            AND bi.rental_period && daterange(${startStr}::date, ${endStr}::date, '[]')
          )
          LIMIT 1
        `;

        if (availableUnits.length === 0) {
          throw ApiError.conflict(`Sản phẩm ${item.variant.product.name} (Size: ${item.variant.size}) đã hết hàng trong khoảng thời gian bạn chọn.`);
        }

        const unitId = availableUnits[0].inventory_unit_id;
        const itemId = crypto.randomUUID();

        try {
          await tx.$executeRaw`
            INSERT INTO "BookingItem" (id, booking_id, inventory_unit_id, item_type, rental_period)
            VALUES (
              ${itemId}::uuid, 
              ${booking.id}::uuid, 
              ${unitId}::uuid, 
              'PRIMARY', 
              daterange(${startStr}::date, ${endStr}::date, '[]')
            )
          `;
        } catch (error: any) {
          if (error.code === "P2010" || (error.message && error.message.includes("conflicting key value"))) {
            throw ApiError.conflict(`Lỗi xung đột ngày thuê cho sản phẩm ${item.variant.product.name}.`);
          }
          throw error;
        }
      }

      // 7. Clear Cart
      await tx.cartItem.deleteMany({
        where: { cart_id: cart.id }
      });

      return booking;
    });
  }
}
