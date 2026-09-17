import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';

/**
 * Auth Middleware — Xác thực JWT Token trên mọi protected route.
 *
 * Cách hoạt động:
 * 1. Đọc Access Token từ httpOnly cookie (ưu tiên) hoặc header Authorization (fallback cho API testing).
 * 2. Giải mã JWT bằng secret key.
 * 3. Gắn thông tin user (`userId`, `role`) vào `req.user` để các controller phía sau sử dụng.
 * 4. Nếu không có token hoặc token hết hạn → trả về 401 Unauthorized.
 */

// Mở rộng Request interface để TypeScript hiểu req.user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
      };
    }
  }
}

export const authenticate = (req: Request, _res: Response, next: NextFunction) => {
  try {
    // Ưu tiên đọc từ httpOnly cookie
    let token = req.cookies?.accessToken;

    // Fallback: đọc từ Authorization header (cho API testing tools như Postman/curl)
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    }

    if (!token) {
      throw ApiError.unauthorized('Access token is missing');
    }

    const decoded = jwt.verify(
      token,
      process.env['JWT_ACCESS_SECRET'] as string
    ) as { userId: string; role: string };

    // Gắn thông tin user vào request để controller sử dụng
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      next(ApiError.unauthorized('Access token has expired'));
    } else if (error instanceof jwt.JsonWebTokenError) {
      next(ApiError.unauthorized('Invalid access token'));
    } else {
      next(error);
    }
  }
};
