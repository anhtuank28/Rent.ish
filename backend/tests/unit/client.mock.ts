import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'vitest-mock-extended';
import { prisma } from '../../src/config/prisma.js';
import { vi, beforeEach } from 'vitest';

// Khai báo mock để Vitest đánh chặn module prisma thật
vi.mock('../../src/config/prisma.js', () => ({
  prisma: mockDeep<PrismaClient>(),
}));

// Export prisma đã được mock để các file test có thể dùng
export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

// Reset mock trước mỗi bài test
beforeEach(() => {
  vi.clearAllMocks();
});
