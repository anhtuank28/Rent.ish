import { Router } from "express";
import { BookingController } from "../controllers/booking.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

// ─── Protected Routes (Yêu cầu đăng nhập) ────────
// 1. Tạo đơn đặt thuê mới
router.post("/", authenticate, BookingController.create);

// 2. Lấy chi tiết đơn đặt
router.get("/:id", authenticate, BookingController.getById);

// 3. Cập nhật trạng thái đơn
router.patch("/:id/status", authenticate, BookingController.updateStatus);

export default router;
