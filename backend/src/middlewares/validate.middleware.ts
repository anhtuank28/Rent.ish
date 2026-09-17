import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import type { ZodSchema, ZodIssue } from 'zod';
import { ApiError } from '../utils/ApiError.js';

/**
 * Middleware dùng Zod để validate Request (body, query, params).
 * Nếu validate thất bại, trả về HTTP 400 kèm chi tiết lỗi của từng trường.
 */
export const validate = (schema: ZodSchema) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      // Zod parse (đồng bộ hoặc bất đồng bộ)
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Gom nhóm tất cả lỗi validation để trả về cho Client
        const validationErrors = error.issues.map((err: ZodIssue) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        
        // Ném lỗi 400 Bad Request kèm chi tiết cho ErrorHandler chung
        next(new ApiError(400, 'Lỗi kiểm tra dữ liệu đầu vào (Validation Error)', true, validationErrors));
      } else {
        next(error);
      }
    }
  };
};
