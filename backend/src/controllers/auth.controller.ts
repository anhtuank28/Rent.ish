import type { Request, Response, NextFunction } from 'express';
import { authService, COOKIE_OPTIONS } from '../services/auth.service.js';
import { prisma } from '../config/prisma.js';
import { ApiError } from '../utils/ApiError.js';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({
      success: true,
      data: user,
      message: 'User registered successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.login(req.body);

    // Gắn tokens vào httpOnly cookie — JavaScript KHÔNG THỂ đọc được
    res.cookie('accessToken', result.accessToken, COOKIE_OPTIONS.accessToken);
    res.cookie('refreshToken', result.refreshToken, COOKIE_OPTIONS.refreshToken);

    // Chỉ trả user info trong body (KHÔNG trả token)
    res.status(200).json({
      success: true,
      data: { user: result.user },
      message: 'Login successful'
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshTokenValue = req.cookies?.refreshToken;
    const result = await authService.refresh(refreshTokenValue);

    // Gắn access token mới vào cookie
    res.cookie('accessToken', result.accessToken, COOKIE_OPTIONS.accessToken);

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    // Xóa cả 2 cookie bằng cách set maxAge = 0
    res.clearCookie('accessToken', { ...COOKIE_OPTIONS.accessToken, maxAge: 0 });
    res.clearCookie('refreshToken', { ...COOKIE_OPTIONS.refreshToken, maxAge: 0 });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    next(error);
  }
};



/**
 * GET /api/auth/me — Trả thông tin user hiện tại từ token trong cookie.
 * Frontend dùng API này thay cho việc đọc localStorage.
 */
export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        role: true,
      }
    });

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'User';

    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        fullName,
        role: user.role
      },
    });
  } catch (error) {
    next(error);
  }
};
