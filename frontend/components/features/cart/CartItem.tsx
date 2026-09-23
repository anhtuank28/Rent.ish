import React from 'react';

interface CartItemProps {
  id: string;
  brand: string;
  name: string;
  image: string;
  size: string;
  fits: string;
  backupSize: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  price: number;
  retailPrice: number;
}

export function CartItem({
  brand,
  name,
  image,
  size,
  fits,
  backupSize,
  startDate,
  endDate,
  durationDays,
  price,
  retailPrice
}: CartItemProps) {
  return (
    <article className="bg-surface-container-lowest rounded-DEFAULT p-4 shadow-[0_1px_4px_rgba(36,30,26,0.04)] hover:shadow-[0_4px_16px_rgba(36,30,26,0.06)] transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4 relative">
      <div className="w-24 h-32 sm:w-[100px] sm:h-[130px] shrink-0 rounded-DEFAULT overflow-hidden bg-surface-container-low aspect-[3/4]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="font-label-sm text-[11px] tracking-widest text-on-surface-variant uppercase font-medium">
              {brand}
            </span>
            <h2 className="font-headline-sm text-[17px] font-semibold text-on-surface leading-tight mt-0.5">
              {name}
            </h2>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-1.5 mt-2">
          <span className="bg-surface-container-low text-on-surface text-[12px] font-medium px-2 py-0.5 rounded-full">
            Size: {size} (Vừa {fits})
          </span>
          {backupSize && (
            <span className="bg-secondary-container/40 text-on-surface text-[12px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="text-primary font-bold">+</span> Dự phòng: {backupSize} (Miễn phí)
            </span>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-2.5 mt-2.5">
          <div className="inline-flex items-center gap-1.5 bg-primary-container/30 text-on-primary-container px-2.5 py-0.5 rounded-full text-label-sm font-medium">
            <span className="material-symbols-outlined text-[14px]">calendar_today</span>
            <span>{startDate} → {endDate} ({durationDays} Ngày)</span>
          </div>
          <button className="font-label-sm text-outline hover:text-on-surface hover:underline transition-colors" type="button">
            Sửa ngày hoặc size
          </button>
        </div>
      </div>
      
      <div className="sm:self-center flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-surface-container">
        <div className="text-left sm:text-right">
          <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
            {(price >= 10000 ? price : price * 1000).toLocaleString('vi-VN')}đ
          </span>
          <span className="block text-label-sm text-outline line-through">
            Gốc {(retailPrice >= 10000 ? retailPrice : retailPrice * 1000).toLocaleString('vi-VN')}đ
          </span>
        </div>
        <button
          aria-label="Xóa sản phẩm"
          className="text-outline hover:text-error transition-colors p-1.5 rounded-full hover:bg-error-container/20 mt-1"
          title="Xóa đầm"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">delete_outline</span>
        </button>
      </div>
    </article>
  );
}
