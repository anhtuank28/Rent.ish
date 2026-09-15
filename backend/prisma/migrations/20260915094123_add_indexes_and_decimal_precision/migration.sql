/*
  Warnings:

  - You are about to alter the column `total_price` on the `Booking` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `retail_price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `rental_price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "total_price" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "retail_price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "rental_price" SET DATA TYPE DECIMAL(10,2);

-- CreateIndex
CREATE INDEX "Booking_user_id_idx" ON "Booking"("user_id");

-- CreateIndex
CREATE INDEX "BookingItem_booking_id_idx" ON "BookingItem"("booking_id");

-- CreateIndex
CREATE INDEX "BookingItem_inventory_unit_id_idx" ON "BookingItem"("inventory_unit_id");

-- CreateIndex
CREATE INDEX "InventoryUnit_variant_id_idx" ON "InventoryUnit"("variant_id");

-- CreateIndex
CREATE INDEX "ProductVariant_product_id_idx" ON "ProductVariant"("product_id");
