import React from 'react';

/* ─── Types ─── */

interface Step {
  id: string;
  stepLabel: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  footerIcon: string;
  footerText: string;
}

/* ─── Static Data ─── */

const STEPS: Step[] = [
  {
    id: 'pick',
    stepLabel: 'Bước 01',
    icon: 'touch_app',
    iconBg: 'bg-primary-container',
    iconColor: 'text-on-primary-fixed',
    title: '1. Chọn trang phục',
    description: 'Duyệt qua hàng nghìn mẫu váy, đầm dạ hội và đồ dạo phố bắt kịp xu hướng. Thêm một size dự phòng hoàn toàn miễn phí để đảm bảo độ vừa vặn hoàn hảo.',
    footerIcon: 'verified',
    footerText: 'Đã bao gồm size dự phòng miễn phí',
  },
  {
    id: 'flaunt',
    stepLabel: 'Bước 02',
    icon: 'celebration',
    iconBg: 'bg-tertiary-container',
    iconColor: 'text-on-tertiary-container',
    title: '2. Tỏa sáng',
    description: "Tự tin diện đồ tại lễ cưới, tiệc cocktail, buổi hẹn cuối tuần hay chuyến du lịch. Chụp hình, lưu giữ khoảnh khắc mà không lo về giá.",
    footerIcon: 'shield',
    footerText: 'Bảo hiểm các vết bẩn vô ý',
  },
  {
    id: 'return',
    stepLabel: 'Bước 03',
    icon: 'assignment_return',
    iconBg: 'bg-secondary-container',
    iconColor: 'text-tertiary',
    title: '3. Hoàn trả dễ dàng',
    description: 'Bỏ đồ vào túi hoàn trả đã được thanh toán trước phí ship. Chúng tôi sẽ lo 100% chi phí giặt sấy thân thiện với môi trường.',
    footerIcon: 'eco',
    footerText: 'Không cần mang ra tiệm giặt',
  },
];

/* ─── Sub-Components ─── */

function StepCard({ step }: { step: Step }) {
  return (
    <div className="relative bg-surface-container-lowest p-space-xl rounded-xl shadow-[0_8px_24px_-4px_rgba(36,30,26,0.05)] hover:shadow-md transition-shadow flex flex-col">
      <div className={`w-14 h-14 rounded-full ${step.iconBg} flex items-center justify-center ${step.iconColor} mb-space-lg shadow-sm`}>
        <span className="material-symbols-outlined text-headline-md">{step.icon}</span>
      </div>
      <span className="font-label-sm text-label-sm text-tertiary font-bold tracking-wider uppercase mb-1">
        {step.stepLabel}
      </span>
      <h3 className="font-headline-md text-headline-md text-on-surface font-semibold mb-space-sm">
        {step.title}
      </h3>
      <p className="font-body-md text-body-md text-on-surface-variant">
        {step.description}
      </p>
      <div className="mt-space-lg pt-space-md border-t border-surface-container flex items-center gap-space-xs text-tertiary font-label-sm text-label-sm">
        <span className="material-symbols-outlined text-body-sm">{step.footerIcon}</span>
        <span>{step.footerText}</span>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */

export function HowItWorks() {
  return (
    <section className="w-full py-space-xl bg-surface-container-low/50" id="how-it-works">
      <div className="max-w-7xl mx-auto px-margin sm:px-margin-lg">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-space-xl">
          <span className="font-label-md text-label-md text-primary font-semibold uppercase tracking-widest block mb-2">
            Đơn Giản Tối Đa
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
            Cách Thức Hoạt Động Của Rent-ish
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Thời trang cao cấp được giao tận cửa nhà bạn. Trải nghiệm cảm giác chưa từng phải mặc lại một bộ đồ lần thứ hai thật dễ dàng.
          </p>
        </div>

        {/* Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {STEPS.map((step) => (
            <StepCard key={step.id} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}
