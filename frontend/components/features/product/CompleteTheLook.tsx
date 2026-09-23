import React from 'react';
import Link from 'next/link';

interface SuggestedProduct {
  id: string;
  name: string;
  rental_price: number | string;
  retail_price: number | string;
  image_url: string;
  images?: string[];
}

export async function CompleteTheLook({ currentId }: { currentId?: string }) {
  let products: SuggestedProduct[] = [];
  try {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    const res = await fetch(`${backendUrl}/api/products?limit=8`, { cache: 'no-store' });
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      products = json.data.filter((p: any) => p.id !== currentId).slice(0, 4);
    }
  } catch (error) {
    console.error("Failed to fetch suggested products:", error);
  }

  if (products.length === 0) return null;

  return (
    <section className="w-full max-w-7xl mx-auto px-margin-sm md:px-margin lg:px-margin-lg py-space-xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-space-lg gap-2">
        <div>
          <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-semibold">
            Gợi Ý Cùng Phong Cách
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Có Thể Bạn Cũng Thích
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Các mẫu đầm dạ hội và trang phục cao cấp khác đang có sẵn trong kho
          </p>
        </div>
        <Link
          href="/dresses"
          className="text-primary font-label-md font-semibold hover:underline flex items-center gap-1"
        >
          <span>Xem tất cả</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {products.map((item) => {
          const img = (item.images && item.images.length > 0) ? item.images[0] : (item.image_url || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800');
          const rentalPriceNum = Number(item.rental_price);
          const retailPriceNum = Number(item.retail_price);

          return (
            <Link
              key={item.id}
              href={`/dresses/${item.id}`}
              className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_8px_24px_-4px_rgba(36,30,26,0.05)] hover:shadow-[0_16px_36px_-4px_rgba(36,30,26,0.12)] transition-all duration-300 group flex flex-col justify-between p-space-md border border-surface-container-low"
            >
              <div className="aspect-[3/4] rounded-DEFAULT overflow-hidden bg-surface-container relative mb-space-md">
                <img
                  src={img}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 px-2.5 py-1 bg-surface-container-lowest/90 backdrop-blur-sm rounded-full font-label-sm text-[11px] font-semibold text-on-surface">
                  RENT-ISH EXCLUSIVE
                </span>
              </div>
              <div className="space-y-1">
                <h4 className="font-headline-sm text-[15px] leading-snug text-on-surface font-semibold truncate group-hover:text-primary transition-colors">
                  {item.name}
                </h4>
                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="font-label-lg text-label-lg font-bold text-on-surface">
                      {rentalPriceNum.toLocaleString('vi-VN')}đ
                    </span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant"> / 4 ngày</span>
                  </div>
                  <span className="font-body-sm text-[11px] text-outline line-through">
                    Gốc {retailPriceNum.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>
              <div className="mt-3 w-full py-2 rounded-full bg-surface-container-low group-hover:bg-primary-container group-hover:text-on-primary-container text-on-surface font-label-sm text-label-sm font-semibold transition-colors flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                <span>Xem Chi Tiết</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
