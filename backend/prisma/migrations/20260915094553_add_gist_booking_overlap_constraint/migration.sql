-- Cài đặt tiện ích btree_gist (Bắt buộc để dùng exclusion constraint với UUID + daterange)
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- Chặn việc trùng ngày thuê (rental_period) trên cùng 1 sản phẩm (inventory_unit_id)
ALTER TABLE "BookingItem"
ADD CONSTRAINT "no_overlapping_bookings"
EXCLUDE USING gist (
  "inventory_unit_id" WITH =,
  "rental_period" WITH &&
);