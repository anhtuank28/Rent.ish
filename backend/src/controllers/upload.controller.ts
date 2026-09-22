import type { Request, Response, NextFunction } from "express";
import multer from "multer";
import { storageService } from "../services/storage.service.js";

// Cấu hình Multer lưu file tạm trong RAM dưới dạng Buffer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Giới hạn 5MB / file
    files: 10, // Tối đa 10 file 1 lần upload
  },
  fileFilter: (_req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/jpg"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Định dạng file không được hỗ trợ. Chỉ chấp nhận JPG, PNG, WEBP, GIF."));
    }
  },
});

export const uploadMiddleware = upload.array("images", 10);

export class UploadController {
  static async uploadImages(req: Request, res: Response, next: NextFunction) {
    try {
      const files = req.files as Express.Multer.File[] | undefined;

      if (!files || files.length === 0) {
        res.status(400).json({
          success: false,
          message: "Vui lòng chọn ít nhất một hình ảnh để tải lên.",
        });
        return;
      }

      // Đẩy ảnh lên storage service
      const urls = await storageService.uploadFiles(files);

      res.status(200).json({
        success: true,
        message: `Đã tải lên thành công ${urls.length} hình ảnh.`,
        data: {
          urls,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
