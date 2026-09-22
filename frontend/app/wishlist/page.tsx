"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { useWishlistStore, WishlistItem } from '../../store/wishlistStore';
import { ProductCard } from '../../components/features/ProductCard';

export default function WishlistPage() {
  const { items, isHydrated, removeItem, clearWishlist } = useWishlistStore();
  const [showClearModal, setShowClearModal] = useState(false);
  const [trendingProducts, setTrendingProducts] = useState<any[]>([]);
  const [isLoadingTrending, setIsLoadingTrending] = useState(false);

  // Fetch trending products to display suggestions when wishlist is empty or as recommendations
  useEffect(() => {
    async function loadTrending() {
      setIsLoadingTrending(true);
      try {
        const res = await fetch('/api/products?limit=4');
        const json = await res.json();
        if (json.success && json.data) {
          const fallbackImages = [
            'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
            'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800',
            'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800',
            'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800',
          ];

          const mapped = json.data.map((p: any, idx: number) => {
            const sizes = p.variants ? Array.from(new Set(p.variants.map((v: any) => v.size))) : ['S', 'M'];
            return {
              id: p.id,
              brand: 'RENT-ISH EXCLUSIVE',
              title: p.name,
              sizes,
              price: Number(p.rental_price) / 1000,
              retailPrice: Number(p.retail_price) / 1000,
              imageUrl: (p.images && p.images.length > 0) ? p.images[0] : (p.image_url || fallbackImages[idx % fallbackImages.length]),
              images: (p.images && p.images.length > 0) ? p.images : [p.image_url || fallbackImages[idx % fallbackImages.length]],
              badges: idx === 0 ? ['Thịnh Hành'] : [],
            };
          });
          setTrendingProducts(mapped);
        }
      } catch (err) {
        console.error("Lỗi khi tải gợi ý thịnh hành:", err);
      } finally {
        setIsLoadingTrending(false);
      }
    }

    loadTrending();
  }, []);

  // Tính toán số liệu tổng quan
  const totalRental = items.reduce((acc, i) => acc + (i.price || 0), 0);
  const totalRetail = items.reduce((acc, i) => acc + (i.retailPrice || 0), 0);
  const totalSavings = Math.max(0, totalRetail - totalRental);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-28 pb-space-xl">
        <div className="max-w-7xl mx-auto px-margin sm:px-margin-lg">
          
          {/* Breadcrumbs & Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-surface-container gap-4">
            <div>
              <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs font-label-sm text-on-surface-variant mb-2">
                <Link href="/" className="hover:text-on-surface transition-colors">Trang chủ</Link>
                <span>/</span>
                <span className="text-on-surface font-semibold">Danh sách yêu thích</span>
              </nav>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface tracking-tight">
                Tủ Đồ Yêu Thích Của Bạn
              </h1>
              <p className="font-body-sm text-sm text-on-surface-variant mt-1">
                Lưu giữ những thiết kế ấn tượng để sẵn sàng tỏa sáng cho mọi dịp đặc biệt.
              </p>
            </div>
            
            {isHydrated && items.length > 0 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowClearModal(true)}
                  className="px-4 py-2 rounded-full border border-surface-container-high hover:border-error/40 hover:bg-error/5 text-on-surface-variant hover:text-error text-xs font-label-md font-semibold transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
                  <span>Xóa tất cả</span>
                </button>
                <Link
                  href="/dresses"
                  className="px-4 py-2 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-label-md font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>Thêm trang phục</span>
                </Link>
              </div>
            )}
          </div>

          {/* Loading Skeleton during hydration */}
          {!isHydrated ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter py-12">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-surface-container-low rounded-xl h-96 animate-pulse" />
              ))}
            </div>
          ) : items.length > 0 ? (
            <>
              {/* Summary Stats Bar */}
              <div className="bg-surface-container-lowest rounded-2xl p-4 sm:p-6 mb-8 border border-surface-container-low shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      favorite
                    </span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-base font-bold text-on-surface">
                      Đang lưu {items.length} bộ trang phục tuyển chọn
                    </h2>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                      Tổng chi phí thuê ước tính: <strong className="text-on-surface">{totalRental.toLocaleString()}K</strong>
                    </p>
                  </div>
                </div>

                {totalSavings > 0 && (
                  <div className="sm:text-right bg-emerald-50 text-emerald-800 px-4 py-2.5 rounded-xl border border-emerald-100/80">
                    <span className="text-xs font-label-sm uppercase tracking-wider font-semibold block text-emerald-700">
                      Tiết kiệm ước tính
                    </span>
                    <span className="font-headline-sm text-base font-bold">
                      ~{totalSavings.toLocaleString()}K so với mua mới
                    </span>
                  </div>
                )}
              </div>

              {/* Wishlist Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
                {items.map((item) => {
                  const savePercentage = item.retailPrice && item.price
                    ? Math.round(((item.retailPrice - item.price) / item.retailPrice) * 100)
                    : 0;

                  return (
                    <article
                      key={item.id}
                      className="group bg-surface-container-lowest rounded-2xl p-space-sm shadow-[0_8px_24px_-4px_rgba(36,30,26,0.05)] hover:shadow-[0_16px_36px_-4px_rgba(36,30,26,0.12)] transition-all duration-300 flex flex-col justify-between border border-surface-container/60"
                    >
                      {/* Image & Badges */}
                      <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-surface-container-low mb-space-md">
                        <Link href={`/dresses/${item.id}`}>
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        </Link>

                        {/* Top Left Status */}
                        <div className="absolute top-2.5 left-2.5">
                          <span className="bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-[11px] text-on-surface px-2.5 py-0.5 rounded-full font-semibold shadow-sm">
                            Sẵn sàng thuê
                          </span>
                        </div>

                        {/* Remove Heart Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label={`Xóa ${item.title} khỏi yêu thích`}
                          className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-rose-500 hover:text-rose-700 hover:scale-110 active:scale-95 transition-all shadow-sm group/btn"
                        >
                          <span
                            className="material-symbols-outlined text-[20px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            favorite
                          </span>
                        </button>
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-between px-1">
                        <div>
                          <div className="font-label-sm text-xs text-primary uppercase tracking-widest font-bold">
                            {item.brand || 'RENT-ISH EXCLUSIVE'}
                          </div>
                          <Link href={`/dresses/${item.id}`}>
                            <h3 className="font-headline-sm text-base font-semibold text-on-surface group-hover:text-primary transition-colors line-clamp-1 mt-0.5">
                              {item.title}
                            </h3>
                          </Link>
                          <div className="font-body-sm text-xs text-outline mt-1">
                            Size: {item.sizes?.length ? item.sizes.join(', ') : 'S, M'}
                          </div>
                        </div>

                        {/* Price & Actions */}
                        <div className="pt-3 mt-3 border-t border-surface-container-high space-y-3">
                          <div className="flex items-baseline justify-between">
                            <div>
                              <span className="font-headline-sm text-lg font-bold text-on-surface">
                                {item.price}K
                              </span>
                              <span className="font-body-sm text-xs text-on-surface-variant">
                                {' '}/ 4 ngày
                              </span>
                            </div>
                            {savePercentage > 0 && (
                              <div className="font-label-sm text-[11px] text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded font-semibold">
                                Tiết kiệm {savePercentage}%
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <Link
                              href={`/dresses/${item.id}`}
                              className="w-full bg-primary hover:bg-tertiary text-on-primary font-label-md text-xs font-semibold py-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1"
                            >
                              <span className="material-symbols-outlined text-[15px]">calendar_month</span>
                              <span>Thuê ngay</span>
                            </Link>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="w-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-error font-label-md text-xs font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1"
                            >
                              <span className="material-symbols-outlined text-[15px]">delete</span>
                              <span>Bỏ thích</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="space-y-16 my-8">
              <div className="bg-surface-container-lowest rounded-3xl p-10 sm:p-14 text-center max-w-2xl mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-surface-container space-y-5">
                <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto shadow-inner">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 0" }}>
                    favorite_border
                  </span>
                </div>
                <h2 className="font-headline-md text-2xl font-bold text-on-surface">
                  Tủ đồ yêu thích của bạn đang trống
                </h2>
                <p className="font-body-sm text-sm text-on-surface-variant leading-relaxed max-w-md mx-auto">
                  Bạn chưa lưu thiết kế nào. Hãy chạm vào biểu tượng trái tim ở các bộ váy dạ hội, áo dài hay set đồ thiết kế để chuẩn bị cho dịp đặc biệt tiếp theo!
                </p>
                <div className="pt-2">
                  <Link
                    href="/dresses"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-on-primary font-label-md text-sm font-bold shadow-md hover:bg-tertiary transition-all hover:scale-105 active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[18px]">explore</span>
                    <span>Khám phá bộ sưu tập ngay</span>
                  </Link>
                </div>
              </div>

              {/* Trending Suggestions Section */}
              {trendingProducts.length > 0 && (
                <div className="border-t border-surface-container pt-12">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-xs font-label-sm uppercase tracking-widest text-primary font-bold block mb-1">
                        Gợi ý dành cho bạn
                      </span>
                      <h3 className="font-headline-md text-xl sm:text-2xl font-bold text-on-surface">
                        Các Thiết Kế Được Yêu Thích Nhất
                      </h3>
                    </div>
                    <Link
                      href="/dresses"
                      className="text-xs sm:text-sm font-label-md font-semibold text-primary hover:underline flex items-center gap-1"
                    >
                      <span>Xem tất cả</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
                    {trendingProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        brand={product.brand}
                        title={product.title}
                        sizes={product.sizes}
                        price={product.price}
                        retailPrice={product.retailPrice}
                        imageUrl={product.imageUrl}
                        badges={product.badges}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* Clear Confirmation Modal */}
      {showClearModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-surface-container space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-error/10 text-error flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[24px]">delete_forever</span>
            </div>
            <div className="text-center space-y-1">
              <h4 className="font-headline-sm text-lg font-bold text-on-surface">
                Xóa tất cả trang phục?
              </h4>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Thao tác này sẽ xóa toàn bộ {items.length} món đồ khỏi danh sách yêu thích của bạn.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowClearModal(false)}
                className="w-full py-2.5 rounded-xl border border-surface-container-high text-on-surface text-xs font-label-md font-semibold hover:bg-surface-container transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  clearWishlist();
                  setShowClearModal(false);
                }}
                className="w-full py-2.5 rounded-xl bg-error text-white text-xs font-label-md font-semibold hover:bg-error/90 transition-colors shadow-sm"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
