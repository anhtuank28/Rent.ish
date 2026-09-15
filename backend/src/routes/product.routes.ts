import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";

const router = Router();

// Lấy danh sách sản phẩm
router.get("/", ProductController.getAll);

// Lấy chi tiết 1 sản phẩm
router.get("/:id", ProductController.getById);

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
