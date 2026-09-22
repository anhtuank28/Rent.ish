import type { Request, Response, NextFunction } from "express";
import { payosService } from "../services/payos.service.js";
import { ApiError } from "../utils/ApiError.js";

export class PaymentController {
  /**
   * Tạo mã QR thanh toán VietQR cho đơn hàng
   * POST /api/payment/create-qr
   */
  static async createPaymentQr(req: Request, res: Response, next: NextFunction) {
    try {
      const { bookingId, amount, description } = req.body;

      if (!bookingId) {
        throw ApiError.badRequest("Vui lòng cung cấp bookingId.");
      }

      if (!amount || Number(amount) <= 0) {
        throw ApiError.badRequest("Số tiền thanh toán không hợp lệ.");
      }

      const qrData = await payosService.createPaymentQr({
        bookingId,
        amount: Number(amount),
        description,
      });

      res.status(200).json({
        success: true,
        message: "Tạo mã VietQR thanh toán thành công",
        data: qrData,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Kiểm tra trạng thái thanh toán (Dành cho Frontend Polling)
   * GET /api/payment/status/:orderCode
   */
  static async checkStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderCode } = req.params;

      if (!orderCode) {
        throw ApiError.badRequest("Vui lòng cung cấp orderCode.");
      }

      const status = await payosService.getPaymentStatus(orderCode as string);

      res.status(200).json({
        success: true,
        data: status,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Nhận Webhook IPN từ PayOS khi giao dịch ngân hàng thành công
   * POST /api/payment/webhook
   */
  static async handleWebhook(req: Request, res: Response, next: NextFunction) {
    try {
      const webhookData = req.body;

      const result = await payosService.handleWebhook(webhookData);

      res.status(200).json(result);
    } catch (error: any) {
      console.error("❌ Lỗi xử lý Webhook PayOS:", error.message);
      res.status(400).json({
        success: false,
        message: error.message || "Lỗi xử lý Webhook",
      });
    }
  }

  /**
   * Giả lập thanh toán thành công (Dành riêng cho Môi trường Test / Dev Mock)
   * POST /api/payment/simulate-success
   */
  static async simulateSuccess(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderCode } = req.body;

      if (!orderCode) {
        throw ApiError.badRequest("Vui lòng cung cấp orderCode để giả lập.");
      }

      const confirmed = await payosService.confirmPayment(orderCode.toString());

      if (!confirmed) {
        throw ApiError.notFound(`Không tìm thấy đơn hàng với orderCode: ${orderCode}`);
      }

      res.status(200).json({
        success: true,
        message: `Đã giả lập thanh toán thành công cho đơn #${orderCode}!`,
      });
    } catch (error) {
      next(error);
    }
  }
}
