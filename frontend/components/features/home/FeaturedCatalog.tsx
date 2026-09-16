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

/* ─── Static Data ─── */

const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: 'draped-champagne-silk',
    brand: 'Christopher Esber',
    title: 'Váy Yếm Lụa Màu Champagne Draping',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1VgNxgS3eYPNMVdjka7J7Iaoe_K-0xDW4n0Dab-zd7ajeqnqOtVkqixE6jPdnHqpLKjLXjXUKPgDoiJwzjIHEqS8u_OsGJW5y9OX1Kl-7ScuhcDh0vo1AQ3ScYlSrHbVGUidL5J38Kl22tI7Bf5v-j9GlOLTWuNSxtt-Fw0bRAag_o_-JFI9mLbei0rIQiT6IHAi8gXqkre_qzhMbahLAF4_TaqawTQ5ja27Z61U50INs7Vxcv1RKJpiotj',
    imageAlt: 'Váy yếm lụa xếp nếp màu champagne',
    price: 380,
    retailPrice: 4900,
    badge: { label: '🔥 Xu Hướng', className: 'bg-on-secondary-fixed/80 backdrop-blur-sm text-surface-container-lowest' },
    hoverNote: 'Đã có sẵn size 4 & 6 dự phòng',
  },
  {
    id: 'sunset-cowl-neck-slip',
    brand: 'Cult Gaia',
    title: 'Váy Hai Dây Cổ Đổ Màu Hoàng Hôn',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfy4xoBTjn1K8NG_K5X_QiZ52VK8Gu7Aswrk7AF85A8FIrZiVE7b00KRMamwGTK1jRPNMElHGpWc8Ud76UqCcFliUQMd6AT8NpSVNnwe6KQeoRgFwXVVVDHmH31A9VIOaNRDLHj6NsmgrW5ZMBgiRIIt71JyuANekW7QH0pg8wJKPIiZHWGgMNm7pxJbgGaaVdanzbKE-M8peHpLv74QA21LpKWguDst_OZrTwcpBe50tfhSFHJwG0EA',
    imageAlt: 'Váy hai dây lụa hồng phấn cổ đổ',
    price: 350,
    retailPrice: 3800,
    badge: { label: 'Gợi ý từ Staff', className: 'bg-tertiary text-on-tertiary' },
    hoverNote: 'Hơn 80+ đánh giá 5 sao',
  },
  {
    id: 'eliana-open-back-gown',
    brand: 'Khaite',
    title: 'Đầm Dạ Hội Hở Lưng Eliana',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1UP79VzcKCNvYG_Hb_A3tQD06bg0gN6Y-NEwSZjiQTWwTbr0N5zr-QFx13iocRM9FnFGnbiV19cFZ_NHwNiaP_zyUqFA2kjxwd0pvWLbTcyZ94BYy8wKz1UhyNxV8vlH1WgdjM4f5_cNoL7xmMtgioiqV5upUgQPgUb7H6djM0k1iFb-XD_Bf8QzD-59vIpi0zyPLCFXjbWLObDxt25hLxZYTlVOTqgWnXqnx6bHruRvQD4VYh9AxfaNulc',
    imageAlt: 'Đầm dạ hội lụa dài hở lưng Eliana',
    price: 480,
    retailPrice: 6200,
    badge: { label: 'Dạ Hội', className: 'bg-secondary text-on-secondary' },
    hoverNote: 'Phù hợp nhất cho tiệc Black Tie',
  },
  {
    id: 'sculpted-trench-set',
    brand: 'Zimmermann',
    title: 'Set Váy Trench Coat Thanh Lịch',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1X0Jr74IOGD9ioWsHhrZhoW78-aRNPj-d9bVe7_5615dwaaM7XeKZXBJ15-GZMv2ftNJip9kkqAixsrR4mQ8hFESexU4mLZwFFik236P66fFIkZHp3gSn0ZC1kV3Gs6PzvaB6W3XB1_e6D_jDRuVtOxVhzM_t4ZL39N0hUGI_15KxYKH1Om7Xuk2aScdpeujOafTiBXPUzR8iNr9ETMIkFJcv75aJiaGO5i4JBMIF6sHl-gjwHc_KwEEp62',
    imageAlt: 'Váy trench coat thanh lịch sang trọng',
    price: 420,
    retailPrice: 5500,
    badge: { label: 'Dạo Phố Cuối Tuần', className: 'bg-surface-container-highest text-on-surface' },
    hoverNote: 'Được thuê lại nhiều nhất',
  },
];

/* ─── Sub-Components ─── */

function FeaturedProductCard({ product }: { product: FeaturedProduct }) {
  return (
    <div className="group bg-surface-container-lowest rounded-lg overflow-hidden shadow-[0_8px_24px_-4px_rgba(36,30,26,0.05)] hover:shadow-[0_16px_36px_-6px_rgba(36,30,26,0.12)] transition-all flex flex-col justify-between">
      {/* Image */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-container">
        <Link href={`/dresses/${product.id}`}>
          <img
            alt={product.imageAlt}
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

export function FeaturedCatalog() {
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
          {FEATURED_PRODUCTS.map((product) => (
            <FeaturedProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-space-xl text-center">
          <Link
            className="inline-flex items-center gap-space-xs font-label-lg text-label-lg text-on-surface hover:text-primary transition-colors py-space-sm px-space-xl rounded-full bg-surface-container-low hover:bg-surface-container"
            href="/dresses"
          >
            <span>Khám Phá Hơn 2,400+ Mẫu Đồ Hiệu</span>
            <span className="material-symbols-outlined text-body-md">north_east</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
