"use client";

import React, { useEffect, useState } from 'react';
import { CartHeader } from '../../components/layout/CartHeader';
import { CartFooter } from '../../components/layout/CartFooter';
import { CartItem } from '../../components/features/cart/CartItem';
import { OrderSummary } from '../../components/features/cart/OrderSummary';
import { useCartStore } from '../../store/cartStore';

export default function CartPage() {
  const { items, isHydrated, removeItem } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isHydrated) return null; // Hydration mismatch fix

  const subtotal = items.reduce((sum, item) => sum + (item.product.price * (Math.ceil((new Date(item.rentalEndDate).getTime() - new Date(item.rentalStartDate).getTime()) / (1000 * 3600 * 24)) || 1)), 0);
  const careProtectionPrice = 50 * items.length; // 50K per item

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
                {items.length} sản phẩm
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 flex flex-col gap-4">
              {items.length === 0 ? (
                <div className="p-8 text-center bg-surface-container-lowest rounded-DEFAULT border border-surface-container-low">
                  <p className="text-body-lg text-on-surface-variant">Giỏ hàng của bạn đang trống</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="relative">
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-low text-secondary hover:text-error hover:bg-error-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                    <CartItem 
                      id={item.id}
                      brand={item.product.brand}
                      name={item.product.name}
                      image={item.product.image}
                      size={item.product.size}
                      fits="N/A"
                      backupSize="Không"
                      startDate={new Date(item.rentalStartDate).toLocaleDateString('vi-VN')}
                      endDate={new Date(item.rentalEndDate).toLocaleDateString('vi-VN')}
                      durationDays={Math.ceil((new Date(item.rentalEndDate).getTime() - new Date(item.rentalStartDate).getTime()) / (1000 * 3600 * 24)) || 1}
                      price={item.product.price}
                      retailPrice={item.product.retailPrice}
                    />
                  </div>
                ))
              )}
              
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
                itemCount={items.length} 
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
