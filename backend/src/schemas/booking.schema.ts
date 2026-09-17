import { z } from 'zod';

// Helper kiểm tra ngày tháng hợp lệ
const dateSchema = z.string().refine(val => !isNaN(Date.parse(val)), {
  message: "Ngày tháng không hợp lệ (nên dùng định dạng YYYY-MM-DD hoặc ISO 8601)"
});

export const checkAvailabilitySchema = z.object({
  params: z.object({
    id: z.string().uuid("ID sản phẩm không hợp lệ")
  }),
  query: z.object({
    startDate: dateSchema,
    endDate: dateSchema
  }).refine(data => new Date(data.startDate) <= new Date(data.endDate), {
    message: "Ngày bắt đầu (startDate) phải trước hoặc bằng ngày kết thúc (endDate)",
    path: ["endDate"]
  })
});

export const createBookingSchema = z.object({
  body: z.object({
    userId: z.string().uuid("ID người dùng không hợp lệ").optional(),
    totalPrice: z.number().positive("Tổng giá phải lớn hơn 0"),
    items: z.array(
      z.object({
        inventoryUnitId: z.string().uuid("inventoryUnitId không hợp lệ"),
        startDate: dateSchema,
        endDate: dateSchema
      }).refine(item => new Date(item.startDate) <= new Date(item.endDate), {
        message: "startDate phải trước hoặc bằng endDate",
        path: ["endDate"]
      })
    ).min(1, "Đơn đặt phải có ít nhất 1 sản phẩm")
  })
});

export const updateBookingStatusSchema = z.object({
  params: z.object({
    id: z.string().uuid("ID đơn đặt không hợp lệ")
  }),
  body: z.object({
    status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"], {
      message: "Trạng thái không hợp lệ. Chỉ chấp nhận: PENDING, CONFIRMED, COMPLETED, CANCELLED"
    })
  })
});

export const getBookingByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid("ID đơn đặt không hợp lệ")
  })
});
