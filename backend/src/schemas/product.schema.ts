import { z } from 'zod';

export const getProductsSchema = z.object({
  query: z.object({
    page: z.string().optional().transform(val => (val ? parseInt(val) : 1)),
    limit: z.string().optional().transform(val => (val ? parseInt(val) : 12)),
    search: z.string().optional(),
    size: z.string().optional(),
    color: z.string().optional(),
    minPrice: z.string().optional().transform(val => (val ? parseFloat(val) : undefined)),
    maxPrice: z.string().optional().transform(val => (val ? parseFloat(val) : undefined)),
  })
});

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Tên sản phẩm không được để trống").trim(),
    description: z.string().optional(),
    image_url: z.string().optional(),
    images: z.array(z.string()).optional(),
    retail_price: z.number().positive("Giá bán lẻ phải lớn hơn 0"),
    rental_price: z.number().positive("Giá thuê phải lớn hơn 0"),
    variants: z.array(z.object({
      size: z.string(),
      color: z.string(),
      sku: z.string(),
      inventory_count: z.number().int().nonnegative().optional().default(1)
    })).optional()
  })
});

export const updateProductSchema = z.object({
  params: z.object({
    id: z.string().uuid("ID sản phẩm không hợp lệ")
  }),
  body: z.object({
    name: z.string().min(1).trim().optional(),
    description: z.string().optional(),
    image_url: z.string().optional(),
    images: z.array(z.string()).optional(),
    retail_price: z.number().positive().optional(),
    rental_price: z.number().positive().optional(),
  }).refine(data => Object.keys(data).length > 0, {
    message: "Phải cung cấp ít nhất 1 trường để cập nhật"
  })
});

export const getProductByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid("ID sản phẩm không hợp lệ")
  })
});
