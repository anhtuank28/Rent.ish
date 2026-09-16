import React from 'react';
import { CartHeader } from '../../components/layout/CartHeader';
import { CartFooter } from '../../components/layout/CartFooter';
import { CartItem } from '../../components/features/cart/CartItem';
import { OrderSummary } from '../../components/features/cart/OrderSummary';

const MOCK_CART_ITEMS = [
  {
    id: 'c1',
    brand: 'AURA STUDIO',
    name: 'Đầm Dạ Hội Hở Lưng Eliana Xẻ Đùi',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC2bJXYmJ22u37qN0Wb2aWqJk_2rQ1XF8fN2-1bN5eP34yY12Z83b5pXm0m-0J6K7-PZ4O6M3w5m0T-xM4lT9_a9z2e7bY3vF7dY8T2N1K8O3G4J7Z1wT9m3n8Y4jH9fQ7F4lP2_3-5z3j8h9d0X3T9xM2R1K3X5dZ9F2vL4jP6T9wZ4fD1w8B7G5cZ1M2X3',
    size: 'S',
    fits: '2-4',
    backupSize: 'M',
    startDate: 'Thứ 5, 15 Th10',
    endDate: 'Thứ 2, 19 Th10',
    durationDays: 4,
    price: 450, // 450K
    retailPrice: 4500, // 4500K
  },
  {
    id: 'c2',
    brand: 'CULT GAIA',
    name: 'Váy Yếm Lụa Màu Champagne Draping',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1VgNxgS3eYPNMVdjka7J7Iaoe_K-0xDW4n0Dab-zd7ajeqnqOtVkqixE6jPdnHqpLKjLXjXUKPgDoiJwzjIHEqS8u_OsGJW5y9OX1Kl-7ScuhcDh0vo1AQ3ScYlSrHbVGUidL5J38Kl22tI7Bf5v-j9GlOLTWuNSxtt-Fw0bRAag_o_-JFI9mLbei0rIQiT6IHAi8gXqkre_qzhMbahLAF4_TaqawTQ5ja27Z61U50INs7Vxcv1RKJpiotj',
    size: 'M',
    fits: '6-8',
    backupSize: 'S',
    startDate: 'Thứ 5, 15 Th10',
    endDate: 'Thứ 2, 19 Th10',
    durationDays: 4,
    price: 450, // 450K
    retailPrice: 3900, // 3900K
  }
];

export default function CartPage() {
  const subtotal = MOCK_CART_ITEMS.reduce((sum, item) => sum + item.price, 0);
  const careProtectionPrice = 50 * MOCK_CART_ITEMS.length; // 50K per item

  return (
    <>
      <CartHeader />
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-140px)] flex flex-col">
        <div className="max-w-7xl mx-auto px-gutter-sm lg:px-margin py-8 w-full flex-1">
          
          <div className="flex items-baseline justify-between mb-6 pb-2">
            <div className="flex items-baseline gap-3">
              <h1 className="font-headline-md text-headline-md text-on-surface font-semibold tracking-tight">
                Giỏ Hàng Của Bạn
              </h1>
              <span className="font-label-md text-label-md text-on-surface-variant font-medium bg-surface-container-low px-2.5 py-0.5 rounded-full">
                {MOCK_CART_ITEMS.length} sản phẩm
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-label-sm text-tertiary bg-tertiary-container/30 px-3 py-1 rounded-full">
              <span className="material-symbols-outlined text-[15px]">lock_clock</span>
              <span>Sản phẩm được giữ trong 14:42</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 flex flex-col gap-4">
              {MOCK_CART_ITEMS.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
              
              <div className="bg-surface-container-lowest rounded-DEFAULT p-3.5 px-4 shadow-[0_1px_4px_rgba(36,30,26,0.03)] flex items-center justify-between gap-3 mt-1">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="material-symbols-outlined text-primary text-[20px] shrink-0">shield_with_heart</span>
                  <div className="min-w-0">
                    <p className="text-body-sm font-medium text-on-surface truncate">
                      Thêm Bảo hiểm Rent-ish Care 
                      <span className="font-semibold text-primary"> (+50K/sp)</span>
                    </p>
                    <p className="text-[12px] text-on-surface-variant truncate">
                      Bảo vệ khỏi các vết bẩn rượu vang, vết phấn trang điểm & xước chỉ nhẹ
                    </p>
                  </div>
                </div>
                <button
                  aria-checked="true"
                  className="shrink-0 w-11 h-6 bg-inverse-surface rounded-full p-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary relative"
                  role="switch"
                  type="button"
                >
                  <span className="w-5 h-5 bg-surface-container-lowest rounded-full block transform translate-x-5 transition-transform shadow-sm"></span>
                </button>
              </div>
            </div>
            
            <div className="lg:col-span-5 sticky top-24">
              <OrderSummary 
                itemCount={MOCK_CART_ITEMS.length} 
                subtotal={subtotal} 
                careProtectionPrice={careProtectionPrice}
                hasCareProtection={true} 
              />
            </div>
          </div>
          
        </div>
      </main>
      <CartFooter />
    </>
  );
}
