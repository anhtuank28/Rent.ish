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
        JOIN "Booking" b ON bi.booking_id = b.id
        WHERE bi.inventory_unit_id = iu.id
        AND b.status IN ('PENDING', 'CONFIRMED', 'SHIPPED')
        AND bi.status != 'CANCELLED'
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
            INSERT INTO "BookingItem" (id, booking_id, inventory_unit_id, item_type, status, rental_period)
            VALUES (
              ${itemId}::uuid, 
              ${booking.id}::uuid, 
              ${item.inventoryUnitId}::uuid, 
              'PRIMARY', 
              'ACTIVE', 
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

    const updated = await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
    });

    // Nếu hủy đơn hàng, giải phóng BookingItem để GiST constraint không chặn khách thuê mới
    if (status === "CANCELLED") {
      await prisma.$executeRaw`
        UPDATE "BookingItem"
        SET status = 'CANCELLED'
        WHERE booking_id = ${bookingId}::uuid
      `;
    }

    return updated;
  }

  /**
   * 4. Lấy danh sách lịch sử đơn hàng của user
   */
  static async getMyOrders(userId: string) {
    const bookings = await prisma.booking.findMany({
      where: {
        user_id: userId,
      },
      include: {
        items: {
          include: {
            inventory_unit: {
              include: {
                variant: {
                  include: {
                    product: true,
                  },
                },
              },
            },
          },
        },
        payment_transaction: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    if (bookings.length === 0) {
      return [];
    }

    // Lấy ngày thuê từ daterange của PostgreSQL cho các BookingItem
    const bookingIds = bookings.map((b) => b.id);
    const rawItems = await prisma.$queryRaw<
      Array<{
        id: string;
        booking_id: string;
        start_date: string | null;
        end_date: string | null;
      }>
    >`
      SELECT id, booking_id, 
             lower(rental_period)::text as start_date, 
             (upper(rental_period) - INTERVAL '1 day')::date::text as end_date 
      FROM "BookingItem" 
      WHERE booking_id::text = ANY(${bookingIds})
    `;

    const rawMap = new Map(rawItems.map((r) => [r.id, r]));

    return bookings.map((b) => ({
      ...b,
      total_price: b.total_price.toString(),
      total_amount: b.total_price.toString(),
      items: b.items.map((item) => {
        const raw = rawMap.get(item.id);
        const prodPrice = item.inventory_unit?.variant?.product?.rental_price;
        return {
          ...item,
          rental_start_date: raw?.start_date || null,
          rental_end_date: raw?.end_date || null,
          start_date: raw?.start_date || null,
          end_date: raw?.end_date || null,
          price: prodPrice ? prodPrice.toString() : "0",
        };
      }),
    }));
  }

  /**
   * 5. Checkout từ Giỏ hàng (Cart)
   */
  static async checkoutCart(userId: string, addressData: any, paymentMethod: string, localItems?: any[]) {
    return await prisma.$transaction(async (tx) => {
      // 1. Get cart
      // 1. Get or create user Cart
      let cart = await tx.cart.findUnique({
        where: { user_id: userId },
        include: { items: { include: { variant: { include: { product: true } } } } }
      });

      if (!cart) {
        cart = await tx.cart.create({
          data: { user_id: userId },
          include: { items: { include: { variant: { include: { product: true } } } } }
        });
      }

      // Luôn đồng bộ danh sách món từ client gửi lên (nếu có) để tránh hàng cũ bị kẹt trong DB
      if (localItems && localItems.length > 0) {
        await tx.cartItem.deleteMany({
          where: { cart_id: cart.id }
        });

        for (const item of localItems) {
          if (item.variantId) {
            await tx.cartItem.create({
              data: {
                cart_id: cart.id,
                variant_id: item.variantId,
                rental_start_date: new Date(item.rentalStartDate),
                rental_end_date: new Date(item.rentalEndDate)
              }
            });
          }
        }

        cart = await tx.cart.findUnique({
          where: { user_id: userId },
          include: { items: { include: { variant: { include: { product: true } } } } }
        });
      }

      if (!cart || cart.items.length === 0) {
        throw ApiError.badRequest("Giỏ hàng của bạn đang trống!");
      }

      // 2. Pre-check availability & Cấp phát unit cho TẤT CẢ các món trong giỏ (hỗ trợ thuê nhiều bộ khác nhau)
      const availableItems: typeof cart.items = [];
      const unavailableItems: string[] = [];
      const assignedUnitsMap = new Map<string, string>(); // cartItemId -> inventoryUnitId
      const allocatedUnitIds = new Set<string>(); // Theo dõi unit đã gán trong đơn này để không trùng

      for (const item of cart.items) {
        const startStr = item.rental_start_date.toISOString().split('T')[0];
        const endStr = item.rental_end_date.toISOString().split('T')[0];

        const units = await tx.$queryRaw<AvailableUnit[]>`
          SELECT iu.id as inventory_unit_id
          FROM "InventoryUnit" iu
          WHERE iu.variant_id = ${item.variant_id}::uuid
          AND iu.status = 'AVAILABLE'
          AND NOT EXISTS (
            SELECT 1 FROM "BookingItem" bi
            JOIN "Booking" b ON bi.booking_id = b.id
            WHERE bi.inventory_unit_id = iu.id
            AND b.status IN ('PENDING', 'CONFIRMED', 'SHIPPED')
            AND bi.status != 'CANCELLED'
            AND bi.rental_period && daterange(${startStr}::date, ${endStr}::date, '[]')
          )
        `;

        // Tìm unit chưa bị gán cho món nào khác trong cùng lần checkout này
        const candidateUnit = units.find(u => !allocatedUnitIds.has(u.inventory_unit_id));

        if (candidateUnit) {
          allocatedUnitIds.add(candidateUnit.inventory_unit_id);
          assignedUnitsMap.set(item.id, candidateUnit.inventory_unit_id);
          availableItems.push(item);
        } else {
          unavailableItems.push(`${item.variant.product.name} (Size: ${item.variant.size})`);
        }
      }

      // Nếu toàn bộ sản phẩm đều hết hàng, báo lỗi rõ ràng
      if (availableItems.length === 0) {
        throw ApiError.conflict(
          `Tất cả sản phẩm trong giỏ hàng đã hết hàng hoặc kín lịch: ${unavailableItems.join(', ')}`
        );
      }

      // 3. Create Address
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

      // 4. Calculate total price cho các món khả dụng
      let totalPrice = 0;
      for (const item of availableItems) {
        const durationDays = Math.ceil((item.rental_end_date.getTime() - item.rental_start_date.getTime()) / (1000 * 3600 * 24));
        totalPrice += Number(item.variant.product.rental_price) * (durationDays || 1);
      }
      
      const isFullVnd = availableItems.some(i => Number(i.variant.product.rental_price) >= 1000);
      const shippingFee = isFullVnd ? 30000 : 30; // 30K phí ship
      totalPrice += shippingFee;

      // 5. Create Booking
      const booking = await tx.booking.create({
        data: {
          user_id: userId,
          total_price: totalPrice,
          shipping_fee: shippingFee,
          status: "PENDING",
          shipping_address_id: address.id
        }
      });

      // 6. Create PaymentTransaction
      await tx.paymentTransaction.create({
        data: {
          booking_id: booking.id,
          amount: totalPrice,
          provider: paymentMethod || "COD",
          status: "PENDING"
        }
      });

      // 7. Tạo BookingItem với các unit đã được phân bổ an toàn
      for (const item of availableItems) {
        const startStr = item.rental_start_date.toISOString().split('T')[0];
        const endStr = item.rental_end_date.toISOString().split('T')[0];
        const unitId = assignedUnitsMap.get(item.id);
        if (!unitId) continue;

        const itemId = crypto.randomUUID();

        try {
          await tx.$executeRaw`
            INSERT INTO "BookingItem" (id, booking_id, inventory_unit_id, item_type, status, rental_period)
            VALUES (
              ${itemId}::uuid, 
              ${booking.id}::uuid, 
              ${unitId}::uuid, 
              'PRIMARY', 
              'ACTIVE', 
              daterange(${startStr}::date, ${endStr}::date, '[]')
            )
          `;
        } catch (error: any) {
          if (error.code === "P2010" || (error.message && error.message.includes("conflicting key value"))) {
            throw ApiError.conflict(`Lỗi xung đột ngày thuê cho sản phẩm ${item.variant.product.name}. Vui lòng chọn ngày khác.`);
          }
          throw error;
        }
      }

      // 8. Clear Cart sau khi checkout thành công
      await tx.cartItem.deleteMany({
        where: { cart_id: cart.id }
      });

      // Gắn kèm danh sách sản phẩm bị bỏ qua (nếu có) để frontend thông báo
      (booking as any).skippedItems = unavailableItems;

      return booking;
    });
  }

  /**
   * 6. Lấy TẤT CẢ đơn hàng toàn hệ thống (Admin only)
   */
  static async getAllBookings() {
    return prisma.booking.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          }
        },
        shipping_address: true,
        items: {
          include: {
            inventory_unit: {
              include: {
                variant: {
                  include: {
                    product: true,
                  },
                },
              },
            },
          },
        },
        payment_transaction: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }
}
