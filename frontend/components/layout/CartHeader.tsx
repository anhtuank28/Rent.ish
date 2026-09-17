import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function CartHeader({ step = 1 }: { step?: 1 | 2 | 3 }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(36,30,26,0.05)]">
      <div className="h-16 max-w-7xl mx-auto px-gutter-sm lg:px-margin flex items-center justify-between">
        <div className="flex items-center gap-space-md">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="Rent-ish Logo"
              width={142}
              height={32}
              className="h-8 w-auto object-contain"
            />
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-3 text-label-sm">
          <span className={`flex items-center gap-1.5 ${step === 1 ? 'font-semibold text-on-surface bg-primary-container/40 px-3 py-1 rounded-full text-on-primary-container' : 'text-on-surface-variant/70'}`}>
            {step === 1 && <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>}
            1. Giỏ hàng
          </span>
          <span className="text-outline/60">—</span>
          <span className={`flex items-center gap-1.5 ${step === 2 ? 'font-semibold text-on-surface bg-primary-container/40 px-3 py-1 rounded-full text-on-primary-container' : 'text-on-surface-variant/70'}`}>
            {step === 2 && <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>}
            2. Giao hàng & Thanh toán
          </span>
          <span className="text-outline/60">—</span>
          <span className={`flex items-center gap-1.5 ${step === 3 ? 'font-semibold text-on-surface bg-primary-container/40 px-3 py-1 rounded-full text-on-primary-container' : 'text-on-surface-variant/70'}`}>
            {step === 3 && <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>}
            3. Xác nhận
          </span>
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
