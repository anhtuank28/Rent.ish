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

// ─── Global Middlewares ────────────────────────────
app.use(cors({
  origin: process.env["FRONTEND_URL"] || "http://localhost:3000",
  credentials: true, // Cho phép gửi/nhận cookie cross-origin
}));
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
