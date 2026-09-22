import { prisma } from '../config/prisma.js';
import { ApiError } from '../utils/ApiError.js';

export class UserService {
  /**
   * Lấy danh sách toàn bộ người dùng kèm số lượng đơn đã đặt (Admin only)
   */
  static async getAllUsers() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        role: true,
        created_at: true,
        _count: {
          select: {
            bookings: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return users.map(u => ({
      id: u.id,
      email: u.email,
      fullName: `${u.first_name || ''} ${u.last_name || ''}`.trim() || u.email,
      role: u.role,
      created_at: u.created_at,
      bookingCount: u._count.bookings,
    }));
  }

  /**
   * Cập nhật vai trò người dùng (CUSTOMER <-> ADMIN)
   */
  static async updateUserRole(adminUserId: string, targetUserId: string, newRole: string) {
    if (!['CUSTOMER', 'ADMIN'].includes(newRole)) {
      throw ApiError.badRequest('Vai trò không hợp lệ. Chỉ chấp nhận CUSTOMER hoặc ADMIN.');
    }

    // Chốt an toàn: Không cho phép Admin tự tước quyền quản trị của chính mình
    if (adminUserId === targetUserId && newRole !== 'ADMIN') {
      throw ApiError.badRequest('Bạn không thể tự hạ quyền Quản trị viên của chính mình.');
    }

    const targetUser = await prisma.user.findUnique({ where: { id: targetUserId } });
    if (!targetUser) {
      throw ApiError.notFound('Không tìm thấy người dùng.');
    }

    const updated = await prisma.user.update({
      where: { id: targetUserId },
      data: { role: newRole },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        role: true,
        created_at: true,
      },
    });

    return {
      ...updated,
      fullName: `${updated.first_name || ''} ${updated.last_name || ''}`.trim() || updated.email,
    };
  }
}
