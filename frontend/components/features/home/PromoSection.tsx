'use client';

import React from 'react';
import Link from 'next/link';

export function PromoSection() {
  const handleCopyPromo = () => {
    navigator.clipboard.writeText('RENTISHFIRST');
    alert('Đã sao chép mã giảm giá!');
  };

  return (
    <section className="w-full py-space-xl">
      <div className="max-w-7xl mx-auto px-margin sm:px-margin-lg">
        <div className="relative rounded-xl bg-gradient-to-r from-primary-container via-tertiary-container to-secondary-container p-space-lg sm:p-space-xl overflow-hidden shadow-[0_16px_40px_-8px_rgba(113,90,71,0.2)]">
          {/* Background circle */}
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 opacity-15 pointer-events-none">
            <svg className="w-full h-full text-on-secondary-fixed" fill="currentColor" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl">
            <span className="font-label-md text-label-md uppercase tracking-widest text-on-tertiary-fixed-variant font-bold block mb-space-xs">
              Ưu Đãi Độc Quyền Dành Cho Người Mới
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-secondary-fixed font-bold leading-tight">
              Không Bao Giờ Phải Mặc Lại Một Bộ Đồ.
            </h2>
            <p className="font-body-lg text-body-lg text-on-secondary-fixed-variant mt-space-sm mb-space-lg">
              Giảm ngay 600K cho lần thuê trang phục hàng hiệu đầu tiên của bạn. Nhập mã này lúc thanh toán:
            </p>

            <div className="flex flex-wrap items-center gap-space-sm">
              <div className="inline-flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-space-xs rounded-full shadow-sm">
                <span className="font-label-md text-label-md text-outline uppercase tracking-wider">
                  Mã Giảm Giá:
                </span>
                <span className="font-headline-sm text-headline-sm font-mono font-bold text-on-surface select-all">
                  RENTISHFIRST
                </span>
                <button
                  className="p-1 text-primary hover:text-on-surface transition-colors"
                  onClick={handleCopyPromo}
                  title="Sao chép mã"
                  type="button"
                >
                  <span className="material-symbols-outlined text-body-md">content_copy</span>
                </button>
              </div>
              <Link
                className="bg-on-secondary-fixed text-surface-container-lowest hover:bg-primary font-label-lg text-label-lg px-space-lg py-3 rounded-full transition-all shadow-md"
                href="#featured-catalog"
              >
                Nhận 600K Tín Dụng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
