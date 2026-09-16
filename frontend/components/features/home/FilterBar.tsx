'use client';

import React, { useState } from 'react';

const FILTER_OPTIONS = [
  { label: 'Tất cả phong cách', isDefault: true },
  { label: 'Tiệc Cocktail' },
  { label: 'Dạ hội & Sự kiện' },
  { label: 'Dạo phố cuối tuần' },
  { label: 'Trang phục du lịch' },
  { label: 'Thuê 4 ngày' },
  { label: 'Thuê 8 ngày' },
  { label: 'Size 0–16' },
];

export function FilterBar() {
  const [activeFilter, setActiveFilter] = useState('Tất cả phong cách');

  return (
    <section className="w-full py-space-md sticky top-20 z-40 bg-surface/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-margin sm:px-margin-lg">
        <div className="flex items-center justify-between gap-space-md overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center gap-space-xs shrink-0" id="filter-container">
            {FILTER_OPTIONS.map((filter) => (
              <button
                key={filter.label}
                className={`font-label-lg text-label-lg px-space-md py-2 rounded-full transition-all shadow-sm ${
                  activeFilter === filter.label
                    ? 'bg-primary-container text-on-primary-fixed'
                    : 'bg-surface-container-lowest hover:bg-secondary-container text-on-surface'
                }`}
                type="button"
                onClick={() => setActiveFilter(filter.label)}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-space-xs shrink-0 pl-space-md">
            <span className="font-label-sm text-label-sm text-outline">
              Đang hiển thị 2,418 sản phẩm chọn lọc
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
