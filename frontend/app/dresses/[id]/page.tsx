import React from 'react';
import Link from 'next/link';
import { ProductGallery } from '@/components/features/product/ProductGallery';
import { BookingEngine } from '@/components/features/product/BookingEngine';
import { ProductTabs } from '@/components/features/product/ProductTabs';
import { CompleteTheLook } from '@/components/features/product/CompleteTheLook';
import { CustomerReviews } from '@/components/features/product/CustomerReviews';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let product: any = null;

  try {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    const res = await fetch(`${backendUrl}/api/products/${id}`, { cache: 'no-store' });
    const json = await res.json();
    if (json.success) {
      const p = json.data;
      const sizes = p.variants ? p.variants.map((v: any) => ({ size: v.size, variantId: v.id })) : [];
      
      const fallbackImages = [
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
        'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800',
        'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800',
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800'
      ];
      
      product = {
        id: p.id,
        name: p.name,
        brand: 'RENT-ISH EXCLUSIVE',
        price: Number(p.rental_price) / 1000,
        retailPrice: Number(p.retail_price) / 1000,
        images: p.image_url ? [p.image_url, ...fallbackImages.slice(0, 3)] : fallbackImages,
        image: p.image_url || fallbackImages[0],
        sizes: sizes.length > 0 ? sizes : [{ size: 'S', variantId: '' }, { size: 'M', variantId: '' }],
      };
    }
  } catch (err) {
    console.error("Failed to fetch product:", err);
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4">Sản phẩm không tồn tại</h1>
          <Link href="/dresses" className="text-primary hover:underline">Quay lại danh sách</Link>
        </div>
      </main>
    );
  }

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
            <span className="text-on-surface font-semibold">{product.name}</span>
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
            <ProductGallery images={product.images} product={product} />
          </div>

          {/* Right Column: Booking Engine (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 mt-space-md lg:mt-0">
            <BookingEngine product={product} />
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
              {product.price}K
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
