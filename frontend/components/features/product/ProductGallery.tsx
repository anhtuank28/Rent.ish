"use client";

import React, { useState } from 'react';
import { WishlistButton } from '../wishlist/WishlistButton';

interface ProductGalleryProps {
  images: string[];
  product?: {
    id: string;
    name: string;
    brand: string;
    price: number;
    retailPrice: number;
    image: string;
    sizes: { size: string; variantId: string }[];
  };
}

export function ProductGallery({ images, product }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0] || '');

  return (
    <div className="flex flex-col gap-space-lg">
      {/* Main Showcase Asset */}
      <div className="relative w-full rounded-xl overflow-hidden bg-surface-container shadow-[0_8px_28px_-6px_rgba(36,30,26,0.06)] group">
        <div className="aspect-[3/4] w-full overflow-hidden relative">
          {mainImage && (
            <img
              src={mainImage}
              alt="Main Product"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}

          {/* Overlay Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            <span className="px-3.5 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm text-on-surface shadow-[0_4px_12px_rgba(36,30,26,0.08)] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Thịnh hành: Thuê 38 lần trong tháng</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-secondary-container/90 backdrop-blur-md font-label-sm text-label-sm text-on-secondary-container w-max">
              Thiết kế Couture
            </span>
          </div>

          {/* Floating Top Right Actions */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            {product && (
              <WishlistButton
                variant="pill"
                item={{
                  id: product.id,
                  title: product.name,
                  brand: product.brand,
                  price: product.price,
                  retailPrice: product.retailPrice,
                  imageUrl: product.image,
                  sizes: product.sizes.map((s) => s.size),
                }}
              />
            )}
            <button
              aria-label="Zoom photo"
              className="w-11 h-11 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface flex items-center justify-center shadow-md hover:bg-surface-container-lowest transition-transform active:scale-95"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">zoom_in</span>
            </button>
          </div>

          {/* Micro bottom watermark pill */}
          <div className="absolute bottom-4 right-4 bg-on-background/70 backdrop-blur-md text-surface font-label-sm text-label-sm px-3 py-1 rounded-full flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            <span>100% Lụa Satin Chống Nhăn</span>
          </div>
        </div>
      </div>

      {/* Thumbnail Carousel Strip */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        {images.map((img, idx) => (
          <button
            key={idx}
            className={`gallery-thumb flex-shrink-0 w-20 sm:w-24 aspect-[3/4] rounded-DEFAULT overflow-hidden p-0.5 shadow-sm transition-all focus:outline-none ${
              mainImage === img 
                ? 'bg-primary-container opacity-100' 
                : 'bg-surface-container-low opacity-75 hover:opacity-100'
            }`}
            onClick={() => setMainImage(img)}
            type="button"
          >
            <img
              src={img}
              alt={`Thumbnail ${idx}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover rounded-DEFAULT"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
