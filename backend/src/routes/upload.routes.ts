import { Router, type Request, type Response, type NextFunction } from "express";
import multer from "multer";
import { uploadMiddleware, UploadController } from "../controllers/upload.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = Router();

// Wrapper bắt lỗi riêng của Multer để trả về thông báo tiếng Việt thân thiện
const handleUpload = (req: Request, res: Response, next: NextFunction) => {
  uploadMiddleware(req, res, (err: unknown) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        res.status(400).json({
          success: false,
          message: "Dung lượng hình ảnh vượt quá giới hạn tối đa (5MB).",
        });
        return;
      }
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        res.status(400).json({
          success: false,
          message: "Số lượng ảnh vượt quá giới hạn tối đa (tối đa 10 ảnh / lần tải lên).",
        });
        return;
      }
      res.status(400).json({
        success: false,
        message: `Lỗi upload: ${err.message}`,
      });
      return;
    }
    if (err instanceof Error) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
      return;
    }
    next();
  });
};

// POST /api/upload - Dành riêng cho ADMIN tải lên tối đa 10 ảnh
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  handleUpload,
  UploadController.uploadImages
);

export default router;
