import React from 'react';
import Link from 'next/link';

export function CartFooter() {
  return (
    <footer className="w-full bg-surface-container-low shadow-[0_-1px_12px_rgba(36,30,26,0.03)] mt-auto">
      <div className="max-w-7xl mx-auto px-gutter-sm lg:px-margin py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-label-sm text-on-surface-variant">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[16px]">lock</span>
          <span>Thanh toán bảo mật chuẩn 256-Bit SSL & PCI DSS</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" className="hover:text-on-surface transition-colors">Thỏa thuận thuê</Link>
          <Link href="#" className="hover:text-on-surface transition-colors">Câu hỏi thường gặp</Link>
          <span className="text-outline">•</span>
          <span>© 2026 Rent-ish Ltd.</span>
        </div>
      </div>
    </footer>
  );
}
