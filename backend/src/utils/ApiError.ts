/**
 * Custom API Error Class
 *
 * Dùng để ném lỗi có cấu trúc rõ ràng (status code + message)
 * thay vì để Express trả về lỗi mặc định khó hiểu.
 *
 * Ví dụ sử dụng:
 *   throw new ApiError(404, "Không tìm thấy sản phẩm");
 *   throw new ApiError(400, "Dữ liệu không hợp lệ");
 */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly errors?: any[];

  constructor(statusCode: number, message: string, isOperational = true, errors?: any[]) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (errors !== undefined) {
      this.errors = errors;
    }

    // Giữ nguyên tên class khi log lỗi
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  // Factory methods — Tạo lỗi nhanh cho các trường hợp phổ biến
  static badRequest(message = "Yêu cầu không hợp lệ") {
    return new ApiError(400, message);
  }

  static unauthorized(message = "Chưa xác thực") {
    return new ApiError(401, message);
  }

  static forbidden(message = "Không có quyền truy cập") {
    return new ApiError(403, message);
  }

  static notFound(message = "Không tìm thấy tài nguyên") {
    return new ApiError(404, message);
  }

  static conflict(message = "Dữ liệu bị xung đột") {
    return new ApiError(409, message);
  }

  static internal(message = "Lỗi hệ thống") {
    return new ApiError(500, message, false);
  }
}
