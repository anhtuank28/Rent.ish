import React from 'react';
import Link from 'next/link';

/* ─── Static Data ─── */

const HERO_STATS = [
  { value: '15k+', icon: 'star', label: 'Lượt thuê 5 sao', iconColor: 'text-tertiary', valueColor: 'text-primary' },
  { value: '', icon: 'checkroom', label: 'Miễn phí size dự phòng', iconColor: 'text-primary', valueColor: '' },
  { value: '', icon: 'dry_cleaning', label: 'Miễn phí giặt ủi', iconColor: 'text-primary', valueColor: '' },
];

/* ─── Sub-Components ─── */

function HeroStatItem({ stat }: { stat: typeof HERO_STATS[number] }) {
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center gap-space-xs text-on-surface font-headline-sm text-headline-sm font-semibold">
        {stat.value && <span className={stat.valueColor}>{stat.value}</span>}
        <span className={`material-symbols-outlined text-headline-sm ${stat.iconColor}`}>
          {stat.icon}
        </span>
      </div>
      <span className="font-label-sm text-label-sm text-on-surface-variant">
        {stat.label}
      </span>
    </div>
  );
}

function HeroSocialProof() {
  return (
    <div className="absolute top-1 sm:top-2 -left-3 sm:-left-6 lg:-left-8 z-20 bg-surface-container-lowest/90 backdrop-blur-xl p-3 sm:px-4 sm:py-3 rounded-2xl border border-white/70 shadow-[0_16px_36px_-6px_rgba(36,30,26,0.12)] flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_-6px_rgba(36,30,26,0.18)] cursor-default">
      {/* Live pulse dot + Avatars */}
      <div className="relative flex items-center">
        <div className="flex -space-x-2.5">
          <img
            alt="Khách thuê Mai Anh"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-surface-container-lowest shadow-sm"
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
          />
          <img
            alt="Khách thuê Lan Hương"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-surface-container-lowest shadow-sm"
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face"
          />
          <div className="w-8 h-8 rounded-full bg-primary-container text-primary flex items-center justify-center text-[10px] font-bold ring-2 ring-surface-container-lowest shadow-sm">
            +48
          </div>
        </div>

        {/* Live realtime booking dot */}
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-1.5 ring-white"></span>
        </span>
      </div>

      {/* Thông tin đặt lịch & trạng thái */}
      <div className="text-left pr-1">
        <div className="flex items-center gap-1.5">
          <span className="font-label-sm text-label-sm text-on-surface font-bold tracking-tight">
            35+ lượt thuê tháng này
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-medium text-tertiary mt-0.5">
          <span className="material-symbols-outlined text-[13px] text-primary">event_available</span>
          <span>Lịch trống tiếp: <strong className="text-on-surface font-semibold">Thứ Sáu</strong></span>
        </div>
      </div>
    </div>
  );
}

function HeroTrendingCard() {
  return (
    <div className="absolute -bottom-6 -right-2 sm:right-6 bg-surface-container-lowest p-space-md rounded-lg shadow-[0_16px_36px_-6px_rgba(36,30,26,0.14)] max-w-[260px] transition-transform hover:-translate-y-1">
      <div className="flex items-center justify-between gap-space-sm mb-1">
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">
          Đang thịnh hành
        </span>
        <span className="flex items-center text-tertiary text-label-sm font-semibold">
          <span className="material-symbols-outlined text-label-md">star</span>
          4.9 (84)
        </span>
      </div>
      <div className="font-headline-sm text-headline-sm font-semibold text-on-surface leading-tight">
        Váy Midi Cổ Đổ Lụa Bóng
      </div>
      <div className="flex items-baseline gap-space-xs mt-space-xs">
        <span className="font-label-lg text-label-lg text-primary font-bold">350K</span>
        <span className="font-body-sm text-body-sm text-on-surface-variant">/ 4 ngày</span>
        <span className="font-body-sm text-body-sm text-outline line-through ml-1">3.6tr giá gốc</span>
      </div>
      <div className="mt-space-xs flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
        <span className="material-symbols-outlined text-label-md text-primary">local_shipping</span>
        <span>Cam kết giao trước 2 ngày</span>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */

export function HeroSection() {
  return (
    <section className="w-full relative overflow-hidden pt-4 sm:pt-6 pb-space-xl">
      {/* Background blobs */}
      <div className="absolute top-12 left-1/4 w-96 h-96 rounded-full bg-primary-container/25 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-48 right-10 w-[28rem] h-[28rem] rounded-full bg-tertiary-container/20 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-margin sm:px-margin-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">

          {/* Left Column — Copy */}
          <div className="lg:col-span-6 flex flex-col items-start pt-space-md lg:pt-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-space-xs bg-surface-container-low px-space-md py-space-xs rounded-full shadow-sm mb-space-md">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                Bộ sưu tập Xuân Hè vừa ra mắt
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-display text-display text-on-surface font-semibold tracking-tight leading-tight max-w-xl">
              Curate Your Endless Wardrobe, The{' '}
              <span className="text-primary italic font-serif font-normal">Rent-ish</span> Way
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-md max-w-lg">
              Kho đồ hiệu vô tận cho những ngày cuối tuần, tiệc cưới và mọi sự kiện. 
              Diện những xu hướng mới nhất mà không lo tốn diện tích tủ đồ.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-space-md mt-space-lg w-full sm:w-auto">
              <Link
                className="inline-flex items-center justify-center gap-space-xs bg-primary-container hover:bg-tertiary-container text-on-primary-fixed font-label-lg text-label-lg px-space-xl py-3.5 rounded-full transition-all transform hover:-translate-y-0.5 shadow-[0_8px_20px_-4px_rgba(113,90,71,0.25)]"
                href="#featured-catalog"
              >
                <span>Bắt Đầu Thuê</span>
                <span className="material-symbols-outlined text-body-md">arrow_forward</span>
              </Link>
              <Link
                className="inline-flex items-center justify-center gap-space-xs bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-lg text-label-lg px-space-lg py-3.5 rounded-full transition-all shadow-sm"
                href="#how-it-works"
              >
                <span className="material-symbols-outlined text-primary text-body-md">stylus_note</span>
                <span>Làm Trắc Nghiệm Phong Cách</span>
              </Link>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-3 gap-space-md pt-space-xl mt-space-lg w-full max-w-lg bg-surface-container-low/60 rounded-lg p-space-md">
              {HERO_STATS.map((stat) => (
                <HeroStatItem key={stat.label} stat={stat} />
              ))}
            </div>
          </div>

          {/* Right Column — Hero Image */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <div className="w-full h-[32rem] sm:h-[38rem] rounded-t-[14rem] rounded-b-xl overflow-hidden shadow-[0_24px_48px_-12px_rgba(36,30,26,0.18)] bg-surface-container-high relative">
                <img
                  alt="Người mẫu mặc váy lụa trễ vai màu hồng phấn"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXIGqaTBbVzuie1zm2rW_1XAfF6TCEHSIr6xU3GsX5KNwdVm8yznCM0lDy7sFCwDdi5bWO7Dp1GHlgvXaA8i-Nn87or0oi-t5Uv-434Ozr7fqy9f-rTOA-FTdWgY5dXm5sh6dr0FA2wmQZCn-9kvzIUWsuQMLEc9lx7hRw48rtP6NA7hqFcnhnExOj2KpK8GX7QLVpcQr48P4VIA2ZQ-XdD2xDKqIEiK6ypAQUTiyXoBCVuYyFcZHUoA"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-secondary-fixed/40 via-transparent to-transparent pointer-events-none" />
              </div>

              <HeroSocialProof />
              <HeroTrendingCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
