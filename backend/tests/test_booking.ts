import { prisma } from "../src/config/prisma.js";
import crypto from "crypto";

async function runTest() {
  console.log("🛠️ BẮT ĐẦU TEST SCRIPT CHO BOOKING API & GIST CONSTRAINT...");

  // 1. Tạo dữ liệu gốc giả
  console.log("1. Đang tạo Product, Variant và InventoryUnit giả...");
  const product = await prisma.product.create({
    data: {
      name: "[Test Booking] Váy Cưới Sang Trọng",
      retail_price: 15000000,
      rental_price: 2000000,
    }
  });

  const variant = await prisma.productVariant.create({
    data: {
      product_id: product.id,
      size: "M",
      color: "Trắng",
      sku: "TEST-SKU-001-" + Date.now()
    }
  });

  const inventory = await prisma.inventoryUnit.create({
    data: {
      variant_id: variant.id,
      barcode: "TEST-BARCODE-001-" + Date.now(),
      status: "AVAILABLE"
    }
  });

  console.log(`✅ Đã tạo Unit thành công: ${inventory.id}`);

  // Chạy server song song (để test API trực tiếp)
  // Thực ra để test nhanh ta sẽ gọi Service trực tiếp thay vì qua fetch API để đỡ phải bật server, 
  // vì Service đã chứa đủ toàn bộ logic và try-catch.
  const { BookingService } = await import("../src/services/booking.service.js");
  const testUserId = crypto.randomUUID();
  const startDate1 = "2026-10-01";
  const endDate1 = "2026-10-05";

  // 2. Check Availability Lần 1 (Kỳ vọng: CÓ TRỐNG)
  console.log(`\n2. Kiểm tra ngày trống từ ${startDate1} đến ${endDate1}...`);
  const available1 = await BookingService.checkAvailability(product.id, startDate1, endDate1);
  if (available1.length > 0 && available1[0].inventory_unit_id === inventory.id) {
    console.log("✅ OK! Sản phẩm báo TRỐNG lịch.");
  } else {
    throw new Error("❌ SAI! Đáng lẽ phải trống lịch.");
  }

  // 3. Đặt hàng Lần 1
  console.log("\n3. Tiến hành đặt đơn hàng thứ nhất...");
  const booking1 = await BookingService.createBooking({
    userId: testUserId,
    totalPrice: 2000000,
    items: [{
      inventoryUnitId: inventory.id,
      startDate: startDate1,
      endDate: endDate1
    }]
  });
  console.log(`✅ Đặt hàng thành công! Booking ID: ${booking1.id}`);

  // 4. Lấy chi tiết đơn hàng (Kiểm tra xem SQL Raw có select được daterange ra ngày không)
  console.log("\n4. Test lấy chi tiết đơn hàng (Đọc daterange)...");
  const details = await BookingService.getBookingById(booking1.id);
  console.log("Chi tiết items:", details.items);
  
  const startStr = details.items[0].start_date.toISOString().split('T')[0];
  const endStr = details.items[0].end_date.toISOString().split('T')[0];
  // Postgres daterange với '[]' sẽ chuyển bound trên thành exclusive, tức là 2026-10-06
  if (startStr === "2026-10-01" && endStr === "2026-10-06") {
    console.log("✅ Đọc daterange thành công, dữ liệu ngày chuẩn xác.");
  } else {
    throw new Error(`❌ Đọc daterange bị sai! Bắt được: ${startStr} - ${endStr}`);
  }

  // 5. Check Availability Lần 2 (Kỳ vọng: KHÔNG TRỐNG)
  console.log(`\n5. Kiểm tra lại ngày ${startDate1} đến ${endDate1} (Phải báo HẾT)...`);
  const available2 = await BookingService.checkAvailability(product.id, startDate1, endDate1);
  if (available2.length === 0) {
    console.log("✅ Chuẩn! Sản phẩm đã bị ẩn vì kẹt lịch.");
  } else {
    throw new Error("❌ SAI! Đáng lẽ không được hiện ra.");
  }

  // 6. Cố tình đặt trùng lịch (Kỳ vọng: Lỗi 409 Conflict)
  console.log("\n6. Cố tình đặt TRÙNG LỊCH (giả sử có 2 người click cùng lúc)...");
  try {
    await BookingService.createBooking({
      userId: testUserId,
      totalPrice: 2000000,
      items: [{
        inventoryUnitId: inventory.id,
        startDate: "2026-10-03", // Giao nhau với 1-5
        endDate: "2026-10-07"
      }]
    });
    throw new Error("❌ SAI! Đáng lẽ Postgres GiST Constraint phải chặn lại!");
  } catch (error: any) {
    if (error.statusCode === 409) {
      console.log(`✅ CHẶN THÀNH CÔNG BẰNG DATABASE GIST! Thông báo: ${error.message}`);
    } else {
      throw error;
    }
  }

  // Dọn dẹp
  console.log("\n🧹 Test xong, dọn dẹp dữ liệu...");
  await prisma.product.delete({ where: { id: product.id } });
  console.log("🎉 TOÀN BỘ TEST ĐỀU PASS!");
}

runTest().catch(console.error).finally(() => prisma.$disconnect());
