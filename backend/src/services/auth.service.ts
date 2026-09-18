import { prisma } from '../config/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';

/**
 * Tạo cặp Access Token (ngắn hạn) + Refresh Token (dài hạn).
 * Access Token: 15 phút — dùng để gọi API.
 * Refresh Token: 7 ngày — dùng để gia hạn Access Token khi hết hạn.
 */
function generateTokens(userId: string, role: string) {
  const accessToken = jwt.sign(
    { userId, role },
    process.env['JWT_ACCESS_SECRET'] as string,
    { expiresIn: (process.env['JWT_ACCESS_EXPIRES_IN'] || '15m') as NonNullable<jwt.SignOptions['expiresIn']> }
  );

  const refreshToken = jwt.sign(
    { userId, role },
    process.env['JWT_REFRESH_SECRET'] as string,
    { expiresIn: (process.env['JWT_REFRESH_EXPIRES_IN'] || '7d') as NonNullable<jwt.SignOptions['expiresIn']> }
  );

  return { accessToken, refreshToken };
}

/**
 * Cookie options chuẩn bảo mật:
 * - httpOnly: JavaScript không thể đọc cookie → chống XSS
 * - secure: Chỉ gửi qua HTTPS (tắt ở dev)
 * - sameSite: Chống CSRF
 */
const IS_PRODUCTION = process.env['NODE_ENV'] === 'production';

export const COOKIE_OPTIONS = {
  accessToken: {
    httpOnly: true,
    secure: true,
    sameSite: 'none' as const,
    maxAge: 15 * 60 * 1000,        // 15 phút
    path: '/',
  },
  refreshToken: {
    httpOnly: true,
    secure: true,
    sameSite: 'none' as const,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    path: '/api/auth',               // Chỉ gửi kèm request đến auth routes
  },
};

export const authService = {
  async register(data: any) {
    const { email, password, first_name, last_name } = data;

    if (!email || !password) {
      throw new ApiError(400, 'Email and password are required');
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ApiError(400, 'Email already in use');
    }

    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        email,
        password_hash,
        first_name,
        last_name,
      }
    });

    const { password_hash: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  async login(data: any) {
    const { email, password } = data;

    if (!email || !password) {
      throw new ApiError(400, 'Email and password are required');
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const tokens = generateTokens(user.id, user.role);

    const { password_hash: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      ...tokens,
    };
  },

  /**
   * Refresh Token — Cấp lại Access Token mới khi token cũ hết hạn.
   * Client gửi Refresh Token (từ httpOnly cookie) → Server xác minh → Trả Access Token mới.
   */
  async refresh(refreshTokenValue: string) {
    if (!refreshTokenValue) {
      throw ApiError.unauthorized('Refresh token is missing');
    }

    try {
      const decoded = jwt.verify(
        refreshTokenValue,
        process.env['JWT_REFRESH_SECRET'] as string
      ) as { userId: string; role: string };

      // Tạo Access Token mới (KHÔNG tạo Refresh Token mới — giữ nguyên cái cũ)
      const accessToken = jwt.sign(
        { userId: decoded.userId, role: decoded.role },
        process.env['JWT_ACCESS_SECRET'] as string,
        { expiresIn: (process.env['JWT_ACCESS_EXPIRES_IN'] || '15m') as NonNullable<jwt.SignOptions['expiresIn']> }
      );

      return { accessToken };
    } catch {
      throw ApiError.unauthorized('Invalid or expired refresh token');
    }
  },
};
