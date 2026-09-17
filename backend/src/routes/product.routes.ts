import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { BookingController } from "../controllers/booking.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { getProductsSchema, createProductSchema, updateProductSchema, getProductByIdSchema } from "../schemas/product.schema.js";
import { checkAvailabilitySchema } from "../schemas/booking.schema.js";

const router = Router();

// ─── Public Routes (Không cần đăng nhập) ──────────
// Lấy danh sách sản phẩm
router.get("/", validate(getProductsSchema), ProductController.getAll);

// Lấy chi tiết 1 sản phẩm
router.get("/:id", validate(getProductByIdSchema), ProductController.getById);

// Kiểm tra tình trạng trống (availability) của sản phẩm
router.get("/:id/availability", validate(checkAvailabilitySchema), BookingController.checkAvailability);

// ─── Admin Routes (Yêu cầu ADMIN role) ────────────
// Tạo sản phẩm mới
router.post("/", authenticate, authorize("ADMIN"), validate(createProductSchema), ProductController.create);

// Cập nhật sản phẩm
router.put("/:id", authenticate, authorize("ADMIN"), validate(updateProductSchema), ProductController.update);

// Xóa mềm sản phẩm
router.delete("/:id", authenticate, authorize("ADMIN"), validate(getProductByIdSchema), ProductController.delete);

export default router;
