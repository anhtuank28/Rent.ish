import React from 'react';
import Link from 'next/link';

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Banner */}
      <div className="w-full bg-primary-container text-on-primary-container font-label-sm text-label-sm py-1 px-4 sm:px-12 text-center tracking-wide flex items-center justify-center gap-1">
        <span className="material-symbols-outlined text-[1em]">local_shipping</span>
        <span>Miễn phí size dự phòng cho mọi đơn hàng + Vận chuyển không phát thải</span>
      </div>

      {/* Main Navbar */}
      <div className="h-20 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-12 flex items-center justify-between gap-6">
          
          {/* Logo */}
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/" className="flex items-center gap-4">
              <img
                alt="Rent-ish Logo"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1U4Jw_sQZMV2SGYtxAQRLouJB8-6jBWrV3nPwaIxlTltmAB_yDfAyAKCPzfwf0h03d3gos-n02Vr1hsD4b-yrczw76WnhGkZNSexkn4nZKOr0xFZDc5zqdUp_ZXzAdpBH-iV5sin4gV11QZwtgSG1k7B9yGCVGSkjxSZfHefyplAGRHkfBtATu9WCL2fnNfbp-jab7vFNowbnwfAuw3LTQUxMusSulYj1gEHIcyH6z6YH5q9R0xovqKN-k"
              />
              <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface font-semibold">
                Rent-ish
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-surface-container-low/70 px-1 py-1 rounded-full">
            <Link href="/dresses?sort=new" className="font-label-lg text-label-lg px-4 py-1.5 rounded-full text-on-surface-variant hover:text-on-surface transition-colors">
              Hàng Mới Về
            </Link>
            <Link href="/dresses" className="font-label-lg text-label-lg px-4 py-1.5 rounded-full text-on-surface-variant hover:text-on-surface transition-colors">
              Trang Phục
            </Link>
            <Link href="/occasions" className="font-label-lg text-label-lg px-4 py-1.5 rounded-full text-on-surface-variant hover:text-on-surface transition-colors">
              Sự Kiện
            </Link>
            <Link href="/pass" className="font-label-lg text-label-lg px-4 py-1.5 rounded-full text-on-surface-variant hover:text-on-surface transition-colors">
              Gói Hội Viên
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="hidden xl:flex items-center bg-surface-container-low px-4 py-1.5 rounded-full">
              <span className="material-symbols-outlined text-on-surface-variant text-label-lg mr-2">search</span>
              <input
                className="bg-transparent border-none outline-none font-body-sm text-body-sm text-on-surface placeholder:text-outline w-44"
                placeholder="Tìm kiếm thương hiệu hoặc váy..."
                type="text"
              />
            </div>
            
            <button aria-label="Tìm kiếm" className="xl:hidden p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined">search</span>
            </button>
            
            <Link href="/wishlist" aria-label="Yêu thích" className="relative p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined">favorite</span>
              <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-primary text-on-primary font-label-sm text-[10px] flex items-center justify-center scale-90">3</span>
            </Link>
            
            <Link href="/cart" aria-label="Giỏ hàng" className="relative p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined">shopping_bag</span>
              <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-primary text-on-primary font-label-sm text-[10px] flex items-center justify-center scale-90">2</span>
            </Link>
            
            <div className="h-6 w-px bg-outline-variant hidden sm:block"></div>
            
            <Link href="/profile" className="flex items-center gap-2 group">
              <img
                alt="Hồ sơ"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-container group-hover:ring-primary transition-all"
                src="https://lh3.googleusercontent.com/aida/AEtjO1X0Jr74IOGD9ioWsHhrZhoW78-aRNPj-d9bVe7_5615dwaaM7XeKZXBJ15-GZMv2ftNJip9kkqAixsrR4mQ8hFESexU4mLZwFFik236P66fFIkZHp3gSn0ZC1kV3Gs6PzvaB6W3XB1_e6D_jDRuVtOxVhzM_t4ZL39N0hUGI_15KxYKH1Om7Xuk2aScdpeujOafTiBXPUzR8iNr9ETMIkFJcv75aJiaGO5i4JBMIF6sHl-gjwHc_KwEEp62"
              />
              <span className="material-symbols-outlined text-on-surface-variant text-label-sm hidden sm:inline">expand_more</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
