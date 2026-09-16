"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface OrderSummaryProps {
  itemCount: number;
  subtotal: number;
  careProtectionPrice: number;
  hasCareProtection: boolean;
}

export function OrderSummary({ itemCount, subtotal, careProtectionPrice, hasCareProtection }: OrderSummaryProps) {
  const [showPromo, setShowPromo] = useState(false);
  
  const total = subtotal + (hasCareProtection ? careProtectionPrice : 0);

  return (
    <div className="bg-surface-container-lowest rounded-DEFAULT p-6 shadow-[0_4px_24px_rgba(36,30,26,0.06)]">
      <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface pb-3 border-b border-surface-container">
        Tóm Tắt Đơn Thuê
      </h2>
      
      <div className="py-3 flex flex-col gap-2.5 font-body-sm text-body-sm">
        <div className="flex items-center justify-between text-on-surface">
          <span>Tạm tính ({itemCount} sản phẩm)</span>
          <span className="font-semibold">{subtotal}K</span>
        </div>
        <div className="flex items-center justify-between text-on-surface">
          <span>Size dự phòng ({itemCount}x)</span>
          <span className="text-tertiary font-medium">MIỄN PHÍ</span>
        </div>
        <div className="flex items-center justify-between text-on-surface">
          <span>Giặt khô thân thiện môi trường</span>
          <span className="text-tertiary font-medium">MIỄN PHÍ</span>
        </div>
        <div className="flex items-center justify-between text-on-surface">
          <span>Giao nhận & hoàn trả 2 chiều</span>
          <span className="text-tertiary font-medium">MIỄN PHÍ</span>
        </div>
        {hasCareProtection && (
          <div className="flex items-center justify-between text-on-surface">
            <span>Bảo hiểm Rent-ish Care</span>
            <span className="font-semibold">{careProtectionPrice}K</span>
          </div>
        )}
        <div className="flex items-center justify-between text-on-surface-variant text-[13px]">
          <span>Phí cọc bảo đảm (Hoàn lại)</span>
          <span className="font-medium text-on-surface-variant">0K (Không giữ tiền)</span>
        </div>
      </div>
      
      <div className="pt-2 pb-3">
        <button
          className="text-label-sm font-medium text-primary hover:text-on-surface flex items-center gap-1 transition-colors"
          onClick={() => setShowPromo(!showPromo)}
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          Thêm mã khuyến mãi
        </button>
        
        {showPromo && (
          <div className="mt-2 flex items-center gap-1.5 bg-surface-container-low rounded-full p-1 shadow-inner">
            <input
              className="bg-transparent border-0 outline-none text-body-sm text-on-surface placeholder:text-outline w-full px-3 py-1"
              placeholder="Nhập mã (VD: FIRSTLOOK)"
              type="text"
            />
            <button
              className="bg-inverse-surface text-inverse-on-surface hover:bg-on-surface-variant text-label-sm px-3 py-1.5 rounded-full transition-colors shrink-0 font-medium"
              type="button"
            >
              Áp dụng
            </button>
          </div>
        )}
      </div>
      
      <div className="pt-4 mb-5 border-t border-surface-container bg-surface-container-low/50 -mx-6 px-6 py-4 flex items-baseline justify-between">
        <span className="font-headline-sm text-[18px] font-semibold text-on-surface">Tổng cộng</span>
        <div className="text-right">
          <span className="font-headline-lg text-headline-lg font-bold text-on-surface">{total}K</span>
          <p className="text-[11px] text-on-surface-variant">Thuế VAT tính ở bước sau</p>
        </div>
      </div>
      
      <Link
        className="w-full bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container h-12 rounded-full flex items-center justify-center gap-2 font-headline-sm text-[16px] font-semibold shadow-sm transition-all transform active:scale-[0.99] text-center"
        href="#"
      >
        <span>Tiến hành thanh toán</span>
        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
      </Link>
      
      <div className="mt-5 pt-4 border-t border-surface-container flex flex-col gap-2 font-label-sm text-on-surface-variant">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
          <span>Miễn phí giao hàng 2 chiều & kèm sẵn túi trả đồ</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
          <span>Không cần giặt giũ — chúng tôi sẽ lo phần đó</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
          <span>Đảm bảo vừa vặn hoặc hoàn tiền tín dụng ngay lập tức</span>
        </div>
      </div>
    </div>
  );
}
