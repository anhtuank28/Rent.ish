"use client";

import React from 'react';
import Link from 'next/link';
import { WishlistButton } from './wishlist/WishlistButton';

export interface ProductCardProps {
  id: string | number;
  brand: string;
  title: string;
  sizes: string[];
  material?: string;
  price: number;
  retailPrice: number;
  imageUrl: string;
  images?: string[];
  badges?: string[];
  isOutOfStock?: boolean;
  availableSizes?: string[];
}

export function ProductCard({
  id,
  brand,
  title,
  sizes,
  material,
  price,
  retailPrice,
  imageUrl,
  images = [],
  badges = [],
  isOutOfStock = false,
  availableSizes,
}: ProductCardProps) {
  const savePercentage = Math.round(((retailPrice - price) / retailPrice) * 100);

  const displayPrimary = images && images.length > 0 ? images[0] : imageUrl;
  const secondaryImg = images && images.length > 1 ? images[1] : null;

  return (
    <article className={`group bg-surface-container-lowest rounded-xl p-2 sm:p-3 shadow-[0_4px_16px_-4px_rgba(36,30,26,0.05)] hover:shadow-[0_16px_36px_-4px_rgba(36,30,26,0.12)] transition-all duration-300 flex flex-col justify-between ${
      isOutOfStock ? 'opacity-90' : ''
    }`}>
      <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-surface-container-low mb-2 sm:mb-3">
        <Link href={`/dresses/${id}`} className="block w-full h-full relative overflow-hidden">
          <img
            src={displayPrimary}
            alt={title}
            loading="lazy"
            decoding="async"
            className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-out ${
              secondaryImg ? 'group-hover:opacity-0' : ''
            } ${isOutOfStock ? 'grayscale-[35%] contrast-[0.9]' : ''}`}
          />
          {secondaryImg && (
            <img
              src={secondaryImg}
              alt={`${title} - Góc chụp phụ`}
              loading="lazy"
              decoding="async"
              className={`w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out ${
                isOutOfStock ? 'grayscale-[35%] contrast-[0.9]' : ''
              }`}
            />
          )}
        </Link>
        
        {/* Multi-image count indicator */}
        {images && images.length > 1 && (
          <div className="absolute bottom-2 right-2 z-10 opacity-70 group-hover:opacity-100 transition-opacity">
            <span className="bg-black/60 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <span className="material-symbols-outlined text-[11px] sm:text-[12px]">photo_library</span>
              <span>{images.length}</span>
            </span>
          </div>
        )}
        
        {/* Out of Stock Badge / Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {isOutOfStock ? (
            <span className="bg-rose-600/95 backdrop-blur-md text-white font-label-sm text-[10px] sm:text-[11px] px-2 py-0.5 sm:py-1 rounded-full font-bold shadow-md flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">event_busy</span>
              <span className="hidden sm:inline">ĐÃ KÍN LỊCH</span>
              <span className="sm:hidden">HẾT LỊCH</span>
            </span>
          ) : (
            badges.slice(0, 1).map((badge, idx) => (
              <span
                key={idx}
                className="bg-surface-container-lowest/90 backdrop-blur-md text-[10px] sm:text-xs text-on-surface px-1.5 sm:px-2 py-0.5 rounded-full font-semibold"
              >
                {badge}
              </span>
            ))
          )}
        </div>

        {/* Wishlist Button */}
        <div className="absolute top-2 right-2 z-10">
          <WishlistButton
            item={{
              id,
              title,
              brand,
              price,
              retailPrice,
              imageUrl,
              sizes,
              material,
            }}
          />
        </div>

        {/* Hover Quick Rent Pill (Desktop only) */}
        <div className="hidden sm:block absolute inset-x-space-sm bottom-space-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          {isOutOfStock ? (
            <Link
              href={`/dresses/${id}`}
              className="w-full bg-surface-container-high/90 text-on-surface-variant font-label-md text-label-md py-2 rounded-full shadow-md flex items-center justify-center gap-1 backdrop-blur-sm hover:bg-surface-container-highest transition-colors"
            >
              <span className="material-symbols-outlined text-[1.1em]">calendar_today</span>
              <span>Xem Lịch Trống</span>
            </Link>
          ) : (
            <Link
              href={`/dresses/${id}`}
              className="w-full bg-on-secondary-fixed text-surface-container-lowest font-label-md text-label-md py-2 rounded-full shadow-lg hover:bg-primary transition-colors flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-[1.1em]">bolt</span>
              <span>Đặt Nhanh ({sizes.join(', ')})</span>
            </Link>
          )}
        </div>
      </div>

      {/* Meta details */}
      <div className="space-y-0.5 sm:space-y-1 px-0.5 sm:px-1 pb-1 flex-grow flex flex-col justify-between">
        <div>
          <div className="text-[10px] sm:text-xs text-primary uppercase tracking-wider font-bold truncate">
            {brand}
          </div>
          <Link href={`/dresses/${id}`}>
            <h2 className="text-xs sm:text-sm font-semibold text-on-surface group-hover:text-primary transition-colors truncate mt-0.5">
              {title}
            </h2>
          </Link>
          <div className="text-[11px] sm:text-xs text-outline mt-0.5 truncate">
            Size: {sizes.join(', ')} {material ? `• ${material}` : ''}
          </div>
        </div>
        
        <div className="pt-1.5 sm:pt-2 flex items-baseline justify-between mt-auto border-t border-surface-container-high">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs sm:text-sm font-bold text-on-surface">
                {(price >= 10000 ? price : price * 1000).toLocaleString('vi-VN')}đ
              </span>
              <span className="text-[10px] sm:text-xs text-on-surface-variant">
                / 4n
              </span>
            </div>
            <span className="block text-[10px] sm:text-[11px] text-outline line-through">
              {(retailPrice >= 10000 ? retailPrice : retailPrice * 1000).toLocaleString('vi-VN')}đ
            </span>
          </div>
          <div className="text-[10px] sm:text-[11px] text-emerald-800 bg-emerald-100/80 px-1.5 sm:px-2 py-0.5 rounded-full font-semibold shrink-0">
            -{savePercentage}%
          </div>
        </div>
      </div>
    </article>
  );
}
