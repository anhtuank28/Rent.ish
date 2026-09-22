"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export default function WishlistPage() {
  const [wishlistItems] = useState<any[]>([]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-28 pb-space-xl">
        <div className="max-w-7xl mx-auto px-margin sm:px-margin-lg">
          
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-surface-container">
            <div>
              <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs font-label-sm text-on-surface-variant mb-2">
                <Link href="/" className="hover:text-on-surface transition-colors">Trang chủ</Link>
                <span>/</span>
                <span className="text-on-surface font-semibold">Danh sách yêu thích</span>
              </nav>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface tracking-tight">
                Danh Sách Yêu Thích Của Bạn
              </h1>
            </div>
            
            <div className="hidden sm:flex items-center gap-2 font-label-md text-sm text-on-surface-variant bg-surface-container-low px-4 py-2 rounded-full">
              <span className="material-symbols-outlined text-primary text-[18px]">favorite</span>
              <span>{wishlistItems.length} sản phẩm đã lưu</span>
            </div>
          </div>

          {/* Empty State */}
          {wishlistItems.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-3xl p-12 text-center max-w-xl mx-auto shadow-sm border border-surface-container space-y-4 my-12">
              <div className="w-16 h-16 rounded-full bg-primary-container/40 text-primary flex items-center justify-center mx-auto mb-2">
                <span className="material-symbols-outlined text-3xl">favorite_border</span>
              </div>
              <h2 className="font-headline-md text-xl font-bold text-on-surface">
                Chưa có trang phục nào trong danh sách
              </h2>
              <p className="font-body-sm text-sm text-on-surface-variant">
                Lưu lại những bộ váy, áo dài hoặc set đồ bạn yêu thích bằng cách bấm vào biểu tượng trái tim để thuê khi có dịp đặc biệt.
              </p>
              <div className="pt-2">
                <Link
                  href="/dresses"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-on-primary font-label-md text-sm font-bold shadow-md hover:bg-tertiary transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">explore</span>
                  <span>Khám phá bộ sưu tập</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {/* If items exist */}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
