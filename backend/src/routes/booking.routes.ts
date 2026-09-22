import { Router } from "express";
import { BookingController } from "../controllers/booking.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createBookingSchema, getBookingByIdSchema, updateBookingStatusSchema } from "../schemas/booking.schema.js";

const router = Router();

// ─── Protected Routes (Yêu cầu đăng nhập) ────────
// 1. Lấy tất cả đơn đặt thuê (Admin only)
router.get("/", authenticate, authorize("ADMIN"), BookingController.getAll);

// 2. Tạo đơn đặt thuê mới
router.post("/", authenticate, validate(createBookingSchema), BookingController.create);

// 3. Lấy danh sách đơn đặt thuê của tôi
router.get("/my-orders", authenticate, BookingController.getMyOrders);

// 4. Lấy chi tiết đơn đặt
router.get("/:id", authenticate, validate(getBookingByIdSchema), BookingController.getById);

// 5. Cập nhật trạng thái đơn (Admin only)
router.patch("/:id/status", authenticate, authorize("ADMIN"), validate(updateBookingStatusSchema), BookingController.updateStatus);

export default router;
