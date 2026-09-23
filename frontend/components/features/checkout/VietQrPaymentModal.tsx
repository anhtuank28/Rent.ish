"use client";

import React, { useState, useEffect, useRef } from "react";

export interface VietQrData {
  orderCode: number;
  amount: number;
  description: string;
  qrCode: string;
  accountNumber: string;
  accountName: string;
  bankName: string;
  checkoutUrl?: string;
  isMock: boolean;
  bookingId?: string;
}

interface VietQrPaymentModalProps {
  qrData: VietQrData;
  onSuccess: () => void;
  onClose: () => void;
}

export default function VietQrPaymentModal({
  qrData,
  onSuccess,
  onClose,
}: VietQrPaymentModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 phút (900s)
  const [isPaid, setIsPaid] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // ─── Đồng hồ đếm ngược ───
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // ─── Sao chép thông tin nhanh ───
  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // ─── Polling kiểm tra trạng thái thanh toán từ Backend ───
  useEffect(() => {
    if (isPaid) return;

    const checkPayment = async () => {
      try {
        const res = await fetch(`/api/payment/status/${qrData.orderCode}`);
        const json = await res.json();
        if (json.success && json.data?.isPaid) {
          setIsPaid(true);
          if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
          // Chờ 1.5s để người dùng nhìn thấy thông báo thành công rồi chuyển hướng
          setTimeout(() => {
            onSuccess();
          }, 1500);
        }
      } catch (err) {
        console.error("Lỗi polling kiểm tra thanh toán:", err);
      }
    };

    pollIntervalRef.current = setInterval(checkPayment, 2500);

    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, [qrData.orderCode, isPaid, onSuccess]);

  // ─── Nút giả lập thanh toán (Dành cho Dev / Mock mode) ───
  const handleSimulatePayment = async () => {
    try {
      setIsSimulating(true);
      const res = await fetch("/api/payment/simulate-success", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderCode: qrData.orderCode }),
      });
      const json = await res.json();
      if (json.success) {
        setIsPaid(true);
        setTimeout(() => {
          onSuccess();
        }, 1200);
      } else {
        alert(json.message || "Giả lập thất bại");
      }
    } catch {
      alert("Lỗi kết nối giả lập");
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-3xl max-w-md w-full p-4 sm:p-6 shadow-2xl border border-surface-container relative max-h-[92vh] overflow-y-auto">
        
        {/* Nút đóng */}
        {!isPaid && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-secondary hover:text-on-surface hover:bg-surface-container-low transition-colors"
            title="Đóng"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        )}

        {/* Trạng thái đã thanh toán thành công */}
        {isPaid ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Thanh Toán Thành Công! 🎉
            </h3>
            <p className="text-body-md text-on-surface-variant">
              Hệ thống đã nhận được tiền và xác nhận đơn hàng của bạn. Đang chuyển hướng...
            </p>
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mt-4" />
          </div>
        ) : (
          <div className="space-y-4">
            {/* Header Modal */}
            <div className="text-center pb-2 border-b border-surface-container-low">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
                <span className="material-symbols-outlined text-[15px]">qr_code_scanner</span>
                <span>Thanh Toán VietQR Tự Động</span>
              </div>
              <h3 className="font-headline-sm text-xl font-bold text-on-surface">
                Quét Mã Để Xác Nhận Đơn
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Mở ứng dụng ngân hàng bất kỳ để quét mã QR bên dưới
              </p>
            </div>

            {/* Đồng hồ đếm ngược */}
            <div className="flex items-center justify-center gap-2 py-1.5 px-3 rounded-xl bg-surface-container-low text-xs text-on-surface-variant font-medium">
              <span className="material-symbols-outlined text-[16px] text-amber-500">timer</span>
              <span>Mã thanh toán hết hạn sau:</span>
              <strong className="font-mono text-primary font-bold">{formatTime(timeLeft)}</strong>
            </div>

            {/* Khung Mã QR */}
            <div className="relative p-3.5 rounded-2xl bg-white border-2 border-primary/20 shadow-md flex flex-col items-center justify-center min-h-[240px]">
              {!isImageLoaded && (
                <div className="w-52 h-52 flex flex-col items-center justify-center bg-surface-container-low rounded-lg animate-pulse gap-2 text-on-surface-variant">
                  <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-[11px] font-medium">Đang tạo mã VietQR...</span>
                </div>
              )}
              <img
                src={qrData.qrCode}
                alt="Mã VietQR thanh toán"
                onLoad={() => setIsImageLoaded(true)}
                className={`w-52 h-52 object-contain rounded-lg transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0 absolute'}`}
              />
              <div className="flex items-center gap-2 mt-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-semibold text-emerald-700">
                  Hệ thống đang tự động lắng nghe giao dịch...
                </span>
              </div>
            </div>

            {/* Thông tin chuyển khoản chi tiết */}
            <div className="p-3.5 rounded-2xl bg-surface-container-low/70 border border-surface-container space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-secondary font-medium">Ngân hàng:</span>
                <span className="font-semibold text-on-surface">{qrData.bankName}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-secondary font-medium">Số tài khoản:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-on-surface text-sm">{qrData.accountNumber}</span>
                  <button
                    onClick={() => handleCopy(qrData.accountNumber, "stk")}
                    className="p-1 hover:bg-surface-container rounded text-primary text-[10px] font-bold"
                    title="Sao chép"
                  >
                    {copiedField === "stk" ? "✓ Đã chép" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-secondary font-medium">Chủ tài khoản:</span>
                <span className="font-semibold text-on-surface uppercase">{qrData.accountName}</span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-surface-container">
                <span className="text-secondary font-medium">Số tiền chính xác:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-primary text-base">
                    {qrData.amount.toLocaleString("vi-VN")}đ
                  </span>
                  <button
                    onClick={() => handleCopy(qrData.amount.toString(), "amount")}
                    className="p-1 hover:bg-surface-container rounded text-primary text-[10px] font-bold"
                    title="Sao chép"
                  >
                    {copiedField === "amount" ? "✓ Đã chép" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-surface-container">
                <span className="text-secondary font-medium">Nội dung chuyển khoản:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-on-surface bg-surface-container px-2 py-0.5 rounded">
                    {qrData.description}
                  </span>
                  <button
                    onClick={() => handleCopy(qrData.description, "desc")}
                    className="p-1 hover:bg-surface-container rounded text-primary text-[10px] font-bold"
                    title="Sao chép"
                  >
                    {copiedField === "desc" ? "✓ Đã chép" : "Copy"}
                  </button>
                </div>
              </div>
            </div>

            {/* Khu vực Giả lập Test (Sandbox Mode) */}
            {qrData.isMock && (
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-2">
                <p className="text-[11px] text-amber-800 font-medium">
                  🧪 <strong>Chế độ Thử nghiệm:</strong> Bạn có thể bấm nút bên dưới để giả lập đã chuyển tiền thành công qua ngân hàng.
                </p>
                <button
                  type="button"
                  disabled={isSimulating}
                  onClick={handleSimulatePayment}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">bolt</span>
                  <span>{isSimulating ? "Đang xử lý..." : "⚡ Giả Lập Quét Mã Thanh Toán Thành Công"}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
