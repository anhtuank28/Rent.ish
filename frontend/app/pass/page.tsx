"use client";

import React from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

const PLANS = [
  {
    id: 'starter',
    name: 'Rent-ish Flex',
    price: '990.000đ',
    period: '/ tháng',
    description: 'Dành cho nàng yêu thích đổi mới phong cách hàng tháng với chi phí tối ưu nhất.',
    features: [
      'Thuê tối đa 2 trang phục cao cấp / tháng',
      'Thời gian giữ đồ: 4 ngày / lần thuê',
      'Miễn phí 1 size dự phòng kèm theo',
      'Miễn phí giặt ủi & bảo hiểm hư tổn cơ bản',
      'Giao hàng tiêu chuẩn miễn phí'
    ],
    highlighted: false,
    cta: 'Chọn Gói Flex'
  },
  {
    id: 'premium',
    name: 'Wardrobe Unlimited',
    price: '2.490.000đ',
    period: '/ tháng',
    description: 'Tủ đồ không đáy dành cho quý cô bận rộn với lịch tiệc tùng và sự kiện liên tục.',
    features: [
      'Thuê không giới hạn (tối đa 4 đồ cùng lúc)',
      'Thời gian giữ đồ linh hoạt theo nhu cầu',
      'Miễn phí đổi đồ liên tục trong tháng',
      'Bảo hiểm toàn diện (rách, xước, vết bẩn)',
      'Ưu tiên đặt trước trang phục độc quyền',
      'Giao nhanh nội thành 2 giờ'
    ],
    highlighted: true,
    badge: 'Phổ Biến Nhất',
    cta: 'Trải Nghiệm Unlimited'
  },
  {
    id: 'vip',
    name: 'Black Label VIP',
    price: '4.990.000đ',
    period: '/ tháng',
    description: 'Dịch vụ Stylist cá nhân riêng biệt cùng quyền truy cập vào bộ sưu tập Haute Couture.',
    features: [
      'Toàn quyền mượn đầm dạ hội Haute Couture',
      'Stylist cá nhân tư vấn 1-1 trước mỗi sự kiện',
      'Fitting tận nơi và chỉnh sửa số đo miễn phí',
      'Tặng kèm trang sức & phụ kiện cao cấp',
      'Đội ngũ phục vụ VIP riêng biệt 24/7'
    ],
    highlighted: false,
    cta: 'Liên Hệ Concierge'
  }
];

export default function PassPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-28 pb-space-xl">
        <div className="max-w-7xl mx-auto px-margin sm:px-margin-lg">
          
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-space-xl space-y-4">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
              Rent-ish Wardrobe Pass
            </span>
            <h1 className="font-display text-display tracking-tight text-on-surface font-semibold">
              Sở Hữu Tủ Đồ Triệu Đô Chỉ Từ Vài Trăm Ngàn
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Tạm biệt nỗi lo &quot;không có gì để mặc&quot;. Với gói hội viên Rent-ish, bạn thỏa sức biến hóa phong cách mỗi tuần mà không cần mua sắm lãng phí.
            </p>
          </div>

          {/* Pricing Plans */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter-lg items-stretch mb-space-xl">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-space-lg flex flex-col justify-between transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-surface-container-lowest border-2 border-primary shadow-[0_16px_48px_-8px_rgba(36,30,26,0.16)] scale-105 z-10'
                    : 'bg-surface-container-lowest/80 border border-surface-container shadow-sm hover:shadow-md'
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-on-primary font-label-sm text-xs uppercase tracking-wider font-bold px-4 py-1 rounded-full shadow-md">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <h2 className="font-headline-md text-headline-md font-bold text-on-surface mb-2">
                    {plan.name}
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 min-h-[40px]">
                    {plan.description}
                  </p>

                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-surface-container">
                    <span className="font-display text-4xl font-bold text-on-surface">
                      {plan.price}
                    </span>
                    <span className="font-body-sm text-on-surface-variant font-medium">
                      {plan.period}
                    </span>
                  </div>

                  {/* Feature list */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm font-label-md text-on-surface">
                        <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/dresses"
                  className={`w-full py-3.5 rounded-full font-label-md text-label-md font-bold text-center transition-all ${
                    plan.highlighted
                      ? 'bg-primary text-on-primary hover:bg-tertiary shadow-md hover:shadow-lg'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-surface-container-lowest rounded-3xl p-space-lg border border-surface-container">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-3xl text-primary p-3 rounded-2xl bg-primary-container/40">
                autorenew
              </span>
              <div>
                <h3 className="font-headline-sm text-base font-bold text-on-surface">Đổi đồ không giới hạn</h3>
                <p className="font-body-sm text-xs text-on-surface-variant">Thử nghiệm các phong cách mới mà không lo chật tủ đồ.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-3xl text-primary p-3 rounded-2xl bg-primary-container/40">
                dry_cleaning
              </span>
              <div>
                <h3 className="font-headline-sm text-base font-bold text-on-surface">Không cần giặt ủi</h3>
                <p className="font-body-sm text-xs text-on-surface-variant">Mặc xong gửi lại túi đóng sẵn, Rent-ish lo toàn bộ khâu làm sạch.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-3xl text-primary p-3 rounded-2xl bg-primary-container/40">
                eco
              </span>
              <div>
                <h3 className="font-headline-sm text-base font-bold text-on-surface">Thời trang bền vững</h3>
                <p className="font-body-sm text-xs text-on-surface-variant">Giảm 80% lượng khí thải carbon so với việc mua sắm trang phục mới.</p>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
