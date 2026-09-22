import { PayOS } from "@payos/node";
import { prisma } from "../config/prisma.js";

export interface CreatePaymentParams {
  bookingId: string;
  amount: number;
  description?: string;
  returnUrl?: string;
  cancelUrl?: string;
}

export interface PaymentQrResult {
  orderCode: number;
  amount: number;
  description: string;
  qrCode: string;
  accountNumber: string;
  accountName: string;
  bankName: string;
  checkoutUrl?: string;
  isMock: boolean;
  status: string;
}

export class PayOSService {
  private payos: PayOS | null = null;
  private isMockMode: boolean = true;

  constructor() {
    const clientId = process.env["PAYOS_CLIENT_ID"];
    const apiKey = process.env["PAYOS_API_KEY"];
    const checksumKey = process.env["PAYOS_CHECKSUM_KEY"];

    if (clientId && apiKey && checksumKey) {
      try {
        this.payos = new PayOS({ clientId, apiKey, checksumKey });
        this.isMockMode = false;
        console.log("💳 [PayOSService] Đã kết nối PayOS Production / Sandbox");
      } catch (err) {
        console.warn("⚠️ [PayOSService] Không thể kết nối PayOS, chuyển sang Mock Simulator:", err);
        this.payos = null;
        this.isMockMode = true;
      }
    } else {
      console.log("ℹ️ [PayOSService] Đang chạy ở chế độ VietQR Mock Simulator (Chưa cấu hình PAYOS_CLIENT_ID)");
      this.isMockMode = true;
    }
  }

  /**
   * Tạo mã giao dịch số ngẫu nhiên 6-7 chữ số cho PayOS
   */
  private generateOrderCode(): number {
    return Math.floor(Date.now() / 1000) % 9000000 + 100000;
  }

  /**
   * Tạo link / mã QR thanh toán VietQR cho đơn đặt thuê
   */
  async createPaymentQr(params: CreatePaymentParams): Promise<PaymentQrResult> {
    const { bookingId, amount, description } = params;

    // Kiểm tra booking tồn tại
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { payment_transaction: true },
    });

    if (!booking) {
      throw new Error("Không tìm thấy đơn hàng cần thanh toán");
    }

    const orderCode = this.generateOrderCode();
    const cleanDesc = (description || `Thanh toan Rentish ${orderCode}`).slice(0, 25);
    const roundedAmount = Math.max(1000, Math.round(amount));

    const frontendUrl = process.env["FRONTEND_URL"] || "http://localhost:3000";
    const returnUrl = params.returnUrl || `${frontendUrl}/checkout/success?orderCode=${orderCode}`;
    const cancelUrl = params.cancelUrl || `${frontendUrl}/checkout?cancelled=true`;

    let qrCodeUrl = "";
    let checkoutUrl = "";
    let accountNumber = "0987654321";
    let accountName = "RENT-ISH CONSCIOUS FASHION";
    let bankName = "MBBank (Ngân hàng Quân Đội)";

    // 1. Nếu có cấu hình PayOS thật
    if (this.payos && !this.isMockMode) {
      try {
        const paymentData = {
          orderCode,
          amount: roundedAmount,
          description: cleanDesc,
          returnUrl,
          cancelUrl,
        };

        const res = await this.payos.paymentRequests.create(paymentData);
        orderCode;
        qrCodeUrl = res.qrCode;
        checkoutUrl = res.checkoutUrl;
        if (res.accountNumber) accountNumber = res.accountNumber;
        if (res.accountName) accountName = res.accountName;
        if (res.bin) bankName = `Ngân hàng (BIN: ${res.bin})`;
      } catch (payosError: any) {
        console.error("❌ [PayOSService] Lỗi gọi PayOS API:", payosError?.message || payosError);
        // Tự động fallback về VietQR tĩnh nếu API PayOS gặp sự cố
        qrCodeUrl = `https://img.vietqr.io/image/MB-0987654321-compact2.png?amount=${roundedAmount}&addInfo=${encodeURIComponent(cleanDesc)}&accountName=${encodeURIComponent(accountName)}`;
      }
    } else {
      // 2. Chế độ Mock Simulator VietQR chuẩn NAPAS 24/7
      qrCodeUrl = `https://img.vietqr.io/image/MB-0987654321-compact2.png?amount=${roundedAmount}&addInfo=${encodeURIComponent(cleanDesc)}&accountName=${encodeURIComponent(accountName)}`;
      checkoutUrl = `${frontendUrl}/checkout/mock-payos?orderCode=${orderCode}`;
    }

    // 3. Cập nhật hoặc tạo PaymentTransaction
    await prisma.paymentTransaction.upsert({
      where: { booking_id: bookingId },
      create: {
        booking_id: bookingId,
        amount: roundedAmount,
        provider: "VIETQR",
        provider_trans_id: orderCode.toString(),
        status: "PENDING",
      },
      update: {
        provider: "VIETQR",
        provider_trans_id: orderCode.toString(),
        amount: roundedAmount,
        status: "PENDING",
      },
    });

    return {
      orderCode,
      amount: roundedAmount,
      description: cleanDesc,
      qrCode: qrCodeUrl,
      accountNumber,
      accountName,
      bankName,
      checkoutUrl,
      isMock: this.isMockMode,
      status: "PENDING",
    };
  }

  /**
   * Xác thực và xử lý Webhook IPN từ PayOS
   */
  async handleWebhook(webhookBody: any): Promise<{ success: boolean; message: string }> {
    let verifiedData: any = null;

    if (this.payos && !this.isMockMode) {
      try {
        verifiedData = await this.payos.webhooks.verify(webhookBody);
      } catch (err: any) {
        console.error("❌ [PayOSService] Chữ ký Webhook không hợp lệ:", err?.message);
        throw new Error("Chữ ký Webhook không hợp lệ!");
      }
    } else {
      // Mock mode: chấp nhận body trực tiếp
      verifiedData = webhookBody?.data || webhookBody;
    }

    const orderCode = verifiedData?.orderCode;
    if (!orderCode) {
      throw new Error("Thiếu orderCode trong dữ liệu Webhook");
    }

    // Xác nhận thanh toán trong database
    await this.confirmPayment(orderCode.toString());

    return { success: true, message: `Xác nhận thanh toán đơn #${orderCode} thành công!` };
  }

  /**
   * Cập nhật trạng thái đơn sang CONFIRMED và giao dịch sang PAID
   */
  async confirmPayment(orderCode: string): Promise<boolean> {
    const transaction = await prisma.paymentTransaction.findFirst({
      where: { provider_trans_id: orderCode },
      include: { booking: true },
    });

    if (!transaction) {
      console.warn(`[PayOSService] Không tìm thấy giao dịch với orderCode: ${orderCode}`);
      return false;
    }

    await prisma.$transaction([
      prisma.paymentTransaction.update({
        where: { id: transaction.id },
        data: { status: "PAID" },
      }),
      prisma.booking.update({
        where: { id: transaction.booking_id },
        data: { status: "CONFIRMED" },
      }),
    ]);

    console.log(`✅ [PayOSService] Đã duyệt thanh toán thành công cho đơn Booking ID: ${transaction.booking_id}`);
    return true;
  }

  /**
   * Kiểm tra trạng thái thanh toán của orderCode (phục vụ Polling từ Frontend)
   */
  async getPaymentStatus(orderCode: string) {
    const transaction = await prisma.paymentTransaction.findFirst({
      where: { provider_trans_id: orderCode },
      include: { booking: true },
    });

    if (!transaction) {
      return { status: "NOT_FOUND", isPaid: false };
    }

    return {
      status: transaction.status,
      isPaid: transaction.status === "PAID",
      bookingId: transaction.booking_id,
      amount: Number(transaction.amount),
      bookingStatus: transaction.booking.status,
    };
  }
}

export const payosService = new PayOSService();
