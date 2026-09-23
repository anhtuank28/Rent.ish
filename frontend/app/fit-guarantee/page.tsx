"use client";

import React from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export default function FitGuaranteePage() {
  const guarantees = [
    {
      icon: 'checkroom',
      title: 'Tặng Kèm Size Dự Phòng Miễn Phí',
      desc: 'Mỗi đơn thuê tại Rent-ish đều được chọn kèm thêm 1 size dự phòng (Size Backup) hoàn toàn KHÔNG TÍNH PHÍ. Bạn chọn Size M, chúng tôi gửi thêm Size S hoặc L để bạn an tâm thử đồ.',
      tag: 'Tiêu chuẩn cho mọi đơn hàng'
    },
    {
      icon: 'bolt',
      title: 'Đổi Size Hỏa Tốc Trong 2 Giờ',
      desc: 'Nếu cả 2 size đều không vừa vặn như ý muốn, hãy thông báo cho đội ngũ CSKH của chúng tôi trong vòng 12 giờ kể từ khi nhận đồ. Chúng tôi sẽ điều phối size mới giao tận nơi trong 2 giờ nội thành.',
      tag: 'Nhanh chóng & tiện lợi'
    },
    {
      icon: 'savings',
      title: 'Hoàn Tiền Tín Dụng 100%',
      desc: 'Trong trường hợp kho hết size thay thế hoặc bạn không tìm được mẫu khác ưng ý, Rent-ish cam kết hoàn trả 100% phí thuê trang phục dưới dạng tiền tín dụng (Store Credit) không có hạn sử dụng.',
      tag: 'Không rủi ro'
    }
  ];

  const sizeTable = [
    { size: 'S', bust: '82 - 85 cm', waist: '62 - 66 cm', hips: '86 - 90 cm', weight: '42 - 49 kg' },
    { size: 'M', bust: '86 - 89 cm', waist: '67 - 71 cm', hips: '91 - 95 cm', weight: '50 - 55 kg' },
    { size: 'L', bust: '90 - 94 cm', waist: '72 - 76 cm', hips: '96 - 100 cm', weight: '56 - 62 kg' },
    { size: 'Freesize', bust: '82 - 96 cm', waist: '62 - 78 cm', hips: '86 - 102 cm', weight: '45 - 63 kg (Dáng suông / Co giãn)' }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-20">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 lg:py-20 bg-surface-container-lowest border-b border-surface-container-low text-center">
          <div className="max-w-7xl mx-auto px-margin sm:px-margin-lg">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-label-sm text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="material-symbols-outlined text-[15px]">verified</span>
              Rent-ish Fit Guarantee
            </span>
            <h1 className="font-headline-xl text-3xl sm:text-5xl font-bold text-on-surface tracking-tight max-w-3xl mx-auto leading-tight">
              Chính Sách Đảm Bảo Vừa Vặn 100%
            </h1>
            <p className="mt-4 text-on-surface-variant font-body-lg text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Chúng tôi hiểu rằng việc vừa vặn là yếu tố quan trọng nhất giúp bạn tự tin. Rent-ish cam kết đồng hành để bạn luôn diện trang phục vừa vặn hoàn hảo nhất.
            </p>
          </div>
        </section>

        {/* 3 Pillars */}
        <section className="py-16 max-w-7xl mx-auto px-margin sm:px-margin-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guarantees.map((g, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest p-8 rounded-3xl border border-surface-container shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-secondary-container text-tertiary flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-2xl">{g.icon}</span>
                  </div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-primary bg-primary-container/40 px-2.5 py-1 rounded-full inline-block mb-3">
                    {g.tag}
                  </span>
                  <h3 className="font-headline-md text-xl font-bold text-on-surface mb-3">
                    {g.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {g.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Size Guide Table */}
        <section className="py-12 max-w-5xl mx-auto px-margin sm:px-margin-lg">
          <div className="bg-surface-container-lowest p-8 sm:p-10 rounded-3xl border border-surface-container shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="font-headline-lg text-2xl font-bold text-on-surface">
                  Bảng Quy Chuẩn Kích Cỡ Nữ
                </h2>
                <p className="text-xs text-on-surface-variant mt-1">
                  Số đo tham khảo tiêu chuẩn cho các thiết kế đầm dạ hội và váy cưới tại Rent-ish
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-primary font-semibold">
                <span className="material-symbols-outlined text-[18px]">straighten</span>
                <span>Tư vấn stylist miễn phí: 1900 6868</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-surface-container text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Vòng Ngực (Bust)</th>
                    <th className="py-3 px-4">Vòng Eo (Waist)</th>
                    <th className="py-3 px-4">Vòng Mông (Hips)</th>
                    <th className="py-3 px-4">Cân Nặng Ước Tính</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container text-sm">
                  {sizeTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-on-surface">{row.size}</td>
                      <td className="py-3.5 px-4 text-on-surface-variant">{row.bust}</td>
                      <td className="py-3.5 px-4 text-on-surface-variant">{row.waist}</td>
                      <td className="py-3.5 px-4 text-on-surface-variant">{row.hips}</td>
                      <td className="py-3.5 px-4 font-medium text-primary">{row.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-surface-container-low text-xs text-on-surface-variant space-y-1">
              <p className="font-semibold text-on-surface">💡 Mẹo đo số đo chuẩn tại nhà:</p>
              <p>• <strong>Ngực:</strong> Đo quanh phần đầy đặn nhất của vòng 1 (kèm áo lót bạn dự định mặc cùng váy).</p>
              <p>• <strong>Eo:</strong> Đo quanh phần nhỏ nhất của eo tự nhiên (khoảng 2-3cm phía trên rốn).</p>
              <p>• <strong>Mông:</strong> Đứng thẳng 2 chân sát nhau và đo quanh phần nở nang nhất của vòng 3.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-margin sm:px-margin-lg pt-12 text-center">
          <div className="bg-surface-container-low p-10 sm:p-12 rounded-3xl border border-surface-container">
            <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface mb-3">
              Chưa Chắc Chắn Về Size Của Mình?
            </h2>
            <p className="text-on-surface-variant text-sm max-w-md mx-auto mb-6">
              Đừng lo, hãy chọn 1 size bạn thấy gần đúng nhất và kèm thêm size dự phòng miễn phí trong giỏ hàng.
            </p>
            <Link
              href="/dresses"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary-container text-on-primary-container font-bold hover:shadow-md transition-all active:scale-95"
            >
              <span>Chọn Đồ Có Size Dự Phòng Ngay</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
