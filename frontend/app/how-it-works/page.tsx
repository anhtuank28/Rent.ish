"use client";

import React from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export default function HowItWorksPage() {
  const steps = [
    {
      step: '01',
      title: 'Khám Phá & Đặt Lịch Thuê',
      subtitle: 'Chọn thiết kế bạn yêu thích trong vài thao tác',
      desc: 'Lướt xem bộ sưu tập đầm dạ hội, váy cưới, áo dài và suit từ các nhà thiết kế hàng đầu. Chọn ngày bạn muốn nhận đồ (gói 4, 8 hoặc 16 ngày) và chọn size của bạn.',
      perks: [
        'Tặng kèm 1 size dự phòng MIỄN PHÍ trong mỗi đơn hàng',
        'Lịch trống cập nhật tự động thời gian thực',
        'Đặt trước tối đa đến 6 tháng cho các dịp đặc biệt'
      ],
      icon: 'calendar_month',
      badge: 'Bước 1'
    },
    {
      step: '02',
      title: 'Nhận Đồ Chuẩn Form Tận Tay',
      subtitle: 'Sẵn sàng mặc ngay mà không cần chuẩn bị',
      desc: 'Trang phục được giao tới tận cửa nhà bạn vào đúng ngày đã hẹn. Mỗi món đồ đều được giặt khô chuẩn sinh thái, khử khuẩn và là phẳng phiu trong túi bọc bảo quản cao cấp.',
      perks: [
        'Giao nhanh 2 giờ tại nội thành Hà Nội & TP. Hồ Chí Minh',
        'Hộp đóng gói tinh tế kèm móc treo & tem vận chuyển 2 chiều',
        'Hỗ trợ stylist hỗ trợ trực tuyến 24/7 nếu cần chỉnh dáng'
      ],
      icon: 'local_shipping',
      badge: 'Bước 2'
    },
    {
      step: '03',
      title: 'Tự Tin Tỏa Sáng Tại Sự Kiện',
      subtitle: 'Tận hưởng khoảnh khắc mà không chút âu lo',
      desc: 'Diện trang phục mơ ước tới tiệc cưới, dạ hội hay buổi chụp hình kỷ niệm. Bạn hoàn toàn yên tâm vì mọi đơn hàng tại Rent-ish đều đã tích hợp gói bảo hiểm hư hại nhỏ.',
      perks: [
        'Bảo hiểm vết son, vết rượu vang và xước chỉ nhẹ',
        'Không phát sinh chi phí giặt tẩy vết bẩn thông thường',
        'Chụp ảnh lung linh với trang phục thiết kế chính hãng'
      ],
      icon: 'auto_awesome',
      badge: 'Bước 3'
    },
    {
      step: '04',
      title: 'Hoàn Trả Dễ Dàng Không Cần Giặt',
      subtitle: 'Gửi lại đồ nhẹ nhàng chỉ với 1 bước đóng gói',
      desc: 'Vào ngày cuối cùng của kỳ thuê, chỉ cần cho đồ vào túi trả hàng đã dán sẵn tem vận chuyển. Shipper của chúng tôi sẽ đến tận nơi lấy đồ. Bạn tuyệt đối KHÔNG CẦN GIẶT ỦI!',
      perks: [
        'Rent-ish lo toàn bộ khâu giặt sấy chuyên sâu sau thuê',
        'Shipper đến lấy tại nhà hoặc gửi tại điểm bưu cục gần nhất',
        'Hoàn trả đúng hẹn nhận thêm điểm tích lũy thành viên VIP'
      ],
      icon: 'assignment_return',
      badge: 'Bước 4'
    }
  ];

  const faqs = [
    {
      q: 'Tôi nên đặt thuê trước sự kiện bao nhiêu ngày?',
      a: 'Chúng tôi khuyến khích bạn đặt trước từ 1 - 2 ngày trước sự kiện để có thời gian thử đồ và chọn size vừa vặn nhất. Ví dụ: Nếu sự kiện vào tối Thứ 7, hãy chọn ngày nhận đồ là Thứ 5 hoặc Thứ 6.'
    },
    {
      q: 'Nếu trang phục không vừa vặn thì sao?',
      a: 'Trong mỗi đơn hàng, Rent-ish luôn tặng kèm miễn phí 1 size dự phòng để bạn an tâm. Nếu cả 2 size đều không vừa, dịch vụ Đổi size Hỏa tốc của chúng tôi sẽ giao size mới trong vòng 2 giờ (nội thành) hoặc hoàn 100% tiền tín dụng cho bạn.'
    },
    {
      q: 'Nếu tôi làm bẩn hoặc lỡ làm rách chỉ nhẹ có bị phạt không?',
      a: 'Hoàn toàn không! Mọi đơn hàng đã bao gồm phí bảo vệ trang phục cơ bản (Rent-ish Care). Các vết bẩn rượu vang, phấn trang điểm hay xước đường may nhỏ đều được bảo hiểm 100% và chúng tôi tự xử lý bằng kỹ thuật giặt chuyên dụng.'
    },
    {
      q: 'Tôi có cần giặt sạch trang phục trước khi trả không?',
      a: 'Tuyệt đối KHÔNG. Các chất liệu cao cấp như lụa tơ tằm, voan pha lê hay dạ tơ đòi hỏi quy trình giặt khô chuyên biệt. Bạn chỉ việc gấp trang phục cho vào túi trả đồ kèm theo, đội ngũ giặt ủi của Rent-ish sẽ chăm sóc toàn diện.'
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-20">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 lg:py-24 bg-surface-container-lowest border-b border-surface-container-low">
          <div className="max-w-7xl mx-auto px-margin sm:px-margin-lg text-center relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="material-symbols-outlined text-[15px]">help</span>
              Quy Trình 4 Bước Đơn Giản
            </span>
            <h1 className="font-headline-xl text-3xl sm:text-5xl lg:text-6xl font-bold text-on-surface tracking-tight max-w-4xl mx-auto leading-tight">
              Thời Trang Thiết Kế Đỉnh Cao, <br className="hidden sm:inline" />
              <span className="text-primary">Thuê Thật Nhẹ Nhàng</span>
            </h1>
            <p className="mt-5 text-on-surface-variant font-body-lg text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Trải nghiệm tủ đồ không đáy với hàng trăm mẫu đầm dạ hội, váy cưới và suit sang trọng. Không lo chi phí mua sắm, không cần bận tâm giặt ủi.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/dresses"
                className="px-8 py-3.5 rounded-full bg-primary-container hover:bg-tertiary-container text-on-primary-container font-semibold transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2"
              >
                <span>Khám Phá Trang Phục Ngay</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
              <Link
                href="/fit-guarantee"
                className="px-7 py-3.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold transition-all"
              >
                Chính Sách Vừa Vặn 100%
              </Link>
            </div>
          </div>
        </section>

        {/* 4 Steps Showcase */}
        <section className="py-16 lg:py-24 max-w-7xl mx-auto px-margin sm:px-margin-lg">
          <div className="text-center mb-16">
            <span className="font-label-md text-xs uppercase tracking-widest text-primary font-bold">
              Trải nghiệm chuẩn 5 sao
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-4xl font-bold text-on-surface mt-2">
              Cách Thức Hoạt Động
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest p-8 rounded-3xl border border-surface-container/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all flex flex-col justify-between relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-15 transition-opacity font-headline-xl text-7xl font-black text-primary select-none">
                  {s.step}
                </div>

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center mb-6 shadow-sm">
                    <span className="material-symbols-outlined text-2xl">{s.icon}</span>
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-container/40 px-2.5 py-1 rounded-full inline-block mb-3">
                    {s.badge}
                  </span>
                  
                  <h3 className="font-headline-md text-xl sm:text-2xl font-bold text-on-surface mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm font-medium text-tertiary mb-3">
                    {s.subtitle}
                  </p>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-surface-container/60 space-y-2.5">
                  {s.perks.map((perk, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs text-on-surface">
                      <span className="material-symbols-outlined text-emerald-600 text-[16px] shrink-0 mt-0.5">check_circle</span>
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Value Proposition Strip */}
        <section className="bg-surface-container-low py-16 my-8">
          <div className="max-w-7xl mx-auto px-margin sm:px-margin-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-tertiary text-2xl">checkroom</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface text-base">Tặng Kèm Size Dự Phòng</h4>
                  <p className="text-xs text-on-surface-variant mt-1">Luôn có 2 size trang phục để bạn thử và chọn size ưng ý nhất.</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-tertiary text-2xl">dry_cleaning</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface text-base">Miễn Phí Giặt Hấp Sinh Thái</h4>
                  <p className="text-xs text-on-surface-variant mt-1">Giặt hấp công nghệ Ozone khử khuẩn 99.9% sau mỗi lượt thuê.</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-tertiary text-2xl">swap_horizontal_circle</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface text-base">Giao Nhận Tận Nơi 2 Chiều</h4>
                  <p className="text-xs text-on-surface-variant mt-1">Giao tận tay, nhận lại tận nhà mà bạn không cần phải di chuyển.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mini FAQ */}
        <section className="py-16 max-w-4xl mx-auto px-margin sm:px-margin-lg">
          <div className="text-center mb-12">
            <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface">
              Câu Hỏi Thường Gặp Về Thuê Đồ
            </h2>
            <p className="text-sm text-on-surface-variant mt-2">
              Những điều khách hàng thường quan tâm khi lần đầu trải nghiệm Rent-ish
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((f, idx) => (
              <div key={idx} className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container/60 shadow-sm">
                <h3 className="font-semibold text-on-surface text-base flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">help_outline</span>
                  {f.q}
                </h3>
                <p className="text-sm text-on-surface-variant mt-2 pl-7 leading-relaxed">
                  {f.a}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/faq" className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
              <span>Xem toàn bộ trung tâm giải đáp & câu hỏi thường gặp</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-margin sm:px-margin-lg pt-10">
          <div className="bg-gradient-to-r from-surface-container-high to-surface-container-lowest p-10 sm:p-16 rounded-3xl border border-surface-container text-center relative overflow-hidden shadow-sm">
            <h2 className="font-headline-xl text-3xl sm:text-4xl font-bold text-on-surface mb-4">
              Sẵn Sàng Tỏa Sáng Trong Sự Kiện Sắp Tới?
            </h2>
            <p className="text-on-surface-variant max-w-xl mx-auto mb-8 text-sm sm:text-base">
              Hàng trăm thiết kế dạ hội, váy cưới và trang phục lễ hội cao cấp đang sẵn sàng chờ bạn trải nghiệm.
            </p>
            <Link
              href="/dresses"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary-container text-on-primary-container font-bold shadow-md hover:shadow-lg transition-transform active:scale-95"
            >
              <span>Xem Toàn Bộ Trang Phục</span>
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
