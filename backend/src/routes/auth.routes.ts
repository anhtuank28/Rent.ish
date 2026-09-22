import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';
import rateLimit from 'express-rate-limit';

const router = Router();

// Strict Rate Limiter cho Auth (Chống dò mật khẩu/Brute-force)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: process.env.NODE_ENV === "production" ? 10 : 500,
  message: { success: false, message: "Quá nhiều lần thử đăng nhập/đăng ký. Vui lòng thử lại sau 15 phút." },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/register', authLimiter, validate(registerSchema), authController.register);
router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);
router.get('/me', authenticate, authController.me);

export default router;
