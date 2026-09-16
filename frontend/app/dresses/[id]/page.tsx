import React from 'react';
import Link from 'next/link';
import { ProductGallery } from '@/components/features/product/ProductGallery';
import { BookingEngine } from '@/components/features/product/BookingEngine';
import { ProductTabs } from '@/components/features/product/ProductTabs';
import { CompleteTheLook } from '@/components/features/product/CompleteTheLook';
import { CustomerReviews } from '@/components/features/product/CustomerReviews';

// Mock data to match seed data later
const MOCK_PRODUCT = {
  id: 'd1',
  name: 'Đầm Dạ Hội Hở Lưng Eliana Xẻ Đùi',
  brand: 'AURA STUDIO',
  price: 42,
  retailPrice: 280,
  images: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBC2bJXYmJ22u37qN0Wb2aWqJk_2rQ1XF8fN2-1bN5eP34yY12Z83b5pXm0m-0J6K7-PZ4O6M3w5m0T-xM4lT9_a9z2e7bY3vF7dY8T2N1K8O3G4J7Z1wT9m3n8Y4jH9fQ7F4lP2_3-5z3j8h9d0X3T9xM2R1K3X5dZ9F2vL4jP6T9wZ4fD1w8B7G5cZ1M2X3', // Main
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB3Z9x8X2K4N5e0c5D3wG7aP8hQ0C2fU4L5J1X2n1aL3jP8kG5V8X7tP9jK6L3zK9zC8zH3o9cW5rM7fW6lP4dK7tG5aK1wZ7xQ5nB9xP3R8Z4jL6hP9bJ1dZ8K7N2cQ5sL4tQ8fW1wQ0V9Y7wF2hH6fT3vL9kG5bQ1sW8yD7jK9vB4wQ2fC9xX2yH3aK9V4bT9',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC1kG5jH9cW4kG9fT7nZ4xK2V1bL5fQ9cR8jG6fH4hG6dZ9rB5wK8xK3hD5kG2bQ7bQ2xQ4vK9tV9kG1nH3nL7cW8hH9zK6xZ5jD3cQ9cQ2vB3xF8tQ7zK9gG4bJ6wR2wZ6wK8wQ5gG9gB2tZ1nD4kT5kQ1tD4bZ7cH8yZ3yG7wH1jH9fV2kV2gQ8yT5xF1wJ7',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAwG9fN8yX2wK5cG4hK9tP5hX2vL6vB9cZ7wH3xR8zD4jV7rD3jX8kZ9cF3vB4vK2dC5tN8nG9cG4vF5gX9nC3xF1sL9mR6vT4gH7bC2gQ8xV3hG4dC1xZ5fP9xQ5nC1xH7zB3vF8dH1dZ5fP9xF4xF3hG9gV2tL7sB4yC3vG7hN1wB8hZ6cV9rB4dC9fQ7kF1'
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL']
};

export default function ProductDetailPage() {
  return (
    <main className="min-h-screen bg-background pt-20 pb-24 lg:pb-0">
      
      {/* Utility Bar & Breadcrumbs */}
      <div className="w-full bg-surface-container-lowest border-b border-surface-container-low hidden md:block">
        <div className="max-w-7xl mx-auto px-margin-sm md:px-margin lg:px-margin-lg h-12 flex items-center justify-between">
          <nav aria-label="Breadcrumb" className="flex items-center text-[12px] font-label-sm text-on-surface-variant font-medium">
            <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <span className="material-symbols-outlined text-[16px] mx-1">chevron_right</span>
            <Link href="/dresses" className="hover:text-primary transition-colors">Đầm</Link>
            <span className="material-symbols-outlined text-[16px] mx-1">chevron_right</span>
            <Link href="/dresses?category=evening" className="hover:text-primary transition-colors">Dạ hội</Link>
            <span className="material-symbols-outlined text-[16px] mx-1">chevron_right</span>
            <span className="text-on-surface font-semibold">{MOCK_PRODUCT.name}</span>
          </nav>
          
          <div className="flex items-center gap-4 text-[12px] font-label-sm text-on-surface font-semibold">
            <span className="flex items-center gap-1.5 text-primary">
              <span className="material-symbols-outlined text-[16px]">local_shipping</span>
              Giao hàng nhanh nội thành 2H
            </span>
            <span className="w-px h-4 bg-surface-container-high" />
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">support_agent</span>
              Hỗ trợ Stylist 24/7
            </span>
          </div>
        </div>
      </div>

      {/* Main Hero Layout (Split Gallery + Booking Card) */}
      <section className="w-full max-w-7xl mx-auto px-margin-sm md:px-margin lg:px-margin-lg py-space-lg lg:py-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-gutter-lg items-start">
          
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery images={MOCK_PRODUCT.images} />
          </div>

          {/* Right Column: Booking Engine (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 mt-space-md lg:mt-0">
            <BookingEngine 
              price={MOCK_PRODUCT.price} 
              retailPrice={MOCK_PRODUCT.retailPrice} 
              sizes={MOCK_PRODUCT.sizes}
            />
          </div>

        </div>
      </section>

      <ProductTabs />
      <CompleteTheLook />
      <CustomerReviews />

      {/* Mobile Sticky Add to Cart (Visible only on small screens) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_-8px_24px_rgba(36,30,26,0.12)] z-40 flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
              {MOCK_PRODUCT.price}K
            </span>
            <span className="font-body-sm text-[12px] text-on-surface-variant">
              / 4 ngày
            </span>
          </div>
          <span className="font-label-sm text-[11px] text-primary font-medium">
            Kèm 1 size miễn phí
          </span>
        </div>
        <button
          className="flex-1 max-w-[220px] h-11 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md font-bold shadow-md hover:bg-tertiary-container transition-colors flex items-center justify-center gap-1.5"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">calendar_today</span>
          <span>Chọn ngày thuê</span>
        </button>
      </div>

    </main>
  );
}
