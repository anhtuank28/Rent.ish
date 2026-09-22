"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../../../store/cartStore';

interface BookingEngineProps {
  product: {
    id: string;
    name: string;
    brand: string;
    image: string;
    price: number;
    retailPrice: number;
    sizes: { size: string, variantId: string }[];
  }
}

export function BookingEngine({ product }: BookingEngineProps) {
  // Helper tính ngày mai dạng YYYY-MM-DD
  const getTomorrowDateString = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const minDateStr = getTomorrowDateString();

  const [startDateStr, setStartDateStr] = useState<string>(minDateStr);
  const [duration, setDuration] = useState<4 | 8 | 16>(4);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]?.size || 'M');
  const [isLoading, setIsLoading] = useState(false);

  // Trạng thái kiểm tra trống lịch (Real-time Availability)
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [availableCount, setAvailableCount] = useState<number>(1);

  const router = useRouter();
  const { addItem } = useCartStore();

  const basePrice = product.price;
  const currentPrice = duration === 4 ? basePrice : duration === 8 ? basePrice + 18 : basePrice + 36;
  const savePercentage = Math.round(((product.retailPrice - currentPrice) / product.retailPrice) * 100);

  const selectedVariantId = product.sizes.find(s => s.size === selectedSize)?.variantId || product.sizes[0]?.variantId || '';

  // Tính ngày kết thúc dựa trên ngày bắt đầu và gói ngày
  const getEndDateStr = (start: string, days: number) => {
    try {
      const d = new Date(start);
      if (isNaN(d.getTime())) return '';
      d.setDate(d.getDate() + days);
      return d.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  const endDateStr = getEndDateStr(startDateStr, duration);

  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  // Gọi API kiểm tra lịch trống (Availability)
  useEffect(() => {
    if (!startDateStr || !endDateStr || !product.id) return;

    let isMounted = true;
    const checkAvailability = async () => {
      setIsCheckingAvailability(true);
      try {
        const res = await fetch(`/api/products/${product.id}/availability?startDate=${startDateStr}&endDate=${endDateStr}`);
        const json = await res.json();
        if (isMounted && json.success) {
          const units: any[] = json.data || [];
          // Kiểm tra xem có unit nào thuộc size đã chọn hay không (hoặc freesize)
          const matchingUnits = units.filter(u => 
            !selectedSize || !u.size || 
            u.size.toLowerCase() === selectedSize.toLowerCase() || 
            u.size.toLowerCase() === 'freesize'
          );

          if (matchingUnits.length > 0) {
            setIsAvailable(true);
            setAvailableCount(matchingUnits.length);
          } else {
            setIsAvailable(false);
            setAvailableCount(0);
          }
        }
      } catch (err) {
        console.error("Lỗi khi kiểm tra lịch trống:", err);
      } finally {
        if (isMounted) setIsCheckingAvailability(false);
      }
    };

    const timer = setTimeout(checkAvailability, 200);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [product.id, startDateStr, endDateStr, selectedSize]);

  // Đặt nhanh ngày
  const handleQuickDateSelect = (daysFromNow: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysFromNow);
    setStartDateStr(d.toISOString().split('T')[0]);
  };

  const handleAddToCart = async () => {
    if (!isAvailable) return;
    setIsLoading(true);
    try {
      const startDate = new Date(startDateStr);
      const endDate = new Date(startDateStr);
      endDate.setDate(startDate.getDate() + duration);

      const newItem = {
        id: crypto.randomUUID(),
        variantId: selectedVariantId,
        rentalStartDate: startDate.toISOString(),
        rentalEndDate: endDate.toISOString(),
        product: {
          id: product.id,
          name: product.name,
          brand: product.brand,
          image: product.image,
          price: currentPrice,
          retailPrice: product.retailPrice,
          size: selectedSize
        }
      };

      addItem(newItem);
      
      // Đồng bộ ngầm lên database nếu người dùng đã đăng nhập
      try {
        await fetch('/api/cart/merge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ localItems: [newItem] })
        });
      } catch {
        // Khách vãng lai (chưa đăng nhập) -> bỏ qua, dữ liệu đã lưu trong LocalStorage
      }
      
      router.push('/cart');
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface-container-lowest p-space-lg md:p-space-xl rounded-2xl shadow-[0_12px_36px_-6px_rgba(36,30,26,0.08)] flex flex-col gap-space-lg border border-surface-container/60">
      
      {/* Heading & Designer Meta */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md tracking-widest uppercase font-semibold text-primary">
            {product.brand || 'RENT-ISH EXCLUSIVE'}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-tertiary-container/60 text-on-tertiary-container font-label-sm text-label-sm font-medium">
            Hàng chính hãng
          </span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight leading-snug font-bold">
          {product.name}
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
      <div className="p-space-md rounded-2xl bg-surface-container-low flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg font-bold text-on-surface">
              {currentPrice}K
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              / {duration} ngày
            </span>
          </div>
          <div className="text-right">
            <span className="font-body-sm text-body-sm text-outline line-through">
              Giá gốc {product.retailPrice}K
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
              className={`py-2.5 px-3 rounded-xl font-label-md text-label-md transition-all text-center cursor-pointer ${
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

      {/* Real Date Picker & Timeline */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-semibold">
            Chọn Ngày Nhận Đồ
          </label>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickDateSelect(1)}
              className="text-xs px-2 py-0.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors cursor-pointer"
            >
              Ngày mai
            </button>
            <button
              type="button"
              onClick={() => handleQuickDateSelect(3)}
              className="text-xs px-2 py-0.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors cursor-pointer"
            >
              +3 ngày
            </button>
          </div>
        </div>

        {/* Interactive Date Input */}
        <div className="relative">
          <input
            type="date"
            min={minDateStr}
            value={startDateStr}
            onChange={(e) => setStartDateStr(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-surface-container text-on-surface font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer shadow-inner"
          />
        </div>

        {/* Timeline Visual Card */}
        <div className="p-3.5 rounded-xl bg-surface-container-low/80 border border-surface-container/60 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <span className="text-on-surface-variant flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-[15px] text-primary">local_shipping</span>
                Ngày nhận đồ:
              </span>
              <span className="font-semibold text-on-surface block text-sm">
                {formatDateDisplay(startDateStr)}
              </span>
            </div>

            <div className="flex flex-col items-center px-2">
              <span className="text-[10px] uppercase font-bold text-primary tracking-wider bg-primary-container/40 px-2 py-0.5 rounded-full">
                {duration} Ngày
              </span>
              <span className="text-outline text-xs">➔</span>
            </div>

            <div className="space-y-0.5 text-right">
              <span className="text-on-surface-variant flex items-center justify-end gap-1 font-medium">
                <span className="material-symbols-outlined text-[15px] text-emerald-600">assignment_return</span>
                Ngày trả đồ:
              </span>
              <span className="font-semibold text-on-surface block text-sm">
                {formatDateDisplay(endDateStr)}
              </span>
            </div>
          </div>

          {/* Availability Status Badge */}
          <div className="pt-2 border-t border-surface-container/60 flex items-center justify-between text-xs">
            {isCheckingAvailability ? (
              <span className="flex items-center gap-1.5 text-on-surface-variant italic">
                <span className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                Đang kiểm tra tình trạng đồ...
              </span>
            ) : isAvailable ? (
              <span className="flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <span className="material-symbols-outlined text-[15px] text-emerald-600">check_circle</span>
                Còn {availableCount} sản phẩm sẵn sàng giao
              </span>
            ) : (
              <span className="flex items-center gap-1 text-rose-700 font-semibold bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                <span className="material-symbols-outlined text-[15px] text-rose-600">error</span>
                Đã kín lịch trong khoảng ngày này
              </span>
            )}
            <span className="text-outline text-[11px]">Chống trùng lịch tự động</span>
          </div>
        </div>
      </div>

      {/* Size Selection */}
      <div className="space-y-2.5">
        <div className="flex justify-between items-center">
          <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-semibold">
            Chọn Size
          </label>
          <button className="font-label-sm text-label-sm text-primary font-semibold hover:underline flex items-center gap-0.5 cursor-pointer" type="button">
            <span className="material-symbols-outlined text-[15px]">straighten</span>
            <span>Hướng dẫn chọn size</span>
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {product.sizes.map((s) => (
            <button
              key={s.size}
              className={`py-2.5 rounded-xl font-label-md text-label-md font-semibold text-center transition-all cursor-pointer ${
                selectedSize === s.size 
                  ? 'bg-on-surface text-on-primary shadow-sm' 
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
              onClick={() => setSelectedSize(s.size)}
              type="button"
            >
              {s.size}
            </button>
          ))}
        </div>

        {/* Free Backup Size */}
        <div className="p-3.5 rounded-xl bg-secondary-container/40 flex flex-col gap-2.5 mt-2">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input defaultChecked className="w-4 h-4 rounded accent-primary text-on-primary focus:ring-0" type="checkbox" />
            <span className="font-label-sm text-label-sm font-semibold text-on-surface">
              Kèm thêm 1 size dự phòng MIỄN PHÍ
            </span>
          </label>
          <div className="flex items-center gap-2 pl-6">
            <span className="font-body-sm text-body-sm text-on-surface-variant whitespace-nowrap">Size dự phòng:</span>
            <select className="flex-1 bg-surface-container-lowest text-on-surface font-label-sm text-label-sm rounded-full px-3 py-1.5 outline-none shadow-sm cursor-pointer">
              {product.sizes.filter(s => s.size !== selectedSize).map(s => (
                <option key={s.size} value={s.size}>Size {s.size}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="space-y-2.5 pt-1">
        <button
          onClick={handleAddToCart}
          disabled={isLoading || !isAvailable || isCheckingAvailability}
          className={`w-full h-12 rounded-full font-label-lg text-label-lg font-bold shadow-[0_6px_20px_rgba(36,30,26,0.12)] transition-all flex items-center justify-center gap-2 ${
            isAvailable && !isCheckingAvailability
              ? 'bg-primary-container hover:bg-tertiary-container text-on-primary-container hover:shadow-lg active:scale-[0.99] cursor-pointer'
              : 'bg-surface-container text-outline cursor-not-allowed opacity-70'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">
            {isLoading ? 'progress_activity' : isAvailable ? 'shopping_bag' : 'event_busy'}
          </span>
          <span>
            {isLoading
              ? 'Đang thêm...'
              : isAvailable
              ? `Thêm Vào Giỏ • ${currentPrice}K`
              : 'Đã Kín Lịch Trong Khoảng Ngày Này'}
          </span>
        </button>
        <div className="flex items-center gap-2">
          <button
            className="flex-1 h-11 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">favorite</span>
            <span>Thêm vào Yêu thích</span>
          </button>
        </div>
      </div>

      {/* Guarantees */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t-0">
        <div className="flex flex-col items-center text-center p-2 rounded-xl bg-surface-container-low">
          <span className="material-symbols-outlined text-[20px] text-primary mb-1">dry_cleaning</span>
          <span className="font-label-sm text-label-sm font-semibold text-on-surface leading-tight">Giặt ủi</span>
          <span className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">Rent-ish lo</span>
        </div>
        <div className="flex flex-col items-center text-center p-2 rounded-xl bg-surface-container-low">
          <span className="material-symbols-outlined text-[20px] text-primary mb-1">health_and_safety</span>
          <span className="font-label-sm text-label-sm font-semibold text-on-surface leading-tight">Bảo hiểm</span>
          <span className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">Rách, xước nhỏ</span>
        </div>
        <div className="flex flex-col items-center text-center p-2 rounded-xl bg-surface-container-low">
          <span className="material-symbols-outlined text-[20px] text-primary mb-1">autorenew</span>
          <span className="font-label-sm text-label-sm font-semibold text-on-surface leading-tight">Hoàn trả</span>
          <span className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">Túi đóng sẵn tem</span>
        </div>
      </div>

    </div>
  );
}
