import { createClient, SupabaseClient } from "@supabase/supabase-js";
import path from "node:path";
import fs from "node:fs/promises";
import { existsSync, mkdirSync } from "node:fs";
import { randomUUID } from "node:crypto";

export interface IStorageService {
  uploadFile(file: Express.Multer.File): Promise<string>;
  uploadFiles(files: Express.Multer.File[]): Promise<string[]>;
}

export class StorageService implements IStorageService {
  private supabase: SupabaseClient | null = null;
  private bucketName: string;
  private localUploadDir: string;

  constructor() {
    const supabaseUrl = process.env["SUPABASE_URL"];
    const supabaseKey =
      process.env["SUPABASE_SERVICE_ROLE_KEY"] ||
      process.env["SUPABASE_ANON_KEY"] ||
      process.env["SUPABASE_KEY"];

    this.bucketName = process.env["SUPABASE_STORAGE_BUCKET"] || "products";
    this.localUploadDir = path.join(process.cwd(), "uploads", "products");

    if (supabaseUrl && supabaseKey) {
      try {
        this.supabase = createClient(supabaseUrl, supabaseKey);
        console.log(`[StorageService] ☁️ Đã kết nối Supabase Storage (Bucket: ${this.bucketName})`);
      } catch (err) {
        console.warn("[StorageService] ⚠️ Không thể khởi tạo Supabase Client, chuyển sang Local Fallback:", err);
        this.supabase = null;
      }
    } else {
      console.log("[StorageService] 📁 Đang chạy ở chế độ Local Storage Fallback (/uploads/products)");
    }

    // Đảm bảo thư mục local luôn sẵn sàng cho chế độ fallback
    if (!existsSync(this.localUploadDir)) {
      mkdirSync(this.localUploadDir, { recursive: true });
    }
  }

  /**
   * Sinh tên file ngẫu nhiên an toàn tránh trùng lặp
   */
  private generateFileName(originalName: string): string {
    const ext = path.extname(originalName).toLowerCase() || ".jpg";
    const timestamp = Date.now();
    const uniqueId = randomUUID().slice(0, 8);
    return `product-${timestamp}-${uniqueId}${ext}`;
  }

  /**
   * Upload 1 file lên Supabase Storage (hoặc Local Fallback)
   */
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileName = this.generateFileName(file.originalname);

    // 1. Thử upload lên Supabase Storage nếu client sẵn sàng
    if (this.supabase) {
      try {
        const { data, error } = await this.supabase.storage
          .from(this.bucketName)
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
            upsert: false,
          });

        if (error) {
          console.error(`[StorageService] Lỗi upload Supabase Storage:`, error.message);
          // Nếu bucket chưa tồn tại hoặc lỗi quyền, fallback về local
        } else if (data) {
          const { data: publicUrlData } = this.supabase.storage
            .from(this.bucketName)
            .getPublicUrl(data.path);

          if (publicUrlData?.publicUrl) {
            return publicUrlData.publicUrl;
          }
        }
      } catch (cloudErr) {
        console.warn("[StorageService] Gặp lỗi khi đẩy lên Supabase, chuyển sang ghi Local:", cloudErr);
      }
    }

    // 2. Fallback: Lưu vào local file system
    const localFilePath = path.join(this.localUploadDir, fileName);
    await fs.writeFile(localFilePath, file.buffer);

    // Trả về đường dẫn tĩnh được express.static phục vụ
    return `/uploads/products/${fileName}`;
  }

  /**
   * Upload nhiều file đồng thời
   */
  async uploadFiles(files: Express.Multer.File[]): Promise<string[]> {
    if (!files || files.length === 0) {
      return [];
    }
    const uploadPromises = files.map((file) => this.uploadFile(file));
    return Promise.all(uploadPromises);
  }
}

export const storageService = new StorageService();
