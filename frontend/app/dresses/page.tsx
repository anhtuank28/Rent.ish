"use client";

import React, { useState, useEffect, Suspense, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { ProductCard } from '../../components/features/ProductCard';

interface Variant {
  id: string;
  size: string;
  color: string;
  sku: string;
}

interface ProductItem {
  id: string;
  name: string;
  description?: string;
  rental_price: string | number;
  retail_price: string | number;
  image_url?: string;
  images?: string[];
  variants?: Variant[];
}

function DressesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Filter States
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedSize, setSelectedSize] = useState(searchParams.get('size') || 'Tất cả');
  const [selectedPriceRange, setSelectedPriceRange] = useState(searchParams.get('price') || 'all');
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc'>('newest');

  const [products, setProducts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch filtered products
  const fetchFilteredProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm.trim()) params.set('search', searchTerm.trim());
      if (selectedSize && selectedSize !== 'Tất cả') params.set('size', selectedSize);

      if (selectedPriceRange === 'under500') {
        params.set('maxPrice', '500000');
      } else if (selectedPriceRange === '500to1000') {
        params.set('minPrice', '500000');
        params.set('maxPrice', '1000000');
      } else if (selectedPriceRange === 'above1000') {
        params.set('minPrice', '1000000');
      }

      params.set('limit', '24');

      const res = await fetch(`/api/products?${params.toString()}`);
      const json = await res.json();

      if (json.success) {
        let items = (json.data || []).map((p: ProductItem, index: number) => {
          const sizes = p.variants ? Array.from(new Set(p.variants.map((v) => v.size))) : ['S', 'M'];
          const fallbackImages = [
            'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
            'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800',
            'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800',
            'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800',
            'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=800'
          ];

          const productImages = (p.images && p.images.length > 0)
            ? p.images
            : (p.image_url ? [p.image_url] : [fallbackImages[index % fallbackImages.length]]);

          return {
            id: p.id,
            brand: 'RENT-ISH EXCLUSIVE',
            title: p.name,
            sizes: sizes.length > 0 ? sizes : ['S', 'M'],
            price: Number(p.rental_price) / 1000,
            retailPrice: Number(p.retail_price) / 1000,
            imageUrl: productImages[0],
            images: productImages,
            badges: index === 0 ? ['Xu Hướng'] : [],
            rawRentalPrice: Number(p.rental_price)
          };
        });

        // Client-side sorting
        if (sortBy === 'price_asc') {
          items.sort((a: any, b: any) => a.price - b.price);
        } else if (sortBy === 'price_desc') {
          items.sort((a: any, b: any) => b.price - a.price);
        }

        setProducts(items);
        setTotal(json.pagination?.total || items.length);
      }
    } catch (err) {
      console.error("Lỗi khi tải danh sách sản phẩm:", err);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, selectedSize, selectedPriceRange, sortBy]);

  // Debounce search / fetch on filter changes
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchFilteredProducts();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchFilteredProducts]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedSize('Tất cả');
    setSelectedPriceRange('all');
    setSortBy('newest');
  };

  const hasActiveFilters = searchTerm !== '' || selectedSize !== 'Tất cả' || selectedPriceRange !== 'all';

  return (
    <>
      <Navbar />
      <main className="w-full pt-28 bg-background min-h-screen">
        <div className="flex flex-col w-full">
          
          {/* Editorial Collection Intro Banner */}
          <section className="relative w-full bg-gradient-to-b from-secondary-container/40 via-surface-container-low to-background py-space-xl px-margin sm:px-margin-lg overflow-hidden">
            {/* Decorative organic background shapes */}
            <div className="absolute -right-16 -top-24 w-96 h-96 rounded-full bg-primary-container/20 blur-3xl pointer-events-none" />
            <div className="absolute left-1/4 -bottom-16 w-64 h-64 rounded-full bg-tertiary-fixed/30 blur-2xl pointer-events-none" />
            
            <div className="max-w-7xl mx-auto relative z-10">
              {/* Breadcrumb Navigation */}
              <nav aria-label="Breadcrumbs" className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant mb-space-md">
                <Link className="hover:text-on-surface transition-colors" href="/">Trang chủ</Link>
                <span className="text-outline">/</span>
                <Link className="hover:text-on-surface transition-colors" href="/dresses">Bộ sưu tập</Link>
                <span className="text-outline">/</span>
                <span className="text-on-surface font-semibold">Tất cả trang phục</span>
              </nav>

              {/* Headline & Search bar */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-gutter">
                <div className="max-w-2xl space-y-space-xs">
                  <div className="flex items-center gap-space-xs">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                      Tủ Đồ Tuyển Chọn • Lễ Hội Cuối Năm
                    </span>
                  </div>
                  <h1 className="font-display text-display tracking-tight text-on-surface font-semibold">
                    Khám Phá Tất Cả Mẫu Mã
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                    Hơn 1,000+ trang phục thiết kế sẵn sàng cho khoảnh khắc khó quên tiếp theo của bạn. Không cần bận tâm giặt ủi, luôn kèm size dự phòng miễn phí.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  {/* Search Input Bar */}
                  <div className="relative w-full sm:w-72">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                      search
                    </span>
                    <input
                      type="text"
                      placeholder="Tìm kiếm mẫu váy, áo dài..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-8 py-2.5 bg-surface-container-lowest/90 backdrop-blur-md border border-surface-container rounded-full text-sm font-label-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-sm"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface text-sm"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-space-sm bg-surface-container-lowest/80 backdrop-blur-md px-space-md py-space-sm rounded-full shadow-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                    <span className="font-label-md text-label-md text-on-surface font-semibold whitespace-nowrap">
                      {total} mẫu sẵn sàng
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Floating Sticky Filter / Control Bar */}
          <section className="sticky top-20 z-30 w-full px-margin sm:px-margin-lg -mt-4 mb-space-lg">
            <div className="max-w-7xl mx-auto bg-surface-container-lowest/95 backdrop-blur-md rounded-2xl shadow-[0_12px_32px_-4px_rgba(36,30,26,0.08),0_2px_6px_0_rgba(36,30,26,0.03)] px-space-md py-space-sm flex flex-wrap items-center justify-between gap-space-sm">
              
              {/* Quick Size Filters */}
              <div className="flex items-center gap-space-xs overflow-x-auto py-0.5">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider hidden sm:inline-block mr-space-xs">
                  Size:
                </span>
                {['Tất cả', 'S', 'M', 'L', 'Freesize'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'bg-primary-container text-on-surface font-semibold shadow-sm' 
                        : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                    }`}
                    type="button"
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Sort & Reset */}
              <div className="flex items-center gap-space-sm ml-auto">
                <div className="relative inline-block">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface bg-surface-container-low px-space-md py-space-xs rounded-full hover:bg-surface-container transition-colors outline-none cursor-pointer"
                  >
                    <option value="newest">Mới nhất</option>
                    <option value="price_asc">Giá thuê: Thấp đến Cao</option>
                    <option value="price_desc">Giá thuê: Cao đến Thấp</option>
                  </select>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="flex items-center gap-1 text-primary hover:text-on-surface font-label-sm text-label-sm underline px-2 py-1"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                    <span>Đặt lại</span>
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Catalog Core Split (Sidebar + Product Grid) */}
          <section className="max-w-7xl mx-auto w-full px-margin sm:px-margin-lg pb-space-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
              
              {/* Sticky Left Filter Sidebar (3 cols = 25%) */}
              <aside className="hidden lg:block lg:col-span-3 sticky top-36 space-y-space-lg bg-surface-container-lowest p-space-lg rounded-2xl shadow-[0_8px_24px_-4px_rgba(36,30,26,0.05)] border border-surface-container/60">
                
                {/* Filter Header */}
                <div className="flex items-center justify-between pb-space-sm border-b border-surface-container">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      Bộ Lọc
                    </span>
                    {hasActiveFilters && (
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                  {hasActiveFilters && (
                    <button
                      onClick={handleResetFilters}
                      className="font-label-sm text-label-sm text-primary hover:text-on-surface underline tracking-wide cursor-pointer"
                      type="button"
                    >
                      Xóa tất cả
                    </button>
                  )}
                </div>

                {/* Price Range Filter */}
                <div className="space-y-space-sm">
                  <span className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface block font-semibold">
                    Mức Giá Thuê
                  </span>
                  <div className="space-y-1.5">
                    {[
                      { id: 'all', label: 'Tất cả mức giá' },
                      { id: 'under500', label: 'Dưới 500.000đ' },
                      { id: '500to1000', label: '500.000đ - 1.000.000đ' },
                      { id: 'above1000', label: 'Trên 1.000.000đ' },
                    ].map((p) => (
                      <label
                        key={p.id}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-label-md cursor-pointer transition-all ${
                          selectedPriceRange === p.id
                            ? 'bg-primary-container/70 text-on-surface font-semibold'
                            : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                        }`}
                      >
                        <input
                          type="radio"
                          name="priceRange"
                          checked={selectedPriceRange === p.id}
                          onChange={() => setSelectedPriceRange(p.id)}
                          className="accent-primary w-4 h-4 cursor-pointer"
                        />
                        <span>{p.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Size Filter List */}
                <div className="space-y-space-sm">
                  <span className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface block font-semibold">
                    Kích Thước (Size)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {['Tất cả', 'S', 'M', 'L', 'Freesize'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 rounded-full text-xs font-label-md transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'bg-primary text-on-primary font-semibold shadow-sm'
                            : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Logistics & Speed */}
                <div className="space-y-space-sm pt-space-xs border-t border-surface-container">
                  <div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm bg-primary-container/30 px-space-sm py-2 rounded-xl">
                    <span className="material-symbols-outlined text-label-sm">verified</span>
                    <span>Luôn Miễn Phí Size Dự Phòng</span>
                  </div>
                  <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-[12px] px-1">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">dry_cleaning</span>
                    <span>Đã giặt ủi và tiệt trùng chuẩn quốc tế</span>
                  </div>
                </div>
              </aside>

              {/* Main Product Grid (9 cols = 75%) */}
              <div className="lg:col-span-9">
                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-gutter">
                    {[1, 2, 3, 4, 5, 6].map((idx) => (
                      <div key={idx} className="bg-surface-container-lowest rounded-2xl p-4 animate-pulse space-y-3">
                        <div className="w-full aspect-[3/4] bg-surface-container rounded-xl" />
                        <div className="h-4 bg-surface-container rounded w-1/3" />
                        <div className="h-5 bg-surface-container rounded w-3/4" />
                        <div className="h-4 bg-surface-container rounded w-1/2" />
                      </div>
                    ))}
                  </div>
                ) : products.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-gutter">
                    {products.map((product) => (
                      <ProductCard key={product.id} {...product} />
                    ))}
                  </div>
                ) : (
                  <div className="col-span-full py-16 text-center bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-surface-container">
                    <span className="material-symbols-outlined text-[48px] text-outline mb-3 inline-block">
                      search_off
                    </span>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-semibold mb-2">
                      Không tìm thấy trang phục phù hợp
                    </h3>
                    <p className="text-on-surface-variant text-sm max-w-md mx-auto mb-6">
                      Rất tiếc chúng tôi không tìm thấy kết quả nào khớp với bộ lọc hoặc từ khóa &quot;{searchTerm}&quot;. Hãy thử tìm bằng từ khóa khác hoặc xóa bộ lọc.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="px-6 py-2.5 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md font-semibold hover:bg-tertiary-container transition-colors shadow-sm"
                      type="button"
                    >
                      Đặt lại bộ lọc
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function DressesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background pt-28 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <DressesContent />
    </Suspense>
  );
}
