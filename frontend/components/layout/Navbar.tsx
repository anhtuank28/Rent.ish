"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';

export function Navbar() {
  const { user, isAuthenticated, isLoading, checkAuth, logout } = useAuthStore();
  const { items } = useCartStore();
  const { items: wishlistItems, isHydrated: isWishlistHydrated } = useWishlistStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Calculate total items in cart and wishlist
  const cartItemCount = items.length;
  const wishlistItemCount = isWishlistHydrated ? wishlistItems.length : 0;

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
              <Image
                src="/logo.png"
                alt="Rent-ish Logo"
                width={142}
                height={32}
                className="h-8 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Navigation Links */}
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
              {wishlistItemCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-rose-500 text-white font-label-sm text-[10px] flex items-center justify-center scale-90 animate-in zoom-in duration-200">
                  {wishlistItemCount}
                </span>
              )}
            </Link>
            
            <Link href="/cart" aria-label="Giỏ hàng" className="relative p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined">shopping_bag</span>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-primary text-on-primary font-label-sm text-[10px] flex items-center justify-center scale-90">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            <div className="h-6 w-px bg-outline-variant hidden sm:block"></div>
            
            {/* Auth State */}
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-surface-container animate-pulse"></div>
            ) : isAuthenticated && user ? (
              <div className="relative">
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
                  <div className="absolute right-0 mt-2 w-48 bg-surface-container-lowest rounded-xl shadow-[0_8px_24px_-4px_rgba(36,30,26,0.12)] border border-surface-container-low overflow-hidden py-2">
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
                      className="w-full flex items-center gap-2 px-4 py-2 text-error hover:bg-error-container/30 transition-colors font-label-md text-label-md"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link 
                  href="/login" 
                  className="hidden sm:flex font-label-md text-label-md text-on-surface-variant hover:text-primary px-3 py-1.5 transition-colors"
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
          </div>
        </div>
      </div>
    </header>
  );
}
