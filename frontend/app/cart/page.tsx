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
  const [stockStatus, setStockStatus] = useState<Record<string, boolean>>({});
  const [isCheckingStock, setIsCheckingStock] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || items.length === 0) return;
    let isMounted = true;

    const checkStock = async () => {
      setIsCheckingStock(true);
      const status: Record<string, boolean> = {};

      for (const item of items) {
        try {
          const start = item.rentalStartDate?.split('T')[0];
          const end = item.rentalEndDate?.split('T')[0];
          if (!start || !end || !item.product?.id) continue;

          const res = await fetch(`/api/products/${item.product.id}/availability?startDate=${start}&endDate=${end}`);
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            const hasUnit = json.data.some((u: any) =>
              !item.product.size || !u.size ||
              u.size.toLowerCase() === item.product.size.toLowerCase() ||
              u.size.toLowerCase() === 'freesize'
            );
            status[item.id] = hasUnit;
          }
        } catch {
          // ignore network errors
        }
      }

      if (isMounted) {
        setStockStatus(status);
        setIsCheckingStock(false);
      }
    };

    checkStock();
    return () => { isMounted = false; };
  }, [isHydrated, items]);

  if (!mounted || !isHydrated) return null; // Hydration mismatch fix

  const hasUnavailableItems = Object.values(stockStatus).some(status => status === false);
  const unavailableCount = Object.values(stockStatus).filter(status => status === false).length;

  const removeAllUnavailable = () => {
    items.forEach(item => {
      if (stockStatus[item.id] === false) {
        removeItem(item.id);
      }
    });
  };

  const subtotal = items.reduce((sum, item) => sum + (item.product.price * (Math.ceil((new Date(item.rentalEndDate).getTime() - new Date(item.rentalStartDate).getTime()) / (1000 * 3600 * 24)) || 1)), 0);
  const careProtectionPrice = 50 * items.length; // 50K per item

  return (
    <>
      <CartHeader />
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-140px)] flex flex-col">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-margin py-6 sm:py-8 w-full flex-1">
          
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6 pb-2">
            <div className="flex items-baseline gap-2.5">
              <h1 className="text-xl sm:text-headline-md text-on-surface font-semibold tracking-tight">
                Giỏ Hàng Của Bạn
              </h1>
              <span className="font-label-md text-xs sm:text-label-md text-on-surface-variant font-medium bg-surface-container-low px-2.5 py-0.5 rounded-full">
                {items.length} sản phẩm
              </span>
            </div>
            {hasUnavailableItems && (
              <button
                onClick={removeAllUnavailable}
                className="text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-full border border-rose-200 transition-colors flex items-center gap-1 cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[15px]">delete_sweep</span>
                <span>Xóa {unavailableCount} món hết hàng</span>
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            <div className="lg:col-span-7 flex flex-col gap-4">
              {items.length === 0 ? (
                <div className="p-8 text-center bg-surface-container-lowest rounded-DEFAULT border border-surface-container-low">
                  <p className="text-body-lg text-on-surface-variant">Giỏ hàng của bạn đang trống</p>
                </div>
              ) : (
                items.map((item) => {
                  const isItemUnavailable = stockStatus[item.id] === false;

                  return (
                    <div key={item.id} className="relative">
                      {isItemUnavailable && (
                        <div className="mb-2 p-2.5 px-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between text-xs text-rose-700">
                          <span className="flex items-center gap-1.5 font-medium">
                            <span className="material-symbols-outlined text-[16px] text-rose-600">event_busy</span>
                            Sản phẩm này đã kín lịch trong khoảng ngày bạn chọn!
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="font-bold underline hover:text-rose-900 cursor-pointer ml-2"
                            type="button"
                          >
                            Xóa ngay
                          </button>
                        </div>
                      )}
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-low text-secondary hover:text-error hover:bg-error-container transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                      </button>
                      <div className={isItemUnavailable ? 'opacity-70 border border-rose-300 rounded-xl overflow-hidden' : ''}>
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
                    </div>
                  );
                })
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
                disabled={hasUnavailableItems}
                disabledReason={hasUnavailableItems ? `Có ${unavailableCount} sản phẩm đã hết hàng trong giỏ. Vui lòng xóa trước khi thanh toán.` : undefined}
              />
            </div>
          </div>
          
        </div>
      </main>
      <CartFooter />
    </>
  );
}
