import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware.js";

/**
 * Express Application Factory
 *
 * File này chỉ chịu trách nhiệm CẤU HÌNH Express:
 * - Đăng ký middleware (cors, json parser)
 * - Đăng ký routes
 * - Đăng ký error handler (LUÔN LUÔN ở cuối cùng)
 *
 * KHÔNG khởi động server ở đây (việc đó thuộc về index.ts)
 */

const app = express();

import productRoutes from "./routes/product.routes.js";
import bookingRoutes from "./routes/booking.routes.js";

// ─── Global Middlewares ────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ──────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Rent-ish API is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ────────────────────────────────────
app.use("/api/products", productRoutes);
app.use("/api/bookings", bookingRoutes);

// ─── Global Error Handler (PHẢI ĐẶT CUỐI CÙNG) ───
app.use(errorHandler);

export default app;
