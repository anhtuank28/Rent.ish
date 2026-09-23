import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Khởi tạo PrismaClient tương thích Prisma 7 adapter
const connectionString = process.env.DATABASE_URL as string;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

interface ProductSeedData {
  name: string;
  description: string;
  retail_price: number;
  rental_price: number;
  image_url: string;
  images: string[];
  variants: {
    size: string;
    color: string;
    sku: string;
    stock: number;
  }[];
}

const PRODUCTS_CATALOG: ProductSeedData[] = [
  {
    name: "Đầm Dạ Hội Lụa Satin Cúp Ngực Phủ Kim Tuyến (Aura Midnight)",
    description: "Đầm dạ hội dáng ôm đuôi cá làm từ chất liệu lụa Satin bóng sang trọng. Phần cúp ngực đính kết kim tuyến tỉ mỉ tạo hiệu ứng bắt sáng kỳ ảo dưới ánh đèn tiệc đêm.",
    retail_price: 14500000,
    rental_price: 1250000,
    image_url: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800",
    images: [
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800"
    ],
    variants: [
      { size: "S", color: "Xanh Đêm Midnight", sku: "AUR-MID-S", stock: 3 },
      { size: "M", color: "Xanh Đêm Midnight", sku: "AUR-MID-M", stock: 4 },
      { size: "L", color: "Xanh Đêm Midnight", sku: "AUR-MID-L", stock: 2 }
    ]
  },
  {
    name: "Váy Cưới Haute Couture Công Chúa Phủ Ren Pháp (Celestial Bride)",
    description: "Kiệt tác váy cưới bồng xòe mang phong cách hoàng gia phương Tây. Thân áo ren Chantilly nhập khẩu từ Pháp kết hợp chân váy 7 lớp voan bồng bềnh kiêu sa.",
    retail_price: 32000000,
    rental_price: 3800000,
    image_url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
    ],
    variants: [
      { size: "S", color: "Trắng Tinh Khôi", sku: "CEL-BRIDE-S", stock: 2 },
      { size: "M", color: "Trắng Tinh Khôi", sku: "CEL-BRIDE-M", stock: 3 }
    ]
  },
  {
    name: "Đầm Dạ Hội Xẻ Đùi Emerald Cut-out Lưng Trần (Emerald Muse)",
    description: "Màu xanh ngọc lục bảo tôn da tuyệt đối. Đường xẻ đùi cao kết hợp chi tiết khoét lưng gợi cảm tôn vinh đường cong tự nhiên của quý cô trong các sự kiện thảm đỏ.",
    retail_price: 12000000,
    rental_price: 950000,
    image_url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800"
    ],
    variants: [
      { size: "S", color: "Xanh Ngọc Lục Bảo", sku: "EME-MUSE-S", stock: 3 },
      { size: "M", color: "Xanh Ngọc Lục Bảo", sku: "EME-MUSE-M", stock: 3 },
      { size: "L", color: "Xanh Ngọc Lục Bảo", sku: "EME-MUSE-L", stock: 2 }
    ]
  },
  {
    name: "Áo Dài Lụa Hà Đông Thêu Tay Hoa Sen Thượng Hạng",
    description: "Áo dài truyền thống may bằng lụa Hà Đông dệt thủ công 100%. Họa tiết đóa sen nở rộ được nghệ nhân thêu tay chỉ tơ bóng tinh xảo suốt 10 ngày đêm.",
    retail_price: 8500000,
    rental_price: 1100000,
    image_url: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800",
    images: [
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800",
      "https://images.unsplash.com/photo-1617059063772-34532796cdb5?w=800"
    ],
    variants: [
      { size: "S", color: "Hồng Sen Nhạt", sku: "AD-SEN-S", stock: 3 },
      { size: "M", color: "Hồng Sen Nhạt", sku: "AD-SEN-M", stock: 4 },
      { size: "L", color: "Hồng Sen Nhạt", sku: "AD-SEN-L", stock: 2 }
    ]
  },
  {
    name: "Đầm Tiệc Cocktail Hồng Pastel Dập Ly (Blush Blossom Midi)",
    description: "Thiết kế đầm cocktail dáng midi nữ tính, chất liệu voan tơ dập ly mềm mại. Phù hợp cho tiệc đính hôn, khai trương hoặc tiệc trà chiều trang nhã.",
    retail_price: 6800000,
    rental_price: 650000,
    image_url: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800",
    images: [
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800"
    ],
    variants: [
      { size: "S", color: "Hồng Phấn Pastel", sku: "BLU-BLO-S", stock: 3 },
      { size: "M", color: "Hồng Phấn Pastel", sku: "BLU-BLO-M", stock: 3 },
      { size: "Freesize", color: "Hồng Phấn Pastel", sku: "BLU-BLO-FS", stock: 2 }
    ]
  },
  {
    name: "Bộ Tuxedo Nam Cổ Ve Sam Lụa Đen Ý (The Classic Black Tie)",
    description: "Bộ Tuxedo dạ tiệc chuẩn may đo Savile Row. Cổ áo ve sam bọc lụa bóng satin cao cấp, vải wool pha cashmere giữ form đứng tôn vinh bờ vai quý ông.",
    retail_price: 16000000,
    rental_price: 1800000,
    image_url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800",
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800"
    ],
    variants: [
      { size: "M", color: "Đen Satin", sku: "TUX-CLASSIC-M", stock: 3 },
      { size: "L", color: "Đen Satin", sku: "TUX-CLASSIC-L", stock: 3 },
      { size: "XL", color: "Đen Satin", sku: "TUX-CLASSIC-XL", stock: 2 }
    ]
  },
  {
    name: "Đầm Dạ Hội Đỏ Rượu Vang Trễ Vai Quyến Rũ (Burgundy Velvet)",
    description: "Chất liệu nhung the cao cấp tông đỏ rượu vang sang trọng, tôn trọn bờ vai thanh mảnh và làn da trắng ngần của người mặc tại các tiệc dạ hội mùa thu đông.",
    retail_price: 15000000,
    rental_price: 1350000,
    image_url: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800",
    images: [
      "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800"
    ],
    variants: [
      { size: "S", color: "Đỏ Rượu Vang", sku: "BUR-VEL-S", stock: 3 },
      { size: "M", color: "Đỏ Rượu Vang", sku: "BUR-VEL-M", stock: 3 },
      { size: "L", color: "Đỏ Rượu Vang", sku: "BUR-VEL-L", stock: 2 }
    ]
  },
  {
    name: "Đầm Maxi Lụa Tơ Bay Bổng Đi Biển & Resort (Sunlit Riviera)",
    description: "Đầm maxi bay bổng với tông màu vàng nắng ấm áp. Chất liệu lụa habutai nhẹ bẫng theo từng bước chuyển động, cực kỳ ăn ảnh khi du lịch nghỉ dưỡng.",
    retail_price: 5500000,
    rental_price: 550000,
    image_url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800"
    ],
    variants: [
      { size: "S", color: "Vàng Nắng Hè", sku: "SUN-RIV-S", stock: 3 },
      { size: "M", color: "Vàng Nắng Hè", sku: "SUN-RIV-M", stock: 4 },
      { size: "Freesize", color: "Vàng Nắng Hè", sku: "SUN-RIV-FS", stock: 3 }
    ]
  },
  {
    name: "Áo Dài Cách Tân Gấm Thượng Hải Họa Tiết Hoàng Kim",
    description: "Sự kết hợp hoàn hảo giữa phom dáng áo dài truyền thống và gấm dệt hoa văn hoàng kim sang quý. Thiết kế tay lửng tạo cảm giác trẻ trung, thanh lịch.",
    retail_price: 7200000,
    rental_price: 850000,
    image_url: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800",
    images: [
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800",
      "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?w=800"
    ],
    variants: [
      { size: "S", color: "Đỏ Ánh Kim", sku: "AD-GAM-S", stock: 3 },
      { size: "M", color: "Đỏ Ánh Kim", sku: "AD-GAM-M", stock: 3 },
      { size: "L", color: "Đỏ Ánh Kim", sku: "AD-GAM-L", stock: 2 }
    ]
  },
  {
    name: "Đầm Dạ Hội Ánh Kim Sequin Bạc Lộng Lẫy (Silver Starlight)",
    description: "Mẫu đầm dành riêng cho những cô nàng muốn trở thành tâm điểm của đêm tiệc. Toàn bộ thân váy đính hàng nghìn hạt cườm và sequin bạc bắt sáng 360 độ.",
    retail_price: 18000000,
    rental_price: 1600000,
    image_url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800",
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800",
      "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?w=800"
    ],
    variants: [
      { size: "S", color: "Bạc Ánh Sao", sku: "SIL-STAR-S", stock: 2 },
      { size: "M", color: "Bạc Ánh Sao", sku: "SIL-STAR-M", stock: 3 }
    ]
  },
  {
    name: "Váy Cưới Đuôi Cá Satin Tối Giản Tinh Tế (Minimalist Silk Crepe)",
    description: "Lấy cảm hứng từ phong cách cưới tinh giản của các biểu tượng thời trang quốc tế. Chất liệu lụa Crepe mềm rủ ôm trọn vóc dáng cùng phần đuôi cá dài kiêu sa.",
    retail_price: 22000000,
    rental_price: 2800000,
    image_url: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=800",
    images: [
      "https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=800",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800"
    ],
    variants: [
      { size: "S", color: "Trắng Kem Ivory", sku: "MIN-CREPE-S", stock: 3 },
      { size: "M", color: "Trắng Kem Ivory", sku: "MIN-CREPE-M", stock: 3 }
    ]
  },
  {
    name: "Bộ Suit Nam Màu Xanh Royal Navy 3 Mảnh (Gồm Áo + Quần + Gille)",
    description: "Bộ Suit 3 mảnh (Three-piece suit) sắc xanh Royal Navy lịch lãm. Thiết kế chuẩn phong thái doanh nhân và chú rể trong ngày cưới.",
    retail_price: 14000000,
    rental_price: 1500000,
    image_url: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800",
    images: [
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800",
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800"
    ],
    variants: [
      { size: "M", color: "Xanh Royal Navy", sku: "SUIT-ROYAL-M", stock: 3 },
      { size: "L", color: "Xanh Royal Navy", sku: "SUIT-ROYAL-L", stock: 3 }
    ]
  },
  {
    name: "Đầm Dạ Hội Đen Xuyên Thấu Thêu Hoa Nổi (Midnight Noir Bloom)",
    description: "Sự kết hợp táo bạo giữa lớp voan đen mỏng manh và hoa văn thêu 3D huyền bí. Tạo nên vẻ đẹp ma mị và cuốn hút khó cưỡng cho những đêm tiệc Gala.",
    retail_price: 16500000,
    rental_price: 1450000,
    image_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
    images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800"
    ],
    variants: [
      { size: "S", color: "Đen Huyền Bí", sku: "NOIR-BLOOM-S", stock: 3 },
      { size: "M", color: "Đen Huyền Bí", sku: "NOIR-BLOOM-M", stock: 3 }
    ]
  },
  {
    name: "Đầm Blazer Cách Điệu Đính Khuy Vàng Sang Chảnh (Boss Lady Velvet)",
    description: "Vẻ đẹp quyền lực nhưng vô cùng quyến rũ. Đầm blazer dáng chữ A ôm gọn eo, điểm xuyết hàng khuy vàng dập nổi phong cách hoàng gia.",
    retail_price: 7500000,
    rental_price: 750000,
    image_url: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800",
    images: [
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800"
    ],
    variants: [
      { size: "S", color: "Trắng Ngà", sku: "BLA-BOSS-S", stock: 3 },
      { size: "M", color: "Trắng Ngà", sku: "BLA-BOSS-M", stock: 3 }
    ]
  },
  {
    name: "Áo Dài Cưới Gấm Đỏ Đính Kết Ngọc Trai Phú Quý",
    description: "Áo dài cưới lộng lẫy cho ngày tân hôn trọng đại. Cổ áo và ngực áo đính hơn 500 hạt ngọc trai nước ngọt thủ công tinh xảo trên nền gấm đỏ truyền thống.",
    retail_price: 11000000,
    rental_price: 1600000,
    image_url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800",
    images: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800"
    ],
    variants: [
      { size: "S", color: "Đỏ Phú Quý", sku: "ADC-NGOC-S", stock: 2 },
      { size: "M", color: "Đỏ Phú Quý", sku: "ADC-NGOC-M", stock: 3 }
    ]
  },
  {
    name: "Đầm Lụa Slip Dress Vàng Champagne Cổ Đổ (Champagne Glow)",
    description: "Thiết kế slip dress lụa satin tông màu champagne óng ả. Cổ đổ tự nhiên mang đến thần thái phóng khoáng, thanh lịch của những thập niên 90.",
    retail_price: 6200000,
    rental_price: 600000,
    image_url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800",
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800"
    ],
    variants: [
      { size: "S", color: "Vàng Champagne", sku: "SLIP-CHAM-S", stock: 4 },
      { size: "M", color: "Vàng Champagne", sku: "SLIP-CHAM-M", stock: 4 }
    ]
  },
  {
    name: "Áo Măng Tô Dạ Cashmere Dáng Dài Màu Camel Quý Tộc",
    description: "Áo khoác măng tô may từ 100% sợi len Cashmere mềm mịn, giữ ấm tuyệt đối. Tông màu camel kinh điển không bao giờ lỗi mốt khi du lịch mùa đông.",
    retail_price: 9800000,
    rental_price: 850000,
    image_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800",
    images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800",
      "https://images.unsplash.com/photo-1550639525-c97d455acf70?w=800"
    ],
    variants: [
      { size: "M", color: "Nâu Camel", sku: "MAN-CAMEL-M", stock: 3 },
      { size: "L", color: "Nâu Camel", sku: "MAN-CAMEL-L", stock: 3 },
      { size: "Freesize", color: "Nâu Camel", sku: "MAN-CAMEL-FS", stock: 3 }
    ]
  },
  {
    name: "Đầm Phù Dâu Xanh Sage Pastel Tùng Xòe Thơ Mộng (Sage Dream)",
    description: "Gam màu xanh xám sage dịu mắt, là sự lựa chọn số 1 cho đội ngũ phù dâu trong các tiệc cưới ngoài trời lãng mạn.",
    retail_price: 5800000,
    rental_price: 550000,
    image_url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800",
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800",
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800"
    ],
    variants: [
      { size: "S", color: "Xanh Sage", sku: "SAGE-DREAM-S", stock: 4 },
      { size: "M", color: "Xanh Sage", sku: "SAGE-DREAM-M", stock: 4 },
      { size: "L", color: "Xanh Sage", sku: "SAGE-DREAM-L", stock: 3 }
    ]
  },
  {
    name: "Bộ Suit Nam Màu Trắng Kem Dạ Tiệc Hè (Summer Linen Ivory)",
    description: "Phong cách tiệc du thuyền và tiệc cưới bãi biển. Chất liệu Linen pha lụa thoáng mát với gam màu trắng kem trang nhã đầy phóng khoáng.",
    retail_price: 12500000,
    rental_price: 1300000,
    image_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800",
    images: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800"
    ],
    variants: [
      { size: "M", color: "Trắng Kem Ivory", sku: "SUIT-IVORY-M", stock: 3 },
      { size: "L", color: "Trắng Kem Ivory", sku: "SUIT-IVORY-L", stock: 3 }
    ]
  },
  {
    name: "Đầm Dạ Hội Lụa Đỏ Ruby Lệch Vai Quyến Rũ (Empress Scarlet)",
    description: "Chiếc đầm đỏ quyền lực dành cho những nữ chủ nhân đêm tiệc. Thiết kế lệch vai với tà phụ bay bổng tạo nên hiệu ứng thị giác choáng ngợp.",
    retail_price: 15800000,
    rental_price: 1400000,
    image_url: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800",
    images: [
      "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800"
    ],
    variants: [
      { size: "S", color: "Đỏ Ruby Scarlet", sku: "EMP-SCAR-S", stock: 3 },
      { size: "M", color: "Đỏ Ruby Scarlet", sku: "EMP-SCAR-M", stock: 3 },
      { size: "L", color: "Đỏ Ruby Scarlet", sku: "EMP-SCAR-L", stock: 2 }
    ]
  }
];

async function main() {
  console.log("🌱 Bắt đầu kiểm tra và cập nhật kho sản phẩm thời trang cao cấp...");

  let createdCount = 0;
  let updatedCount = 0;

  for (const item of PRODUCTS_CATALOG) {
    // Kiểm tra xem sản phẩm đã có trong DB chưa
    const existing = await prisma.product.findFirst({
      where: { name: item.name },
      include: { variants: true }
    });

    if (existing) {
      // Cập nhật lại ảnh, mô tả, giá nếu đã tồn tại
      await prisma.product.update({
        where: { id: existing.id },
        data: {
          description: item.description,
          retail_price: item.retail_price,
          rental_price: item.rental_price,
          image_url: item.image_url,
          images: item.images
        }
      });
      updatedCount++;
      continue;
    }

    // Nếu chưa có, tạo mới sản phẩm cùng biến thể và tồn kho
    const createdProduct = await prisma.product.create({
      data: {
        name: item.name,
        description: item.description,
        retail_price: item.retail_price,
        rental_price: item.rental_price,
        image_url: item.image_url,
        images: item.images
      }
    });

    // Tạo biến thể và inventory
    for (const v of item.variants) {
      // Kiểm tra SKU tránh trùng lặp
      let uniqueSku = v.sku;
      const existingSku = await prisma.productVariant.findUnique({ where: { sku: uniqueSku } });
      if (existingSku) {
        uniqueSku = `${v.sku}-${Date.now().toString().slice(-4)}`;
      }

      const createdVariant = await prisma.productVariant.create({
        data: {
          product_id: createdProduct.id,
          size: v.size,
          color: v.color,
          sku: uniqueSku
        }
      });

      // Tạo các InventoryUnit cho biến thể này
      for (let i = 1; i <= v.stock; i++) {
        const barcode = `BC-${uniqueSku}-${String(i).padStart(3, "0")}`;
        await prisma.inventoryUnit.create({
          data: {
            variant_id: createdVariant.id,
            barcode: barcode,
            status: "AVAILABLE"
          }
        });
      }
    }

    createdCount++;
    console.log(`  ✨ [Tạo Mới] ${item.name} (${item.variants.length} size)`);
  }

  // Thống kê tổng số sau khi seed
  const totalProducts = await prisma.product.count();
  const totalVariants = await prisma.productVariant.count();
  const totalUnits = await prisma.inventoryUnit.count();
  const totalUsers = await prisma.user.count();
  const totalBookings = await prisma.booking.count();

  console.log("\n=======================================================");
  console.log("🎉 CẬP NHẬT KHO THỜI TRANG CAO CẤP THÀNH CÔNG!");
  console.log("=======================================================");
  console.log(`- Sản phẩm mới thêm vào: ${createdCount}`);
  console.log(`- Sản phẩm đã cập nhật ảnh/giá: ${updatedCount}`);
  console.log(`- Tổng số sản phẩm trong DB: ${totalProducts}`);
  console.log(`- Tổng số biến thể (Size/Màu): ${totalVariants}`);
  console.log(`- Tổng số đồ trong kho vật lý (Inventory Units): ${totalUnits}`);
  console.log(`- Dữ liệu người dùng (Users): ${totalUsers} (Được bảo toàn nguyên vẹn 100%)`);
  console.log(`- Đơn hàng hiện hữu (Bookings): ${totalBookings} (Được bảo toàn nguyên vẹn 100%)`);
  console.log("=======================================================\n");
}

main()
  .catch((e) => {
    console.error("❌ Lỗi khi chạy Seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
