import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";

/**
 * Global Error Handler Middleware
 *
 * Đây là "lưới an toàn" cuối cùng của ứng dụng.
 * MỌI lỗi xảy ra ở bất kỳ route/controller nào đều sẽ chảy về đây.
 *
 * Quy tắc:
 * - Lỗi có cấu trúc (ApiError) → Trả về message rõ ràng cho client
 * - Lỗi không mong đợi (system crash) → Log ra console + trả về lỗi chung
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  // Nếu là lỗi do chúng ta chủ động ném ra (ApiError)
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.errors ? { errors: err.errors } : {})
    });
    return;
  }

  // Lỗi không mong đợi (bug, crash) → Log chi tiết ra console để debug
  console.error("❌ Unexpected Error:", err);

  res.status(500).json({
    success: false,
    message: "Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.",
  });
}
