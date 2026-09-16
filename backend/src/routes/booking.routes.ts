import { Router } from "express";
import { BookingController } from "../controllers/booking.controller.js";

const router = Router();

// 1. Tạo đơn đặt thuê mới
router.post("/", BookingController.create);

// 2. Lấy chi tiết đơn đặt
router.get("/:id", BookingController.getById);

// 3. Cập nhật trạng thái đơn
router.patch("/:id/status", BookingController.updateStatus);

export default router;
