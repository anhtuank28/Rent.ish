import React from 'react';
import Link from 'next/link';


export function CartHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(36,30,26,0.05)]">
      <div className="h-16 max-w-7xl mx-auto px-gutter-sm lg:px-margin flex items-center justify-between">
        <div className="flex items-center gap-space-md">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">Rent-ish</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-3 text-label-sm">
          <span className="flex items-center gap-1.5 font-semibold text-on-surface bg-primary-container/40 px-3 py-1 rounded-full text-on-primary-container">
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
            1. Giỏ hàng
          </span>
          <span className="text-outline/60">—</span>
          <span className="text-on-surface-variant/70">2. Thanh toán</span>
          <span className="text-outline/60">—</span>
          <span className="text-on-surface-variant/70">3. Xác nhận</span>
        </nav>
        
        <div className="flex items-center gap-space-md">
          <Link href="/dresses" className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface flex items-center gap-1.5 transition-colors">
            <span className="material-symbols-outlined text-[16px]">west</span>
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </header>
  );
}
