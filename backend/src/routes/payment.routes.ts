import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

// ─── Public Webhook & Status Routes ────────────────
// 1. Nhận Webhook IPN từ PayOS (PayOS tự gọi không kèm JWT cookie của user)
router.post("/webhook", PaymentController.handleWebhook);

// 2. Kiểm tra trạng thái đơn hàng (Polling từ Frontend)
router.get("/status/:orderCode", PaymentController.checkStatus);

// 3. Giả lập thanh toán thành công (Môi trường Test / Dev)
router.post("/simulate-success", PaymentController.simulateSuccess);

// ─── Protected Routes (Yêu cầu đăng nhập) ──────────
// 4. Tạo mã VietQR thanh toán cho đơn hàng
router.post("/create-qr", authenticate, PaymentController.createPaymentQr);

export default router;
