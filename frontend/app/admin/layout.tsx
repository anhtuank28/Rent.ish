"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/authStore';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isLoading, checkAuth, logout } = useAuthStore();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?redirect=/admin');
    }
  }, [isLoading, isAuthenticated, router]);

  // Loading state or redirecting
  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Authenticated but not ADMIN -> 403 Forbidden
  if (user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-error-container/30 text-error rounded-full flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-[36px]">shield_lock</span>
        </div>
        <h1 className="font-headline-md text-headline-md text-on-surface mb-2 font-semibold">
          Quyền truy cập bị từ chối (403)
        </h1>
        <p className="text-body-md text-on-surface-variant max-w-md mb-6">
          Tài khoản <span className="font-semibold text-on-surface">{user?.email}</span> không có quyền Quản trị viên (ADMIN) để truy cập Bảng điều khiển này.
        </p>
        <div className="flex gap-4">
          <Link
            href="/"
            className="px-6 py-2.5 bg-primary text-on-primary rounded-full font-label-md hover:bg-primary/90 transition-colors shadow-sm"
          >
            Về Trang Chủ
          </Link>
          <button
            onClick={async () => {
              await logout();
              router.push('/login?redirect=/admin');
            }}
            className="px-6 py-2.5 bg-surface-container-high text-on-surface rounded-full font-label-md hover:bg-surface-container-highest transition-colors"
          >
            Đăng nhập tài khoản khác
          </button>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: 'Tổng Quan', href: '/admin', icon: 'dashboard' },
    { label: 'Quản Lý Đơn Thuê', href: '/admin/orders', icon: 'shopping_bag' },
    { label: 'Quản Lý Sản Phẩm', href: '/admin/products', icon: 'checkroom' },
    { label: 'Quản Lý Khách Hàng', href: '/admin/users', icon: 'group' },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-surface-container-lowest">
      {/* Logo & Admin Badge */}
      <div className="p-5 sm:p-6 border-b border-surface-container-low flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Rent-ish" width={110} height={26} style={{ width: 'auto', height: '24px' }} className="h-6 w-auto object-contain" />
        </Link>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 text-[11px] font-semibold tracking-wider rounded-md uppercase">
            ADMIN
          </span>
          {/* Mobile close button */}
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="lg:hidden p-1 rounded-lg text-secondary hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <p className="px-3 py-1.5 text-[11px] font-semibold text-secondary uppercase tracking-wider">
          Menu Quản Trị
        </p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileSidebarOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-label-md transition-all duration-150 ${
                isActive
                  ? 'bg-primary text-on-primary shadow-sm font-semibold'
                  : 'text-secondary hover:text-on-surface hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="pt-4 border-t border-surface-container-low mt-4">
          <p className="px-3 py-1.5 text-[11px] font-semibold text-secondary uppercase tracking-wider">
            Khách Hàng
          </p>
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-secondary hover:text-on-surface hover:bg-surface-container-low font-label-md transition-all duration-150"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px]">storefront</span>
              <span>Xem Website</span>
            </div>
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </Link>
        </div>
      </nav>

      {/* Admin Profile & Logout */}
      <div className="p-4 border-t border-surface-container-low bg-surface-container-low/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0">
              {user?.fullName?.charAt(0) || 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-label-sm font-semibold text-on-surface truncate">{user?.fullName || 'Admin'}</p>
              <p className="text-[11px] text-secondary truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={async () => {
              await logout();
              router.push('/login');
            }}
            title="Đăng xuất"
            className="p-1.5 text-secondary hover:text-error hover:bg-error-container/20 rounded-lg transition-colors shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex w-64 border-r border-surface-container-low flex-col fixed inset-y-0 left-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-out Drawer */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-[80%] max-w-xs shadow-2xl z-10 animate-in slide-in-from-left duration-300">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-surface-container-lowest/80 backdrop-blur-md border-b border-surface-container-low sticky top-0 z-20 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-body-sm text-secondary">
            {/* Hamburger button for mobile */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-secondary hover:text-on-surface hover:bg-surface-container-low transition-colors mr-1 cursor-pointer"
              aria-label="Mở menu quản trị"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
            <span>Admin</span>
            <span>/</span>
            <span className="text-on-surface font-medium capitalize">
              {pathname === '/admin' ? 'Tổng quan' : pathname.replace('/admin/', '')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-xs font-medium border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="hidden sm:inline">Hệ thống Hoạt động</span>
              <span className="sm:hidden">Online</span>
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-surface min-w-0 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
