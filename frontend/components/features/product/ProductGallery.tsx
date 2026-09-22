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

      {/* Rent-ish In Real Life (RIRL) Mini-Section */}
      <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_8px_24px_-4px_rgba(36,30,26,0.04)] mt-2">
        <div className="flex items-center justify-between mb-space-md">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
              <span>Khách hàng thực tế</span>
              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">RIRL</span>
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Xem ảnh review từ những người đã thuê sản phẩm này
            </p>
          </div>
          <a className="font-label-md text-label-md text-primary font-semibold hover:underline flex items-center gap-1" href="#customer-gallery">
            <span>Xem 42 ảnh</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* We use the same image just as a placeholder for 4 members */}
          {[1, 2, 3, 4].map((member) => (
            <div key={member} className="relative group rounded-DEFAULT overflow-hidden aspect-[4/5] bg-surface-container">
              <img
                src={images[0]}
                alt={`Member ${member}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-transparent to-transparent flex flex-col justify-end p-2.5">
                <span className="font-label-sm text-label-sm text-white font-semibold leading-tight">Camille</span>
                <span className="font-body-sm text-[11px] text-surface-container-high">1m65 • Size S</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
