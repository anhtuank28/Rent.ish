import React from 'react';
import Link from 'next/link';

/* ─── Types ─── */

interface FeaturedProduct {
  id: string;
  brand: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  price: number;
  retailPrice: number;
  badge: { label: string; className: string };
  hoverNote: string;
}

/* ─── Static Data Removed (Fetching from API) ─── */

/* ─── Sub-Components ─── */

function FeaturedProductCard({ product }: { product: FeaturedProduct }) {
  return (
    <div className="group bg-surface-container-lowest rounded-lg overflow-hidden shadow-[0_8px_24px_-4px_rgba(36,30,26,0.05)] hover:shadow-[0_16px_36px_-6px_rgba(36,30,26,0.12)] transition-all flex flex-col justify-between">
      {/* Image */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-container">
        <Link href={`/dresses/${product.id}`}>
          <img
            alt={product.imageAlt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            src={product.imageUrl}
          />
        </Link>

        {/* Badge */}
        <span className={`absolute top-3 left-3 font-label-sm text-label-sm px-3 py-1 rounded-full ${product.badge.className}`}>
          {product.badge.label}
        </span>

        {/* Wishlist */}
        <button
          aria-label="Lưu vào danh sách yêu thích"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-primary transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-body-md">favorite</span>
        </button>

        {/* Hover note */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-surface-container-lowest/95 backdrop-blur-md text-on-surface font-label-sm text-label-sm py-1.5 px-space-md rounded-full shadow-sm">
            {product.hoverNote}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-space-md flex flex-col flex-grow justify-between">
        <div>
          <div className="font-label-sm text-label-sm text-tertiary font-semibold uppercase tracking-wider">
            {product.brand}
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5 group-hover:text-primary transition-colors line-clamp-1">
            {product.title}
          </h3>
        </div>
        <div className="mt-space-md pt-space-sm flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                {product.price}K
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">/ 4 ngày</span>
            </div>
            <span className="font-label-sm text-label-sm text-outline line-through">
              Giá gốc {product.retailPrice}K
            </span>
          </div>
          <Link
            href={`/dresses/${product.id}`}
            className="bg-primary-container hover:bg-tertiary-container text-on-primary-fixed font-label-md text-label-md px-space-md py-2 rounded-full transition-colors shadow-sm"
          >
            Thuê Ngay
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */

export async function FeaturedCatalog() {
  let products: FeaturedProduct[] = [];
  try {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    const res = await fetch(`${backendUrl}/api/products?limit=4`, { cache: 'no-store' });
    const json = await res.json();
    if (json.success) {
      products = json.data.map((p: any, index: number) => {
        // Pseudo-random badge logic based on index
        const badges = [
          { label: '🔥 Xu Hướng', className: 'bg-on-secondary-fixed/80 backdrop-blur-sm text-surface-container-lowest' },
          { label: 'Gợi ý từ Staff', className: 'bg-tertiary text-on-tertiary' },
          { label: 'Dạ Hội', className: 'bg-secondary text-on-secondary' },
          { label: 'Dạo Phố Cuối Tuần', className: 'bg-surface-container-highest text-on-surface' },
        ];
        
        return {
          id: p.id,
          brand: 'RENT-ISH EXCLUSIVE',
          title: p.name,
          imageUrl: p.image_url || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
          imageAlt: p.name,
          price: Number(p.rental_price) / 1000, // Convert to K format
          retailPrice: Number(p.retail_price) / 1000,
          badge: badges[index % badges.length],
          hoverNote: 'Sẵn sàng giao ngay',
        };
      });
    }
  } catch (error) {
    console.error("Failed to fetch featured products:", error);
  }

  return (
    <section className="w-full py-space-xl" id="featured-catalog">
      <div className="max-w-7xl mx-auto px-margin sm:px-margin-lg">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-sm">
          <div>
            <span className="font-label-md text-label-md text-primary font-semibold uppercase tracking-widest block mb-1">
              Tuyển Tập Nổi Bật
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
              Xu Hướng Mùa Lễ Hội
            </h2>
          </div>
          <div className="flex items-center gap-space-sm">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Bao gồm chi phí giặt sấy & bảo hiểm chỉnh sửa
            </span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {products.length > 0 ? (
            products.map((product) => (
              <FeaturedProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-on-surface-variant col-span-full">Không có sản phẩm nào.</p>
          )}
        </div>

        {/* CTA */}
        <div className="mt-space-xl text-center">
          <Link
            className="inline-flex items-center gap-space-xs font-label-lg text-label-lg text-on-surface hover:text-primary transition-colors py-space-sm px-space-xl rounded-full bg-surface-container-low hover:bg-surface-container"
            href="/dresses"
          >
            <span>Khám Phá Tất Cả Mẫu Hàng</span>
            <span className="material-symbols-outlined text-body-md">north_east</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
