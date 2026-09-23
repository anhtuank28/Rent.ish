-- Thêm cột status vào BookingItem để quản lý trạng thái của từng món đồ
ALTER TABLE "BookingItem" ADD COLUMN IF NOT EXISTS "status" VARCHAR(20) DEFAULT 'ACTIVE';

-- Cập nhật tất cả BookingItem của các đơn đã hủy về CANCELLED
UPDATE "BookingItem" bi
SET "status" = 'CANCELLED'
FROM "Booking" b
WHERE bi.booking_id = b.id AND b.status = 'CANCELLED';

-- Xóa constraint cũ (toàn bộ bảng)
ALTER TABLE "BookingItem" DROP CONSTRAINT IF EXISTS "no_overlapping_bookings";

-- Tạo Partial GiST Constraint: Chỉ áp dụng chống trùng lịch cho các BookingItem KHÔNG PHẢI CANCELLED
ALTER TABLE "BookingItem"
ADD CONSTRAINT "no_overlapping_bookings"
EXCLUDE USING gist (
  "inventory_unit_id" WITH =,
  "rental_period" WITH &&
) WHERE (status != 'CANCELLED');
