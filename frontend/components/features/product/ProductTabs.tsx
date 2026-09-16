"use client";

import React, { useState } from 'react';

export function ProductTabs() {
  const [activeTab, setActiveTab] = useState<'details' | 'stylist' | 'measurements' | 'delivery'>('details');

  return (
    <section className="w-full bg-surface-container-low py-space-xl">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin lg:px-margin-lg">
        <div className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-[0_8px_30px_-6px_rgba(36,30,26,0.04)]">
          
          {/* Tab Navigation Header */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-4 border-b-0 scrollbar-none">
            {[
              { id: 'details', label: 'Chi tiết sản phẩm & Chất liệu' },
              { id: 'stylist', label: 'Ghi chú từ Stylist' },
              { id: 'measurements', label: 'Số đo & Bảng size' },
              { id: 'delivery', label: 'Giao hàng & Đóng gói' },
            ].map(tab => (
              <button
                key={tab.id}
                className={`px-5 py-2.5 rounded-full font-label-md text-label-md transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'font-semibold bg-primary-container text-on-primary-container' 
                    : 'font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
                onClick={() => setActiveTab(tab.id as 'details' | 'stylist' | 'measurements' | 'delivery')}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Body Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter-lg pt-space-lg">
            <div className="md:col-span-7 space-y-space-md">
              <h3 className="font-headline-md text-headline-md text-on-surface">
                Nghệ Thuật Cắt May
              </h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Được chế tác thủ công bởi Aura Studio, chiếc đầm dạ hội dài này nổi bật với thiết kế cổ yếm bắt chéo mang đậm tính kiến trúc. Tôn trọn vòng eo tự nhiên trước khi thả buông mềm mại xuống gót chân. Cắt chéo vải (bias cut) từ lụa tơ tằm Mulberry 22-momme thượng hạng, đảm bảo hoàn toàn không xuyên thấu mà vẫn giữ được độ rủ sóng nước tuyệt đẹp.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 p-3 rounded-DEFAULT bg-surface-container-low">
                  <span className="material-symbols-outlined text-[20px] text-primary mt-0.5">check_circle</span>
                  <div>
                    <span className="font-label-md text-label-md font-semibold text-on-surface block">100% Lụa Mulberry</span>
                    <span className="font-body-sm text-[12px] text-on-surface-variant">Satin nặng 22-momme</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-DEFAULT bg-surface-container-low">
                  <span className="material-symbols-outlined text-[20px] text-primary mt-0.5">check_circle</span>
                  <div>
                    <span className="font-label-md text-label-md font-semibold text-on-surface block">Cổ Yếm Đan Chéo</span>
                    <span className="font-body-sm text-[12px] text-on-surface-variant">Chi tiết vặn xoắn ở cổ</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-DEFAULT bg-surface-container-low">
                  <span className="material-symbols-outlined text-[20px] text-primary mt-0.5">check_circle</span>
                  <div>
                    <span className="font-label-md text-label-md font-semibold text-on-surface block">Khóa Kéo Ẩn Hông</span>
                    <span className="font-body-sm text-[12px] text-on-surface-variant">Khóa YKK tàng hình</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-DEFAULT bg-surface-container-low">
                  <span className="material-symbols-outlined text-[20px] text-primary mt-0.5">check_circle</span>
                  <div>
                    <span className="font-label-md text-label-md font-semibold text-on-surface block">Đề Xuất Nội Y</span>
                    <span className="font-body-sm text-[12px] text-on-surface-variant">Áo lót dán hoặc mút ngực</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-5 flex flex-col justify-between p-space-lg rounded-xl bg-surface-container-low">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-tertiary">stylus</span>
                  <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold">
                    Ghi Chú Từ Stylist
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant italic leading-relaxed">
                  "Stylist trưởng của chúng tôi khuyên bạn nên kết hợp chiếc đầm lụa màu champagne này với khuyên tai dáng dài kiến trúc ánh vàng, giày cao gót quai mảnh màu nude hoặc ánh kim, cùng một chiếc clutch phom cứng màu trắng ngà để tôn lên sự sang trọng của trang phục."
                </p>
              </div>
              <div className="pt-4 flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAV_HLMb_a2RBS7uOnE7chAizCxOuu9Vb8ovq95PDXhl-KjZlXWvNWlQP5MlX1gbSXiU0NC7wBjpRDjWEADENjClb3-SPt89fgX1EGi_o0N5krhrVLcFnB-OXy1yrbztCRUteCmZNuEojWR25Nd4ocQU5AsNqJ6Tcx17x7hopGK1bQZX0shoAEQzrjKvnCn3CIqYKab5soYu6rusTvSnbLuPPwJo-kHn1lIi2TaXXdIWdF3HoLm4285Hg"
                  alt="Stylist"
                />
                <div>
                  <span className="font-label-sm text-label-sm font-semibold text-on-surface block">Helena Vance</span>
                  <span className="font-body-sm text-[12px] text-on-surface-variant">Trưởng bộ phận Phối Đồ, Rent-ish</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
