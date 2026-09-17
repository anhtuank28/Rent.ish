import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError.js';

/**
 * Role Middleware — Phân quyền theo vai trò (CUSTOMER vs ADMIN).
 *
 * Middleware này PHẢI đặt SAU `authenticate` middleware.
 * Vì nó đọc `req.user.role` (đã được gắn bởi auth.middleware).
 *
 * Cách sử dụng:
 *   router.delete("/products/:id", authenticate, authorize("ADMIN"), ProductController.delete);
 *   // → Chỉ ADMIN mới có quyền xóa sản phẩm.
 *
 *   router.post("/bookings", authenticate, authorize("CUSTOMER", "ADMIN"), BookingController.create);
 *   // → Cả CUSTOMER và ADMIN đều có quyền tạo booking.
 */
export const authorize = (...allowedRoles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(ApiError.unauthorized('Authentication required'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(ApiError.forbidden(
        `Role "${req.user.role}" does not have permission to access this resource`
      ));
    }

    next();
  };
};
