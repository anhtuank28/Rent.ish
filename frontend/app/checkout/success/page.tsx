import React from 'react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <main className="w-full min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface-container p-8 rounded-3xl text-center shadow-sm">
        <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-[32px]">check_circle</span>
        </div>
        <h1 className="font-headline-md text-headline-md text-on-surface mb-2">Đặt thuê thành công!</h1>
        <p className="text-body-md text-on-surface-variant mb-8">
          Cảm ơn bạn đã lựa chọn Rent-ish. Chúng tôi đang xử lý đơn hàng của bạn và sẽ liên hệ sớm nhất để xác nhận.
        </p>
        <div className="space-y-3">
          <Link href="/orders" className="block w-full h-12 leading-[48px] rounded-full bg-primary text-on-primary font-label-lg transition-transform active:scale-95">
            Xem Đơn Hàng Của Tôi
          </Link>
          <Link href="/" className="block w-full h-12 leading-[48px] rounded-full bg-surface-container-high text-on-surface font-label-lg transition-transform active:scale-95">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </main>
  );
}
