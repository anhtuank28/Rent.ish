import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Khởi tạo PrismaClient (đồng nhất với config/prisma.ts)
const connectionString = process.env.DATABASE_URL as string;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Bắt đầu dọn dẹp dữ liệu cũ...");
  
  // Xóa toàn bộ dữ liệu (cẩn thận: chỉ dùng trong quá trình dev/seeding)
  await prisma.bookingItem.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.inventoryUnit.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();

  console.log("✅ Đã dọn dẹp xong. Bắt đầu seed dữ liệu mới...");

  // Tạo sản phẩm 1: Váy Cưới
  await prisma.product.create({
    data: {
      name: "Váy Cưới Bồng Bềnh Pha Lê đính kèm Voan",
      description: "Chiếc váy cưới hoàng gia lộng lẫy được đính kết 1000 viên pha lê thủ công. Thiết kế bồng bềnh giúp cô dâu tỏa sáng trong ngày trọng đại.",
      retail_price: 25000000,
      rental_price: 3500000,
      image_url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
      variants: {
        create: [
          {
            size: "S",
            color: "Trắng Tinh Khôi",
            sku: "VC-PHALE-TRANG-S",
            inventory: {
              create: [
                { barcode: "BC-VC-001" },
                { barcode: "BC-VC-002" },
              ]
            }
          },
          {
            size: "M",
            color: "Trắng Tinh Khôi",
            sku: "VC-PHALE-TRANG-M",
            inventory: {
              create: [
                { barcode: "BC-VC-003" },
                { barcode: "BC-VC-004" },
                { barcode: "BC-VC-005" },
              ]
            }
          }
        ]
      }
    }
  });

  // Tạo sản phẩm 2: Áo Dài
  await prisma.product.create({
    data: {
      name: "Áo Dài Lụa Tơ Tằm Thêu Tay Hạc Tiên",
      description: "Áo dài truyền thống làm từ lụa tơ tằm Bảo Lộc thượng hạng, họa tiết Hạc Tiên được nghệ nhân thêu tay suốt 14 ngày.",
      retail_price: 8000000,
      rental_price: 1200000,
      image_url: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800",
      variants: {
        create: [
          {
            size: "M",
            color: "Đỏ Rượu",
            sku: "AD-HACTIEN-DO-M",
            inventory: {
              create: [
                { barcode: "BC-AD-001" },
                { barcode: "BC-AD-002" },
              ]
            }
          },
          {
            size: "L",
            color: "Đỏ Rượu",
            sku: "AD-HACTIEN-DO-L",
            inventory: {
              create: [
                { barcode: "BC-AD-003" },
              ]
            }
          }
        ]
      }
    }
  });

  // Tạo sản phẩm 3: Đầm Dạ Hội
  await prisma.product.create({
    data: {
      name: "Đầm Dạ Hội Xẻ Đùi Lệch Vai Quyến Rũ",
      description: "Thiết kế táo bạo nhưng không kém phần thanh lịch. Chất liệu thun lạnh cao cấp ôm sát đường cong cơ thể.",
      retail_price: 4500000,
      rental_price: 600000,
      image_url: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800",
      variants: {
        create: [
          {
            size: "S",
            color: "Đen Huyền Bí",
            sku: "DDH-XEDUI-DEN-S",
            inventory: {
              create: [
                { barcode: "BC-DDH-001" },
                { barcode: "BC-DDH-002" },
              ]
            }
          },
          {
            size: "M",
            color: "Xanh Navy",
            sku: "DDH-XEDUI-XANH-M",
            inventory: {
              create: [
                { barcode: "BC-DDH-003" },
              ]
            }
          }
        ]
      }
    }
  });

  // Tạo sản phẩm 4: Vest Nam
  await prisma.product.create({
    data: {
      name: "Bộ Suit Nam Cổ Điển Kẻ Caro (Gồm Áo + Quần)",
      description: "Trang phục Suit chuẩn phong cách Gentleman Ý, cắt may tinh tế, phù hợp cho sự kiện, tiệc cưới.",
      retail_price: 6000000,
      rental_price: 900000,
      image_url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800",
      variants: {
        create: [
          {
            size: "M",
            color: "Xám Kẻ Caro",
            sku: "SUIT-CARO-XAM-M",
            inventory: {
              create: [
                { barcode: "BC-SUIT-001" },
                { barcode: "BC-SUIT-002" },
                { barcode: "BC-SUIT-003" },
              ]
            }
          },
          {
            size: "L",
            color: "Xám Kẻ Caro",
            sku: "SUIT-CARO-XAM-L",
            inventory: {
              create: [
                { barcode: "BC-SUIT-004" },
                { barcode: "BC-SUIT-005" },
              ]
            }
          }
        ]
      }
    }
  });

  // Tạo sản phẩm 5: Áo Khoác Mùa Đông
  await prisma.product.create({
    data: {
      name: "Áo Dạ Dáng Dài Hàn Quốc Thanh Lịch",
      description: "Áo măng tô dạ dáng dài giữ ấm hoàn hảo cho những ngày đông giá rét ở miền Bắc hoặc du lịch nước ngoài.",
      retail_price: 3200000,
      rental_price: 450000,
      image_url: "https://images.unsplash.com/photo-1550639525-c97d455acf70?w=800",
      variants: {
        create: [
          {
            size: "Freesize",
            color: "Nâu Tây",
            sku: "ADA-HAN-NAU-FS",
            inventory: {
              create: [
                { barcode: "BC-ADA-001" },
                { barcode: "BC-ADA-002" },
                { barcode: "BC-ADA-003" },
                { barcode: "BC-ADA-004" },
              ]
            }
          }
        ]
      }
    }
  });

  console.log("🎉 Đã tạo thành công 5 Sản phẩm cùng Biến thể và Tồn kho!");
  
  // Tính tổng số lượng
  const totalProducts = await prisma.product.count();
  const totalVariants = await prisma.productVariant.count();
  const totalUnits = await prisma.inventoryUnit.count();

  console.log(`📊 Tổng kết:`);
  console.log(`- ${totalProducts} Sản phẩm`);
  console.log(`- ${totalVariants} Biến thể (Size/Màu)`);
  console.log(`- ${totalUnits} Hàng trong kho (Inventory Units)`);
}

main()
  .catch((e) => {
    console.error("❌ Lỗi khi chạy Seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
