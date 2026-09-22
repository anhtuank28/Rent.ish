import React from 'react';
import Link from 'next/link';

export interface ProductCardProps {
  id: string | number;
  brand: string;
  title: string;
  sizes: string[];
  material?: string;
  price: number;
  retailPrice: number;
  imageUrl: string;
  badges?: string[];
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
  badges = [],
}: ProductCardProps) {
  const savePercentage = Math.round(((retailPrice - price) / retailPrice) * 100);

  return (
    <article className="group bg-surface-container-lowest rounded-lg p-space-sm shadow-[0_8px_24px_-4px_rgba(36,30,26,0.05)] hover:shadow-[0_16px_36px_-4px_rgba(36,30,26,0.12)] transition-all duration-300 flex flex-col justify-between">
      <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-surface-container-low mb-space-md">
        <Link href={`/dresses/${id}`}>
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </Link>
        
        {/* Badges */}
        {badges.length > 0 && (
          <div className="absolute top-space-sm left-space-sm flex flex-col gap-1">
            {badges.map((badge, idx) => (
              <span
                key={idx}
                className="bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm text-on-surface px-2 py-0.5 rounded-full font-semibold"
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          aria-label="Lưu vào danh sách yêu thích"
          className="absolute top-space-sm right-space-sm w-9 h-9 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-on-surface flex items-center justify-center hover:bg-surface-container-lowest hover:text-primary transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-[1.1em]">favorite</span>
        </button>

        {/* Hover Quick Rent Pill */}
        <div className="absolute inset-x-space-sm bottom-space-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button className="w-full bg-on-secondary-fixed text-surface-container-lowest font-label-md text-label-md py-2 rounded-full shadow-lg hover:bg-primary transition-colors flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-[1.1em]">bolt</span>
            <span>Đặt Nhanh ({sizes.join(', ')})</span>
          </button>
        </div>
      </div>

      {/* Meta details */}
      <div className="space-y-1 px-1 pb-1 flex-grow flex flex-col justify-between">
        <div>
          <div className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold">
            {brand}
          </div>
          <Link href={`/dresses/${id}`}>
            <h2 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors font-semibold truncate line-clamp-1">
              {title}
            </h2>
          </Link>
          <div className="font-body-sm text-body-sm text-outline mt-1">
            Size: {sizes.join(', ')} {material ? `• ${material}` : ''}
          </div>
        </div>
        
        <div className="pt-2 flex items-baseline justify-between mt-auto border-t border-surface-container-high">
          <div>
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
              {price}K
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              {' '}/ 4 ngày
            </span>
          </div>
          <div className="font-label-sm text-label-sm text-emerald-800 bg-emerald-100/70 px-1.5 py-0.5 rounded">
            Tiết kiệm {savePercentage}%
          </div>
        </div>
      </div>
    </article>
  );
}
