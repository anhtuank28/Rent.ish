"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../../../store/cartStore';

interface BookingEngineProps {
  price: number;
  retailPrice: number;
  sizes: string[];
}

export function BookingEngine({ price, retailPrice, sizes }: BookingEngineProps) {
  const [duration, setDuration] = useState<4 | 8 | 16>(4);
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || 'M');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { addItem } = useCartStore();

  const basePrice = price;
  const currentPrice = duration === 4 ? basePrice : duration === 8 ? basePrice + 18 : basePrice + 36;
  const savePercentage = Math.round(((retailPrice - currentPrice) / retailPrice) * 100);

  const [realVariantId, setRealVariantId] = useState('123e4567-e89b-12d3-a456-426614174000');

  // Pre-fetch 1 mã variant thật từ DB ngay khi load trang để lúc bấm Add to Cart không bị chậm
  React.useEffect(() => {
    fetch('/api/products?limit=1')
      .then(res => res.json())
      .then(data => {
        const id = data?.data?.products?.[0]?.variants?.[0]?.id;
        if (id) setRealVariantId(id);
      })
      .catch(console.error);
  }, []);

  const handleAddToCart = () => {
    setIsLoading(true);
    try {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + duration);

      addItem({
        id: crypto.randomUUID(),
        variantId: realVariantId,
        rentalStartDate: startDate.toISOString(),
        rentalEndDate: endDate.toISOString(),
        product: {
          id: 'd1',
          name: 'Đầm Dạ Hội Hở Lưng Eliana Xẻ Đùi',
          brand: 'AURA STUDIO',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC2bJXYmJ22u37qN0Wb2aWqJk_2rQ1XF8fN2-1bN5eP34yY12Z83b5pXm0m-0J6K7-PZ4O6M3w5m0T-xM4lT9_a9z2e7bY3vF7dY8T2N1K8O3G4J7Z1wT9m3n8Y4jH9fQ7F4lP2_3-5z3j8h9d0X3T9xM2R1K3X5dZ9F2vL4jP6T9wZ4fD1w8B7G5cZ1M2X3',
          price: currentPrice,
          retailPrice,
          size: selectedSize
        }
      });
      
      router.push('/cart');
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-[0_12px_36px_-6px_rgba(36,30,26,0.08)] flex flex-col gap-space-lg">
      
      {/* Heading & Designer Meta */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md tracking-widest uppercase font-semibold text-primary">
            AURA STUDIO
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-tertiary-container/60 text-on-tertiary-container font-label-sm text-label-sm font-medium">
            Hàng chính hãng
          </span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight leading-snug">
          Đầm Dạ Hội Hở Lưng Eliana Xẻ Đùi
        </h1>
        <div className="flex items-center gap-2 pt-1">
          <div className="flex items-center text-[#d48c3b]">
            <span className="material-symbols-outlined text-[18px] fill-current">star</span>
            <span className="material-symbols-outlined text-[18px] fill-current">star</span>
            <span className="material-symbols-outlined text-[18px] fill-current">star</span>
            <span className="material-symbols-outlined text-[18px] fill-current">star</span>
            <span className="material-symbols-outlined text-[18px] fill-current">star</span>
          </div>
          <span className="font-label-md text-label-md font-semibold text-on-surface">4.9</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">(128 đánh giá)</span>
          <span className="text-outline-variant">•</span>
          <span className="font-label-sm text-label-sm text-primary font-medium">Top Lựa Chọn Dạ Hội</span>
        </div>
      </div>

      {/* Pricing Block */}
      <div className="p-space-md rounded-DEFAULT bg-surface-container-low flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg font-semibold text-on-surface">
              {currentPrice}K
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              / {duration} ngày
            </span>
          </div>
          <div className="text-right">
            <span className="font-body-sm text-body-sm text-outline line-through">
              Giá gốc {retailPrice}K
            </span>
            <span className="block font-label-sm text-label-sm text-primary font-semibold">
              Tiết kiệm {savePercentage}%
            </span>
          </div>
        </div>
      </div>

      {/* Rental Duration */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-semibold">
            Thời gian thuê
          </label>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { days: 4, label: '4 Ngày', extra: '' },
            { days: 8, label: '8 Ngày', extra: '(+18K)' },
            { days: 16, label: '16 Ngày', extra: '(+36K)' },
          ].map((d) => (
            <button
              key={d.days}
              className={`py-2.5 px-3 rounded-full font-label-md text-label-md transition-all text-center ${
                duration === d.days
                  ? 'font-semibold bg-primary-container text-on-primary-container shadow-sm'
                  : 'font-medium bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
              onClick={() => setDuration(d.days as 4 | 8 | 16)}
              type="button"
            >
              {d.label} {d.extra && <span className="text-[10px] block font-normal">{d.extra}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Date Picker (Mock) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-semibold">
            Chọn ngày thuê
          </label>
          <span className="font-label-sm text-label-sm text-primary font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">calendar_month</span>
            Tháng 10, 2026
          </span>
        </div>
        <div className="p-3.5 rounded-DEFAULT bg-surface-container-low text-center font-body-sm text-on-surface-variant">
          [Lịch tương tác sẽ được tích hợp ở Phase 2 cùng API]
        </div>
      </div>

      {/* Size Selection */}
      <div className="space-y-2.5">
        <div className="flex justify-between items-center">
          <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-semibold">
            Chọn Size
          </label>
          <button className="font-label-sm text-label-sm text-primary font-semibold hover:underline flex items-center gap-0.5" type="button">
            <span className="material-symbols-outlined text-[15px]">straighten</span>
            <span>Hướng dẫn chọn size</span>
          </button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              className={`py-2.5 rounded-full font-label-md text-label-md font-semibold text-center transition-all ${
                selectedSize === s 
                  ? 'bg-on-surface text-on-primary shadow-sm' 
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
              onClick={() => setSelectedSize(s)}
              type="button"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Free Backup Size */}
        <div className="p-3.5 rounded-DEFAULT bg-secondary-container/40 flex flex-col gap-2.5 mt-2">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input defaultChecked className="w-4 h-4 rounded accent-primary text-on-primary focus:ring-0" type="checkbox" />
            <span className="font-label-sm text-label-sm font-semibold text-on-surface">
              Kèm thêm 1 size dự phòng MIỄN PHÍ
            </span>
          </label>
          <div className="flex items-center gap-2 pl-6">
            <span className="font-body-sm text-body-sm text-on-surface-variant whitespace-nowrap">Size dự phòng:</span>
            <select className="flex-1 bg-surface-container-lowest text-on-surface font-label-sm text-label-sm rounded-full px-3 py-1.5 outline-none shadow-sm cursor-pointer">
              {sizes.filter(s => s !== selectedSize).map(s => (
                <option key={s} value={s}>Size {s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="space-y-2.5 pt-1">
        <button
          onClick={handleAddToCart}
          disabled={isLoading}
          className="w-full h-12 rounded-full bg-primary-container hover:bg-tertiary-container text-on-primary-container font-label-lg text-label-lg font-bold shadow-[0_6px_20px_rgba(36,30,26,0.12)] hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">{isLoading ? 'progress_activity' : 'shopping_bag'}</span>
          <span>{isLoading ? 'Đang thêm...' : `Thêm Vào Giỏ • ${currentPrice}K`}</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            className="flex-1 h-11 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold transition-colors flex items-center justify-center gap-2"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">favorite</span>
            <span>Thêm vào Yêu thích</span>
          </button>
        </div>
      </div>

      {/* Guarantees */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t-0">
        <div className="flex flex-col items-center text-center p-2 rounded-DEFAULT bg-surface-container-low">
          <span className="material-symbols-outlined text-[20px] text-primary mb-1">dry_cleaning</span>
          <span className="font-label-sm text-label-sm font-semibold text-on-surface leading-tight">Giặt ủi</span>
          <span className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">Rent-ish lo</span>
        </div>
        <div className="flex flex-col items-center text-center p-2 rounded-DEFAULT bg-surface-container-low">
          <span className="material-symbols-outlined text-[20px] text-primary mb-1">health_and_safety</span>
          <span className="font-label-sm text-label-sm font-semibold text-on-surface leading-tight">Bảo hiểm</span>
          <span className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">Rách, xước nhỏ</span>
        </div>
        <div className="flex flex-col items-center text-center p-2 rounded-DEFAULT bg-surface-container-low">
          <span className="material-symbols-outlined text-[20px] text-primary mb-1">autorenew</span>
          <span className="font-label-sm text-label-sm font-semibold text-on-surface leading-tight">Hoàn trả</span>
          <span className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">Túi đóng sẵn tem</span>
        </div>
      </div>

    </div>
  );
}
