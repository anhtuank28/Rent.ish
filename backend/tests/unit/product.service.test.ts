import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Prisma } from '@prisma/client';
import { ApiError } from '../../src/utils/ApiError.js';

const mockFindMany = vi.fn();
const mockCount = vi.fn();
const mockFindUnique = vi.fn();
const mockFindFirst = vi.fn();

vi.mock('../../src/config/prisma.js', () => ({
  prisma: {
    product: {
      findMany: (...args: any[]) => mockFindMany(...args),
      count: (...args: any[]) => mockCount(...args),
      findUnique: (...args: any[]) => mockFindUnique(...args),
      findFirst: (...args: any[]) => mockFindFirst(...args),
    }
  }
}));

import { ProductService } from '../../src/services/product.service.js';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('ProductService', () => {
  describe('getAllProducts', () => {
    it('should return products with pagination', async () => {
      mockFindMany.mockResolvedValue([
        {
          id: 'prod-1',
          name: 'Áo dài',
          description: null,
          category: 'CLOTHING',
          retail_price: new Prisma.Decimal(100),
          rental_price: new Prisma.Decimal(10),
          created_at: new Date(),
          updated_at: new Date(),
        }
      ]);
      mockCount.mockResolvedValue(1);

      const result = await ProductService.getAllProducts(1, 10);
      
      expect(result.products).toHaveLength(1);
      expect(result.pagination.total).toBe(1);
      expect(result.pagination.page).toBe(1);
    });
  });

  describe('getProductById', () => {
    it('should throw ApiError if product not found', async () => {
      mockFindFirst.mockResolvedValue(null);

      await expect(
        ProductService.getProductById('non-existent-id')
      ).rejects.toThrow(new ApiError(404, 'Không tìm thấy sản phẩm'));
    });
  });
});
