import { Router } from "express";
import { BookingController } from "../controllers/booking.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createBookingSchema, getBookingByIdSchema, updateBookingStatusSchema } from "../schemas/booking.schema.js";

const router = Router();

// ─── Protected Routes (Yêu cầu đăng nhập) ────────
// 1. Tạo đơn đặt thuê mới
router.post("/", authenticate, validate(createBookingSchema), BookingController.create);

// 2. Lấy chi tiết đơn đặt
router.get("/:id", authenticate, validate(getBookingByIdSchema), BookingController.getById);

// 3. Cập nhật trạng thái đơn
router.patch("/:id/status", authenticate, validate(updateBookingStatusSchema), BookingController.updateStatus);

export default router;
