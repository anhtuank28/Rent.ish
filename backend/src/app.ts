import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";

/**
 * Express Application Factory
 *
 * File này chỉ chịu trách nhiệm CẤU HÌNH Express:
 * - Đăng ký middleware (cors, json parser, cookie parser)
 * - Đăng ký routes
 * - Đăng ký error handler (LUÔN LUÔN ở cuối cùng)
 *
 * KHÔNG khởi động server ở đây (việc đó thuộc về index.ts)
 */

const app = express();

import productRoutes from "./routes/product.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import authRoutes from "./routes/auth.routes.js";

import helmet from "helmet";
import rateLimit from "express-rate-limit";

// ─── Global Middlewares ────────────────────────────
// 1. Trust Proxy (Quan trọng khi deploy lên cloud có load balancer)
app.set('trust proxy', 1);

// 2. Helmet (Bảo vệ HTTP Headers chống XSS, Clickjacking...)
app.use(helmet());

// 3. CORS
app.use(cors({
  origin: process.env["FRONTEND_URL"] || "http://localhost:3000",
  credentials: true, // Cho phép gửi/nhận cookie cross-origin
}));

// 4. Rate Limiter (Chống DDoS và Brute Force cơ bản)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // Giới hạn mỗi IP tối đa 100 request / 15 phút
  message: { success: false, message: "Quá nhiều yêu cầu từ IP của bạn, vui lòng thử lại sau 15 phút." },
  standardHeaders: true,
  legacyHeaders: false,
});
// Áp dụng Rate Limiter cho tất cả API
app.use("/api", apiLimiter);

// 5. Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── Health Check ──────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Rent-ish API is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/bookings", bookingRoutes);

// ─── Global Error Handler (PHẢI ĐẶT CUỐI CÙNG) ───
app.use(errorHandler);

export default app;
