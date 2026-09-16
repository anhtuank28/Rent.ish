import React from 'react';

/* ─── Types ─── */

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  initials: string;
  avatarBg: string;
  details: string;
  occasion: string;
  rating: number;
}

/* ─── Static Data ─── */

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'amanda',
    quote: "Chiếc váy lụa midi màu hồng phấn thực sự hoàn hảo cho đám cưới của cô bạn thân tại Đà Lạt. Size dự phòng giúp tôi hoàn toàn an tâm, và việc trả lại đồ chưa giặt trong túi đựng cảm giác cứ như ăn gian vậy!",
    name: 'Amanda Lê',
    initials: 'AL',
    avatarBg: 'bg-secondary-fixed text-on-secondary-fixed',
    details: 'Cao: 1m65 · Hay mặc: Size S · Size thuê: Size S',
    occasion: 'Tiệc cưới ngoài trời',
    rating: 5,
  },
  {
    id: 'sophia',
    quote: "Tôi đã thuê chiếc đầm dạ hội satin màu ngọc lục bảo của Khaite cho đêm gala cuối năm. Tôi nhận được vô số lời khen và tiết kiệm được tới 14 triệu so với mua mới. Rent-ish đã thay đổi hoàn toàn tủ đồ của tôi.",
    name: 'Sophia Châu',
    initials: 'SC',
    avatarBg: 'bg-primary-fixed text-on-primary-fixed',
    details: 'Cao: 1m70 · Hay mặc: Size M · Size thuê: Size M',
    occasion: 'Gala từ thiện Black Tie',
    rating: 5,
  },
  {
    id: 'jessica',
    quote: "Dịch vụ chăm sóc khách hàng không chê vào đâu được. Chuyến bay của tôi bị đẩy lên sớm một ngày và họ đã chuyển phát nhanh váy đến tận Phú Quốc cho tôi mà không tính thêm phí. Trở thành khách quen từ giờ!",
    name: 'Jessica Vũ',
    initials: 'JV',
    avatarBg: 'bg-secondary-container text-on-secondary-container',
    details: 'Cao: 1m58 · Hay mặc: Size XS · Size thuê: Size XS',
    occasion: 'Tiệc độc thân cuối tuần',
    rating: 5,
  },
];

/* ─── Sub-Components ─── */

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1 text-tertiary mb-space-sm">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="material-symbols-outlined text-body-md" style={{ fontVariationSettings: "'FILL' 1" }}>
          star
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_8px_24px_-4px_rgba(36,30,26,0.05)] flex flex-col justify-between">
      <div>
        <StarRating count={testimonial.rating} />
        <p className="font-body-md text-body-md text-on-surface italic">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>
      <div className="mt-space-md pt-space-md border-t border-surface-container">
        <div className="flex items-center gap-space-sm">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-label-md text-label-md font-bold ${testimonial.avatarBg}`}>
            {testimonial.initials}
          </div>
          <div>
            <div className="font-label-lg text-label-lg text-on-surface font-semibold">
              {testimonial.name}
            </div>
            <div className="font-label-sm text-label-sm text-outline">
              {testimonial.details}
            </div>
          </div>
        </div>
        <div className="mt-space-xs font-label-sm text-label-sm text-primary font-medium">
          Sự kiện: {testimonial.occasion}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */

export function Testimonials() {
  return (
    <section className="w-full py-space-xl">
      <div className="max-w-7xl mx-auto px-margin sm:px-margin-lg">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-sm">
          <div>
            <span className="font-label-md text-label-md text-primary font-semibold uppercase tracking-widest block mb-1">
              Phụ nữ thực, Vóc dáng thực
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
              Được yêu thích bởi các Rent-ish Babes
            </h2>
          </div>
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-headline-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            <span className="font-label-lg text-label-lg font-bold text-on-surface">
              4.9 / 5 Điểm trung bình
            </span>
            <span className="font-body-sm text-body-sm text-outline">
              (từ hơn 12,000+ thành viên)
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
