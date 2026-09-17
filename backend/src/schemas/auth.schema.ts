import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email("Email không hợp lệ").trim().toLowerCase(),
    password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự").max(100),
    first_name: z.string().trim().optional(),
    last_name: z.string().trim().optional(),
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Email không hợp lệ").trim().toLowerCase(),
    password: z.string().min(1, "Vui lòng nhập mật khẩu"),
  })
});
