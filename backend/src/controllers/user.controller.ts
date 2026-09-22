import type { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service.js';

export class UserController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const adminUserId = req.user!.userId;
      const { id: targetUserId } = req.params;
      const { role } = req.body;

      const updatedUser = await UserService.updateUserRole(adminUserId, targetUserId as string, role);
      res.status(200).json({
        success: true,
        message: 'Cập nhật vai trò thành công',
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }
}
