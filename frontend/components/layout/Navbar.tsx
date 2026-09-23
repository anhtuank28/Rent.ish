"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';

export function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, checkAuth, logout } = useAuthStore();
  const { items } = useCartStore();
  const { items: wishlistItems, isHydrated: isWishlistHydrated } = useWishlistStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState('');

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleMobileSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileSearch.trim()) {
      setIsMobileMenuOpen(false);
      router.push(`/dresses?search=${encodeURIComponent(mobileSearch.trim())}`);
    }
  };

  // Calculate total items in cart and wishlist
  const cartItemCount = items.length;
  const wishlistItemCount = isWishlistHydrated ? wishlistItems.length : 0;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Banner */}
      <div className="w-full bg-primary-container text-on-primary-container font-label-sm text-label-sm py-1 px-4 sm:px-12 text-center tracking-wide flex items-center justify-center gap-1">
        <span className="material-symbols-outlined text-[1em]">local_shipping</span>
        <span className="text-xs sm:text-sm">Miễn phí size dự phòng cho mọi đơn hàng + Vận chuyển không phát thải</span>
      </div>

      {/* Main Navbar */}
      <div className="h-20 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container-low/60">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/" className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="Rent-ish Logo"
                width={142}
                height={32}
                priority
                style={{ width: 'auto', height: '32px' }}
                className="h-8 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-surface-container-low/70 px-1 py-1 rounded-full">
            <Link href="/how-it-works" className="font-label-lg text-label-lg px-4 py-1.5 rounded-full text-on-surface-variant hover:text-on-surface transition-colors">
              Quy Trình Thuê
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
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Desktop Search */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const q = (e.currentTarget.elements.namedItem('search') as HTMLInputElement)?.value;
                if (q?.trim()) router.push(`/dresses?search=${encodeURIComponent(q.trim())}`);
              }}
              className="hidden xl:flex items-center bg-surface-container-low px-4 py-1.5 rounded-full"
            >
              <span className="material-symbols-outlined text-on-surface-variant text-label-lg mr-2">search</span>
              <input
                name="search"
                className="bg-transparent border-none outline-none font-body-sm text-body-sm text-on-surface placeholder:text-outline w-44"
                placeholder="Tìm kiếm thương hiệu hoặc váy..."
                type="text"
              />
            </form>
            
            {/* Wishlist Icon */}
            <Link href="/wishlist" aria-label="Yêu thích" className="relative p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[22px]">favorite</span>
              {wishlistItemCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-rose-500 text-white font-label-sm text-[10px] flex items-center justify-center scale-90 animate-in zoom-in duration-200">
                  {wishlistItemCount}
                </span>
              )}
            </Link>
            
            {/* Cart Icon */}
            <Link href="/cart" aria-label="Giỏ hàng" className="relative p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-primary text-on-primary font-label-sm text-[10px] flex items-center justify-center scale-90">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            <div className="h-6 w-px bg-outline-variant hidden sm:block"></div>
            
            {/* Desktop Auth State */}
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-surface-container animate-pulse"></div>
            ) : isAuthenticated && user ? (
              <div className="relative hidden sm:block">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 group"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm ring-2 ring-transparent group-hover:ring-primary transition-all">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-label-sm hidden sm:inline">expand_more</span>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface-container-lowest rounded-xl shadow-[0_8px_24px_-4px_rgba(36,30,26,0.12)] border border-surface-container-low overflow-hidden py-2 z-50">
                    <div className="px-4 py-2 border-b border-surface-container-low mb-1">
                      <p className="font-label-md font-semibold text-on-surface truncate">{user.fullName}</p>
                      <p className="font-body-sm text-[11px] text-on-surface-variant truncate">{user.email}</p>
                    </div>
                    <Link 
                      href="/orders" 
                      className="flex items-center gap-2 px-4 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors font-label-md text-label-md"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                      Đơn hàng của tôi
                    </Link>
                    {user.role === 'ADMIN' && (
                      <Link 
                        href="/admin" 
                        className="flex items-center gap-2 px-4 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors font-label-md text-label-md"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                        Trang quản trị
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-error hover:bg-error-container/30 transition-colors font-label-md text-label-md text-left"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link 
                  href="/login" 
                  className="font-label-md text-label-md text-on-surface-variant hover:text-primary px-3 py-1.5 transition-colors"
                >
                  Đăng nhập
                </Link>
                <Link 
                  href="/register" 
                  className="font-label-md text-label-md bg-primary-container text-on-primary-container hover:bg-tertiary-container hover:text-on-tertiary-container px-4 py-2 rounded-full transition-colors"
                >
                  Đăng ký
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-on-surface hover:bg-surface-container-low transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Mở menu điều hướng di động"
            >
              <span className="material-symbols-outlined text-[26px]">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Mobile Slide-out Drawer Menu ─── */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-surface-container-lowest shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-surface-container">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image
                    src="/logo.png"
                    alt="Rent-ish Logo"
                    width={130}
                    height={28}
                    style={{ width: 'auto', height: '28px' }}
                    className="h-7 w-auto object-contain"
                  />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors"
                  aria-label="Đóng menu"
                >
                  <span className="material-symbols-outlined text-[22px]">close</span>
                </button>
              </div>

              {/* Mobile Search Box */}
              <form onSubmit={handleMobileSearchSubmit} className="mt-4 mb-6">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                    search
                  </span>
                  <input
                    type="text"
                    value={mobileSearch}
                    onChange={(e) => setMobileSearch(e.target.value)}
                    placeholder="Tìm kiếm mẫu váy, áo dài..."
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low rounded-xl text-sm font-label-md text-on-surface placeholder:text-outline outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </form>

              {/* Navigation Links */}
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-outline uppercase tracking-wider px-3 mb-2">
                  Khám phá danh mục
                </p>
                <Link
                  href="/how-it-works"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-label-md text-on-surface hover:bg-surface-container-low transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px] text-primary">stylus_note</span>
                  <span>Quy Trình Thuê</span>
                </Link>
                <Link
                  href="/dresses"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-label-md text-on-surface hover:bg-surface-container-low transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px] text-primary">apparel</span>
                  <span>Trang Phục Tuyển Chọn</span>
                </Link>
                <Link
                  href="/occasions"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-label-md text-on-surface hover:bg-surface-container-low transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px] text-primary">celebration</span>
                  <span>Sự Kiện & Dạ Tiệc</span>
                </Link>
                <Link
                  href="/pass"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-label-md text-on-surface hover:bg-surface-container-low transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px] text-primary">card_membership</span>
                  <span>Gói Hội Viên Rent-ish Pass</span>
                </Link>
              </div>

              {/* User Account / Orders Links */}
              <div className="mt-6 pt-4 border-t border-surface-container space-y-1">
                <p className="text-[11px] font-bold text-outline uppercase tracking-wider px-3 mb-2">
                  Tài khoản của bạn
                </p>
                {isAuthenticated && user ? (
                  <>
                    <div className="px-3 py-2 bg-surface-container-low rounded-xl mb-2">
                      <p className="font-semibold text-sm text-on-surface truncate">{user.fullName}</p>
                      <p className="text-xs text-on-surface-variant truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/orders"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-label-md text-on-surface hover:bg-surface-container-low transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px] text-primary">receipt_long</span>
                      <span>Đơn hàng của tôi</span>
                    </Link>
                    {user.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-label-md text-on-surface hover:bg-surface-container-low transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px] text-primary">admin_panel_settings</span>
                        <span>Trang Quản Trị Shop</span>
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-label-md text-error hover:bg-error-container/20 transition-colors text-left"
                    >
                      <span className="material-symbols-outlined text-[20px]">logout</span>
                      <span>Đăng xuất</span>
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center py-2.5 px-3 rounded-xl border border-surface-container font-label-md text-sm text-on-surface hover:bg-surface-container-low text-center font-medium"
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center py-2.5 px-3 rounded-xl bg-primary-container text-on-primary-container font-label-md text-sm font-semibold hover:bg-tertiary-container text-center shadow-sm"
                    >
                      Đăng ký
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Drawer Footer Guarantees */}
            <div className="pt-6 border-t border-surface-container">
              <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
                <span className="material-symbols-outlined text-primary text-[16px]">verified</span>
                <span>Miễn phí 1 size dự phòng</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium mt-2">
                <span className="material-symbols-outlined text-emerald-600 text-[16px]">dry_cleaning</span>
                <span>Đã giặt ủi và tiệt trùng chuẩn quốc tế</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
