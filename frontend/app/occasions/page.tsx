"use client";

import React from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

const OCCASIONS = [
  {
    id: 'wedding',
    title: 'Khách Mời Tiệc Cưới',
    subtitle: 'Thanh lịch, duyên dáng và không lấn át nhân vật chính',
    searchQuery: 'Cưới',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    tag: 'Được Thuê Nhiều Nhất'
  },
  {
    id: 'black-tie',
    title: 'Dạ Hội Black Tie & Gala',
    subtitle: 'Đầm dạ hội sang trọng, quyến rũ cho những đêm tiệc đẳng cấp',
    searchQuery: 'Dạ Hội',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800',
    tag: 'Sang Trọng'
  },
  {
    id: 'cocktail',
    title: 'Tiệc Cocktail & Khai Trương',
    subtitle: 'Thiết kế hiện đại, thoải mái di chuyển và giao lưu',
    searchQuery: 'Váy',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800',
    tag: 'Xu Hướng'
  },
  {
    id: 'traditional',
    title: 'Lễ Tết & Truyền Thống',
    subtitle: 'Áo dài lụa tơ tằm thêu tay tinh tế, gìn giữ nét đẹp văn hóa',
    searchQuery: 'Áo Dài',
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800',
    tag: 'Văn Hóa'
  },
  {
    id: 'resort',
    title: 'Du Lịch & Resort',
    subtitle: 'Đầm maxi bay bổng, chất liệu thoáng mát cho kỳ nghỉ hoàn hảo',
    searchQuery: 'Măng Tô',
    image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=800',
    tag: 'Nghỉ Dưỡng'
  },
  {
    id: 'gentleman',
    title: 'Quý Ông & Suit Lịch Lãm',
    subtitle: 'Bộ suit Ý cao cấp chuẩn phong cách Gentleman cho sự kiện lớn',
    searchQuery: 'Suit',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800',
    tag: 'Gentleman'
  }
];

export default function OccasionsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-28 pb-space-xl">
        <div className="max-w-7xl mx-auto px-margin sm:px-margin-lg">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-space-xl space-y-3">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
              Tuyển Chọn Theo Dịp
            </span>
            <h1 className="font-display text-display tracking-tight text-on-surface font-semibold">
              Trang Phục Cho Mọi Sự Kiện
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Dù là một đêm dạ hội trang trọng, tiệc cưới thân mật hay kỳ nghỉ cuối tuần, Rent-ish luôn có trang phục hoàn hảo dành riêng cho bạn.
            </p>
          </div>

          {/* Occasions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-lg">
            {OCCASIONS.map((occ) => (
              <Link
                key={occ.id}
                href={`/dresses?search=${encodeURIComponent(occ.searchQuery)}`}
                className="group relative rounded-2xl overflow-hidden shadow-[0_8px_24px_-4px_rgba(36,30,26,0.08)] hover:shadow-[0_16px_36px_-4px_rgba(36,30,26,0.16)] transition-all duration-300 flex flex-col bg-surface-container-lowest"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container-low">
                  <img
                    src={occ.image}
                    alt={occ.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <span className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 rounded-full font-label-sm text-label-sm font-semibold text-on-surface">
                    {occ.tag}
                  </span>
                </div>
                
                <div className="p-space-md flex flex-col justify-between flex-1">
                  <div>
                    <h2 className="font-headline-md text-headline-md font-semibold text-on-surface group-hover:text-primary transition-colors">
                      {occ.title}
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      {occ.subtitle}
                    </p>
                  </div>
                  
                  <div className="pt-4 flex items-center justify-between font-label-md text-label-md text-primary font-semibold">
                    <span>Khám phá bộ sưu tập</span>
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
