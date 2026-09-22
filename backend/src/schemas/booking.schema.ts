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
    address: z.object({
      fullName: z.string().min(1, "Vui lòng nhập họ tên"),
      phone: z.string().min(1, "Vui lòng nhập số điện thoại"),
      street: z.string().min(1, "Vui lòng nhập địa chỉ cụ thể"),
      city: z.string().min(1, "Vui lòng nhập Tỉnh/Thành phố"),
      district: z.string().min(1, "Vui lòng nhập Quận/Huyện"),
      ward: z.string().min(1, "Vui lòng nhập Phường/Xã"),
    }),
    paymentMethod: z.string().optional(),
    items: z.array(z.any()).optional()
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
