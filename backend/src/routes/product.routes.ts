import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { BookingController } from "../controllers/booking.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = Router();

// ─── Public Routes (Không cần đăng nhập) ──────────
// Lấy danh sách sản phẩm
router.get("/", ProductController.getAll);

// Lấy chi tiết 1 sản phẩm
router.get("/:id", ProductController.getById);

// Kiểm tra tình trạng trống (availability) của sản phẩm
router.get("/:id/availability", BookingController.checkAvailability);

// ─── Admin Routes (Yêu cầu ADMIN role) ────────────
// Tạo sản phẩm mới
router.post("/", authenticate, authorize("ADMIN"), ProductController.create);

// Cập nhật sản phẩm
router.put("/:id", authenticate, authorize("ADMIN"), ProductController.update);

// Xóa mềm sản phẩm
router.delete("/:id", authenticate, authorize("ADMIN"), ProductController.delete);

export default router;
