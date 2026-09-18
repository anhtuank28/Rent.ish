import { describe, it, expect, vi, beforeEach } from 'vitest';
import bcrypt from 'bcrypt';
import { ApiError } from '../../src/utils/ApiError.js';

// Khởi tạo các hàm mock
const mockFindUnique = vi.fn();
const mockCreate = vi.fn();

// Mock toàn bộ module prisma TRƯỚC KHI import service
vi.mock('../../src/config/prisma.js', () => ({
  prisma: {
    user: {
      findUnique: (...args: any[]) => mockFindUnique(...args),
      create: (...args: any[]) => mockCreate(...args),
    }
  }
}));

import { authService } from '../../src/services/auth.service.js';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('AuthService', () => {
  describe('register', () => {
    it('should throw ApiError if email already exists', async () => {
      mockFindUnique.mockResolvedValue({
        id: '123',
        email: 'test@rent.ish',
        password_hash: 'hashed',
        first_name: 'Test',
        last_name: 'User',
        role: 'CUSTOMER',
        created_at: new Date(),
        updated_at: new Date(),
      });

      await expect(
        authService.register({
          email: 'test@rent.ish',
          password: 'password123',
        })
      ).rejects.toThrow(new ApiError(400, 'Email already in use'));
    });

    it('should hash password and create new user if email is unique', async () => {
      mockFindUnique.mockResolvedValue(null);
      mockCreate.mockResolvedValue({
        id: '456',
        email: 'new@rent.ish',
        password_hash: 'hashed_password',
        first_name: 'New',
        last_name: 'User',
        role: 'CUSTOMER',
        created_at: new Date(),
        updated_at: new Date(),
      });

      const user = await authService.register({
        email: 'new@rent.ish',
        password: 'password123',
        first_name: 'New',
        last_name: 'User',
      });

      expect(mockCreate).toHaveBeenCalledOnce();
      expect(user.email).toBe('new@rent.ish');
      expect(user).not.toHaveProperty('password_hash');
    });
  });

  describe('login', () => {
    it('should throw ApiError if user not found', async () => {
      mockFindUnique.mockResolvedValue(null);

      await expect(
        authService.login({ email: 'notfound@rent.ish', password: '123' })
      ).rejects.toThrow(new ApiError(401, 'Invalid email or password'));
    });

    it('should throw ApiError if password does not match', async () => {
      mockFindUnique.mockResolvedValue({
        id: '123',
        email: 'test@rent.ish',
        password_hash: 'hashed',
        first_name: 'Test',
        last_name: 'User',
        role: 'CUSTOMER',
        created_at: new Date(),
        updated_at: new Date(),
      });

      vi.spyOn(bcrypt, 'compare').mockImplementation(async () => false);

      await expect(
        authService.login({ email: 'test@rent.ish', password: 'wrong' })
      ).rejects.toThrow(new ApiError(401, 'Invalid email or password'));
    });
  });
});
