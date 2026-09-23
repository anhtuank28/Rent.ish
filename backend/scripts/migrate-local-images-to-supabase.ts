import "dotenv/config";
import path from "node:path";
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

async function main() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucketName = process.env.SUPABASE_STORAGE_BUCKET || "products";

  if (!supabaseUrl || !supabaseKey || supabaseKey === "DAN_KEY_SERVICE_ROLE_VAO_DAY") {
    console.error("❌ LỖI: Vui lòng điền SUPABASE_SERVICE_ROLE_KEY hợp lệ vào file backend/.env trước!");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const connectionString = process.env.DATABASE_URL as string;
  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  console.log("🚀 Bắt đầu quá trình di chuyển ảnh lên Supabase Storage...");

  // 1. Kiểm tra bucket products có tồn tại không
  const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
  if (bucketError) {
    console.error("❌ Lỗi kết nối Supabase Storage:", bucketError.message);
    process.exit(1);
  }

  const bucketExists = buckets?.some((b) => b.name === bucketName);
  if (!bucketExists) {
    console.log(`⚠️ Bucket '${bucketName}' chưa có, đang tự động tạo bucket '${bucketName}' (Public)...`);
    const { error: createErr } = await supabase.storage.createBucket(bucketName, {
      public: true,
    });
    if (createErr) {
      console.error(`❌ Không thể tự tạo bucket '${bucketName}':`, createErr.message);
      console.log("👉 Vui lòng vào Supabase Dashboard tạo bucket 'products' thủ công và bật Public.");
      process.exit(1);
    }
    console.log(`✅ Đã tạo thành công bucket '${bucketName}' (Public)!`);
  } else {
    console.log(`✅ Bucket '${bucketName}' đã sẵn sàng.`);
  }

  // 2. Quét các file trong backend/uploads/products
  const localUploadDir = path.join(process.cwd(), "uploads", "products");
  if (!existsSync(localUploadDir)) {
    console.log("ℹ️ Thư mục local 'uploads/products' không tồn tại hoặc không có ảnh.");
    return;
  }

  const files = await fs.readdir(localUploadDir);
  console.log(`📸 Tìm thấy ${files.length} file ảnh trong thư mục local uploads/products:`);

  const urlMapping = new Map<string, string>(); // relative path -> supabase public URL

  for (const file of files) {
    if (file.startsWith(".")) continue;
    const filePath = path.join(localUploadDir, file);
    const fileBuffer = await fs.readFile(filePath);

    // Xác định mime-type đơn giản
    const ext = path.extname(file).toLowerCase();
    let contentType = "image/jpeg";
    if (ext === ".png") contentType = "image/png";
    else if (ext === ".webp") contentType = "image/webp";

    console.log(`  ⬆️ Đang tải lên: ${file}...`);
    const { error: uploadErr } = await supabase.storage
      .from(bucketName)
      .upload(file, fileBuffer, {
        contentType,
        upsert: true,
      });

    if (uploadErr) {
      console.error(`  ❌ Lỗi tải file ${file}:`, uploadErr.message);
      continue;
    }

    const { data: publicData } = supabase.storage.from(bucketName).getPublicUrl(file);
    const publicUrl = publicData.publicUrl;
    console.log(`  ✅ Thành công: ${publicUrl}`);

    const relativePath = `/uploads/products/${file}`;
    urlMapping.set(relativePath, publicUrl);
  }

  // 3. Cập nhật Database
  console.log("\n🔄 Đang cập nhật đường dẫn ảnh trong Database...");
  const products = await prisma.product.findMany();
  let updatedCount = 0;

  for (const product of products) {
    let hasChange = false;
    let newImageUrl = product.image_url;
    let newImages = [...product.images];

    if (product.image_url && urlMapping.has(product.image_url)) {
      newImageUrl = urlMapping.get(product.image_url)!;
      hasChange = true;
    }

    newImages = newImages.map((img) => {
      if (urlMapping.has(img)) {
        hasChange = true;
        return urlMapping.get(img)!;
      }
      return img;
    });

    if (hasChange) {
      await prisma.product.update({
        where: { id: product.id },
        data: {
          image_url: newImageUrl,
          images: newImages,
        },
      });
      updatedCount++;
      console.log(`  ✅ Đã cập nhật sản phẩm: "${product.name}"`);
    }
  }

  console.log(`\n🎉 Hoàn thành! Đã cập nhật ${updatedCount} sản phẩm trong Database.`);

  // 4. Kiểm tra cập nhật HeroSection.tsx
  const heroFilePath = path.join(process.cwd(), "..", "frontend", "components", "features", "home", "HeroSection.tsx");
  if (existsSync(heroFilePath)) {
    let heroContent = await fs.readFile(heroFilePath, "utf-8");
    let heroChanged = false;

    for (const [relPath, cloudUrl] of urlMapping.entries()) {
      if (heroContent.includes(relPath)) {
        heroContent = heroContent.replace(relPath, cloudUrl);
        heroChanged = true;
        console.log(`  🌟 Đã cập nhật link ảnh Cloud cho HeroSection.tsx!`);
      }
    }

    if (heroChanged) {
      await fs.writeFile(heroFilePath, heroContent, "utf-8");
    }
  }

  await prisma.$disconnect();
}

main().catch(console.error);
