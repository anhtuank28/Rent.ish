import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { BookingController } from "../controllers/booking.controller.js";

const router = Router();

// Lấy danh sách sản phẩm
router.get("/", ProductController.getAll);

// Lấy chi tiết 1 sản phẩm
router.get("/:id", ProductController.getById);

// Kiểm tra tình trạng trống (availability) của sản phẩm
router.get("/:id/availability", BookingController.checkAvailability);

// Tạo sản phẩm mới (Admin)
// TODO: Thêm middleware auth(ADMIN) và validate()
router.post("/", ProductController.create);

// Cập nhật sản phẩm (Admin)
// TODO: Thêm middleware auth(ADMIN) và validate()
router.put("/:id", ProductController.update);

// Xóa mềm sản phẩm (Admin)
// TODO: Thêm middleware auth(ADMIN)
router.delete("/:id", ProductController.delete);

export default router;
