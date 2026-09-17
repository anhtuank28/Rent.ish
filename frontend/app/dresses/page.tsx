import React from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { ProductCard } from '../../components/features/ProductCard';

/* ─── MOCK DATA ─── */
const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    brand: 'Khaite',
    title: 'Đầm Dạ Hội Xẻ Đùi Lệch Vai Quyến Rũ',
    sizes: ['S', 'M'],
    price: 600,
    retailPrice: 4500,
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1UP79VzcKCNvYG_Hb_A3tQD06bg0gN6Y-NEwSZjiQTWwTbr0N5zr-QFx13iocRM9FnFGnbiV19cFZ_NHwNiaP_zyUqFA2kjxwd0pvWLbTcyZ94BYy8wKz1UhyNxV8vlH1WgdjM4f5_cNoL7xmMtgioiqV5upUgQPgUb7H6djM0k1iFb-XD_Bf8QzD-59vIpi0zyPLCFXjbWLObDxt25hLxZYTlVOTqgWnXqnx6bHruRvQD4VYh9AxfaNulc',
    badges: ['Dạ Hội'],
  },
  {
    id: 'p2',
    brand: 'Christopher Esber',
    title: 'Váy Yếm Lụa Màu Champagne Draping',
    sizes: ['S', 'M', 'L'],
    price: 380,
    retailPrice: 4900,
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1VgNxgS3eYPNMVdjka7J7Iaoe_K-0xDW4n0Dab-zd7ajeqnqOtVkqixE6jPdnHqpLKjLXjXUKPgDoiJwzjIHEqS8u_OsGJW5y9OX1Kl-7ScuhcDh0vo1AQ3ScYlSrHbVGUidL5J38Kl22tI7Bf5v-j9GlOLTWuNSxtt-Fw0bRAag_o_-JFI9mLbei0rIQiT6IHAi8gXqkre_qzhMbahLAF4_TaqawTQ5ja27Z61U50INs7Vxcv1RKJpiotj',
    badges: ['Xu Hướng'],
  },
  {
    id: 'p3',
    brand: 'Cult Gaia',
    title: 'Váy Hai Dây Cổ Đổ Màu Hoàng Hôn',
    sizes: ['M', 'L'],
    price: 350,
    retailPrice: 3800,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfy4xoBTjn1K8NG_K5X_QiZ52VK8Gu7Aswrk7AF85A8FIrZiVE7b00KRMamwGTK1jRPNMElHGpWc8Ud76UqCcFliUQMd6AT8NpSVNnwe6KQeoRgFwXVVVDHmH31A9VIOaNRDLHj6NsmgrW5ZMBgiRIIt71JyuANekW7QH0pg8wJKPIiZHWGgMNm7pxJbgGaaVdanzbKE-M8peHpLv74QA21LpKWguDst_OZrTwcpBe50tfhSFHJwG0EA',
    badges: ['Gợi ý từ Staff'],
  },
  {
    id: 'p4',
    brand: 'Zimmermann',
    title: 'Set Váy Trench Coat Thanh Lịch',
    sizes: ['XS', 'S'],
    price: 420,
    retailPrice: 5500,
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1X0Jr74IOGD9ioWsHhrZhoW78-aRNPj-d9bVe7_5615dwaaM7XeKZXBJ15-GZMv2ftNJip9kkqAixsrR4mQ8hFESexU4mLZwFFik236P66fFIkZHp3gSn0ZC1kV3Gs6PzvaB6W3XB1_e6D_jDRuVtOxVhzM_t4ZL39N0hUGI_15KxYKH1Om7Xuk2aScdpeujOafTiBXPUzR8iNr9ETMIkFJcv75aJiaGO5i4JBMIF6sHl-gjwHc_KwEEp62',
    badges: ['Dạo Phố Cuối Tuần'],
  },
  {
    id: 'p5',
    brand: 'Chanel',
    title: 'Váy Cưới Bồng Bềnh Pha Lê đính kèm Voan',
    sizes: ['S', 'M'],
    price: 3500,
    retailPrice: 25000,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXIGqaTBbVzuie1zm2rW_1XAfF6TCEHSIr6xU3GsX5KNwdVm8yznCM0lDy7sFCwDdi5bWO7Dp1GHlgvXaA8i-Nn87or0oi-t5Uv-434Ozr7fqy9f-rTOA-FTdWgY5dXm5sh6dr0FA2wmQZCn-9kvzIUWsuQMLEc9lx7hRw48rtP6NA7hqFcnhnExOj2KpK8GX7QLVpcQr48P4VIA2ZQ-XdD2xDKqIEiK6ypAQUTiyXoBCVuYyFcZHUoA',
    badges: ['Váy Cưới', 'Độc Quyền'],
  },
  {
    id: 'p6',
    brand: 'Bảo Lộc Silk',
    title: 'Áo Dài Lụa Tơ Tằm Thêu Tay Hạc Tiên',
    sizes: ['M', 'L'],
    price: 1200,
    retailPrice: 8000,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfy4xoBTjn1K8NG_K5X_QiZ52VK8Gu7Aswrk7AF85A8FIrZiVE7b00KRMamwGTK1jRPNMElHGpWc8Ud76UqCcFliUQMd6AT8NpSVNnwe6KQeoRgFwXVVVDHmH31A9VIOaNRDLHj6NsmgrW5ZMBgiRIIt71JyuANekW7QH0pg8wJKPIiZHWGgMNm7pxJbgGaaVdanzbKE-M8peHpLv74QA21LpKWguDst_OZrTwcpBe50tfhSFHJwG0EA', // Placeholder
    badges: ['Truyền Thống'],
  }
];

export default function DressesPage() {
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

              {/* Headline & Subtitle split */}
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
                
                <div className="flex items-center gap-space-sm bg-surface-container-lowest/80 backdrop-blur-md px-space-md py-space-sm rounded-full shadow-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    428 mẫu sẵn sàng giao ngay
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Floating Sticky Filter / Control Bar */}
          <section className="sticky top-20 z-30 w-full px-margin sm:px-margin-lg -mt-4 mb-space-lg">
            <div className="max-w-7xl mx-auto bg-surface-container-lowest/95 backdrop-blur-md rounded-full shadow-[0_12px_32px_-4px_rgba(36,30,26,0.08),0_2px_6px_0_rgba(36,30,26,0.03)] px-space-md py-space-sm flex flex-wrap items-center justify-between gap-space-sm">
              
              {/* Date Range Selector */}
              <div className="flex items-center gap-space-sm bg-surface-container-low hover:bg-surface-container px-space-md py-space-xs rounded-full cursor-pointer transition-colors group">
                <span className="material-symbols-outlined text-primary text-label-lg group-hover:scale-110 transition-transform">
                  calendar_month
                </span>
                <div className="flex items-center gap-space-xs font-label-md text-label-md">
                  <span className="text-on-surface-variant">Ngày sự kiện:</span>
                  <span className="text-on-surface font-semibold">12 Th11 – 15 Th11</span>
                </div>
                <span className="font-label-sm text-label-sm text-primary underline ml-space-xs">
                  Thay đổi
                </span>
              </div>

              {/* Quick Size Filters */}
              <div className="flex items-center gap-space-xs overflow-x-auto py-0.5">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider hidden xl:inline-block mr-space-xs">
                  Size Nhanh:
                </span>
                {['Tất cả', 'XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    className={`px-space-md py-space-xs rounded-full font-label-md text-label-md ${
                      size === 'S' 
                        ? 'bg-primary-container text-on-surface font-semibold shadow-sm' 
                        : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-colors'
                    }`}
                    type="button"
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Live Counter & Sort Trigger */}
              <div className="flex items-center gap-space-sm ml-auto">
                <div className="relative inline-block">
                  <button className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface bg-surface-container-low px-space-md py-space-xs rounded-full hover:bg-surface-container transition-colors">
                    <span className="text-on-surface-variant">Sắp xếp:</span>
                    <span className="font-semibold">Phổ biến nhất</span>
                    <span className="material-symbols-outlined text-label-md">keyboard_arrow_down</span>
                  </button>
                </div>
                <button className="lg:hidden flex items-center gap-space-xs bg-on-secondary-fixed text-surface-container-lowest px-space-md py-space-xs rounded-full font-label-md text-label-md">
                  <span className="material-symbols-outlined text-label-md">tune</span>
                  <span>Lọc</span>
                </button>
              </div>
            </div>
          </section>

          {/* Catalog Core Split (Sidebar + Product Grid) */}
          <section className="max-w-7xl mx-auto w-full px-margin sm:px-margin-lg pb-space-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
              
              {/* Sticky Left Filter Sidebar (3 cols = 25%) */}
              <aside className="hidden lg:block lg:col-span-3 sticky top-36 space-y-space-lg bg-surface-container-lowest p-space-lg rounded-lg shadow-[0_8px_24px_-4px_rgba(36,30,26,0.05)]">
                
                {/* Filter Header */}
                <div className="flex items-center justify-between pb-space-sm border-b border-surface-container">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      Bộ Lọc
                    </span>
                    <span className="w-5 h-5 rounded-full bg-primary-container text-on-surface font-label-sm text-label-sm flex items-center justify-center font-bold">
                      3
                    </span>
                  </div>
                  <button className="font-label-sm text-label-sm text-primary hover:text-on-surface underline tracking-wide" type="button">
                    Xóa tất cả
                  </button>
                </div>

                {/* Category Checklist */}
                <div className="space-y-space-sm">
                  <span className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface block font-semibold">
                    Danh mục
                  </span>
                  <div className="space-y-space-xs">
                    {[
                      { label: 'Váy & Đầm', count: 428, checked: true },
                      { label: 'Dạ hội & Gala', count: 112 },
                      { label: 'Set Đồ Két Hợp', count: 84 },
                      { label: 'Suit & Áo Vest', count: 46 },
                      { label: 'Du lịch & Resort', count: 98 },
                      { label: 'Phụ kiện hàng hiệu', count: 60 },
                    ].map((cat) => (
                      <label key={cat.label} className="flex items-center justify-between py-1 cursor-pointer group">
                        <span className={`flex items-center gap-space-sm font-body-sm text-body-sm ${cat.checked ? 'text-on-surface font-medium' : 'text-on-surface-variant group-hover:text-on-surface'}`}>
                          <input defaultChecked={cat.checked} className="w-4 h-4 rounded text-primary accent-primary cursor-pointer" type="checkbox" />
                          <span>{cat.label}</span>
                        </span>
                        <span className="font-label-sm text-label-sm text-outline">{cat.count}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Occasion Selectors */}
                <div className="space-y-space-sm">
                  <span className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface block font-semibold">
                    Sự Kiện
                  </span>
                  <div className="flex flex-wrap gap-space-xs">
                    {['Khách Mời Cưới', 'Dạ Hội Black Tie', 'Tiệc Cocktail', 'Sinh Nhật', 'Hẹn Hò', 'Dạo Phố Cuối Tuần'].map((occ, i) => (
                      <button
                        key={occ}
                        className={`px-space-md py-1.5 rounded-full font-label-md text-label-md ${
                          i === 0 
                            ? 'bg-primary text-on-primary font-semibold shadow-sm' 
                            : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors'
                        }`}
                      >
                        {occ}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Dual Display */}
                <div className="space-y-space-sm">
                  <div className="flex items-center justify-between font-label-md text-label-md">
                    <span className="uppercase tracking-wider text-on-surface font-semibold">Giá Thuê</span>
                    <span className="font-semibold text-primary">600K — 2800K</span>
                  </div>
                  <div className="relative w-full h-2 bg-surface-container rounded-full mt-2">
                    <div className="absolute left-[16%] right-[25%] h-full bg-primary rounded-full" />
                    <div className="absolute left-[16%] top-1/2 -translate-y-1/2 w-4 h-4 bg-surface-container-lowest rounded-full shadow-md border-2 border-primary cursor-pointer" />
                    <div className="absolute right-[25%] top-1/2 -translate-y-1/2 w-4 h-4 bg-surface-container-lowest rounded-full shadow-md border-2 border-primary cursor-pointer" />
                  </div>
                  <div className="flex justify-between font-label-sm text-label-sm text-outline">
                    <span>350K</span>
                    <span>5000K+</span>
                  </div>
                </div>

                {/* Color Swatches Palette */}
                <div className="space-y-space-sm">
                  <span className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface block font-semibold">
                    Màu Sắc
                  </span>
                  <div className="flex items-center gap-space-sm flex-wrap">
                    {[
                      { name: 'Vàng Champagne', code: '#E5C7B0', active: true },
                      { name: 'Xanh Olive', code: '#8F9E8B' },
                      { name: 'Hồng Đất', code: '#E6B8A8' },
                      { name: 'Đen Tuyền', code: '#241E1A' },
                      { name: 'Trắng Ngọc Trai', code: '#FDFBF7' },
                      { name: 'Xanh Thiên Thanh', code: '#9FB9CC' },
                    ].map((color) => (
                      <button
                        key={color.name}
                        aria-label={color.name}
                        title={color.name}
                        className={`w-7 h-7 rounded-full bg-[${color.code}] transition-transform hover:scale-110 ${
                          color.active ? 'ring-2 ring-offset-2 ring-primary relative scale-110' : ''
                        } ${color.code === '#FDFBF7' ? 'shadow-inner border border-surface-variant' : ''}`}
                        style={{ backgroundColor: color.code }}
                      />
                    ))}
                  </div>
                </div>

                {/* Logistics & Speed */}
                <div className="space-y-space-sm pt-space-xs border-t border-surface-container">
                  <label className="flex items-center justify-between py-1 cursor-pointer">
                    <span className="font-body-sm text-body-sm text-on-surface font-medium">
                      Giao Nhanh Ngày Hôm Sau
                    </span>
                    <input defaultChecked className="w-4 h-4 rounded text-primary accent-primary cursor-pointer" type="checkbox" />
                  </label>
                  <div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm bg-primary-container/30 px-space-sm py-1.5 rounded-full">
                    <span className="material-symbols-outlined text-label-sm">verified</span>
                    <span>Luôn Miễn Phí Size Dự Phòng</span>
                  </div>
                </div>
              </aside>

              {/* Main Product Grid (9 cols = 75%) */}
              <div className="lg:col-span-9">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-gutter">
                  {DUMMY_PRODUCTS.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                  
                  {/* Load More Skeleton/Trigger */}
                  <div className="col-span-full mt-space-lg flex justify-center">
                    <button className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors py-3 px-8 rounded-full border border-surface-container">
                      Tải thêm kết quả (Hiển thị 6/428)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
