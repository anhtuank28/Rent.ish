"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

interface FaqItem {
  category: 'booking' | 'payment' | 'shipping' | 'care';
  q: string;
  a: string;
}

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'booking' | 'payment' | 'shipping' | 'care'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    // Booking
    {
      category: 'booking',
      q: 'Quy trình thuê trang phục tại Rent-ish diễn ra như thế nào?',
      a: 'Bạn chỉ cần chọn trang phục yêu thích, chọn ngày bắt đầu nhận đồ (gói 4, 8 hoặc 16 ngày), chọn size chính và size dự phòng miễn phí. Sau khi thanh toán, trang phục sẽ được giao tận nhà vào đúng ngày bạn chọn.'
    },
    {
      category: 'booking',
      q: 'Tôi có thể thuê trước sự kiện bao nhiêu ngày?',
      a: 'Bạn có thể đặt trước từ 1 ngày cho đến tối đa 6 tháng. Để đảm bảo còn size đẹp cho những dịp cao điểm (mùa cưới, lễ Tết, dạ hội cuối năm), chúng tôi khuyên bạn nên đặt trước từ 2 - 4 tuần.'
    },
    {
      category: 'booking',
      q: 'Tôi có thể gia hạn thêm ngày thuê nếu sự kiện kéo dài không?',
      a: 'Có. Nếu trang phục chưa bị khách hàng khác đặt trong những ngày kế tiếp, bạn có thể liên hệ tổng đài 1900 6868 trước ngày trả đồ 24 giờ để gia hạn với mức phí ưu đãi 50K - 100K/ngày tùy sản phẩm.'
    },

    // Payment
    {
      category: 'payment',
      q: 'Thuê đồ tại Rent-ish có bắt buộc phải đặt cọc (giữ tiền) không?',
      a: 'KHÔNG! Rent-ish áp dụng chính sách 0Đ tiền cọc với khách hàng có tài khoản xác thực số điện thoại và địa chỉ giao hàng rõ ràng. Bạn chỉ cần thanh toán đúng tiền thuê và phí ship.'
    },
    {
      category: 'payment',
      q: 'Rent-ish hỗ trợ những phương thức thanh toán nào?',
      a: 'Chúng tôi hỗ trợ: (1) Chuyển khoản ngân hàng tự động quét mã VietQR qua PayOS (khuyên dùng, xác nhận trong 1-2s), và (2) Thanh toán tiền mặt khi nhận hàng (COD).'
    },
    {
      category: 'payment',
      q: 'Chính sách hủy đơn và hoàn tiền như thế nào?',
      a: 'Nếu bạn hủy đơn trước ngày nhận đồ từ 48 giờ trở lên: Rent-ish hoàn lại 100% tiền thuê. Nếu hủy trong vòng 24 - 48 giờ trước ngày giao: hoàn 80% dưới dạng Store Credit. Nếu đơn hàng đã được gửi cho shipper, phí thuê sẽ không được hoàn lại.'
    },

    // Shipping
    {
      category: 'shipping',
      q: 'Thời gian giao hàng mất bao lâu?',
      a: 'Tại nội thành Hà Nội và TP. Hồ Chí Minh, đơn hàng sẽ được giao đúng vào buổi sáng ngày nhận đồ (hoặc hỏa tốc 2 giờ nếu bạn cần gấp). Các tỉnh thành khác sẽ nhận trước 1 ngày thông qua dịch vụ chuyển phát nhanh hỏa tốc.'
    },
    {
      category: 'shipping',
      q: 'Quy trình trả đồ như thế nào?',
      a: 'Vào ngày trả đồ, bạn chỉ việc cho trang phục vào túi trả hàng đã dán sẵn mã vận đơn (Rent-ish gửi kèm trong hộp đồ). Shipper sẽ liên hệ và đến tận nhà bạn lấy đồ. Bạn không cần mang ra bưu cục!'
    },
    {
      category: 'shipping',
      q: 'Phí vận chuyển 2 chiều được tính như thế nào?',
      a: 'Phí ship đồng giá toàn quốc là 30.000đ cho trọn gói 2 chiều (giao đồ tận tay và nhận lại đồ tận nhà). Nếu bạn là thành viên Rent-ish Pass, toàn bộ phí ship 2 chiều là MIỄN PHÍ.'
    },

    // Care & Damage
    {
      category: 'care',
      q: 'Tôi có cần tự giặt ủi đồ trước khi trả lại không?',
      a: 'TUYỆT ĐỐI KHÔNG! Mọi chất liệu cao cấp (lụa, satin tơ, dạ tweet, ren kim tuyến) đều được Rent-ish xử lý giặt hấp Ozone sinh thái chuyên dụng. Khách hàng tự giặt có thể làm co rút form dáng hoặc lem màu.'
    },
    {
      category: 'care',
      q: 'Bảo hiểm Rent-ish Care bảo vệ những gì?',
      a: 'Gói bảo hiểm Rent-ish Care tự động chi trả toàn bộ chi phí xử lý vết bẩn do rượu vang, vết son, vết thức ăn, đứt chỉ viền, bung cúc áo hay lỗi khóa kéo. Bạn hoàn toàn không bị phạt hay đền bù với những hư hại nhỏ trong sinh hoạt bình thường.'
    },
    {
      category: 'care',
      q: 'Nếu trang phục bị rách lớn hoặc mất phụ kiện đính kèm thì sao?',
      a: 'Với các hư hỏng nặng không thể phục hồi hoặc làm mất trang phục/phụ kiện, chúng tôi sẽ phối hợp cùng bạn tính phí sửa chữa thực tế hoặc giá mua đứt ưu đãi (tối đa bằng 70% giá trị bán lẻ niêm yết của sản phẩm).'
    }
  ];

  const filteredFaqs = faqs.filter(item => {
    const matchCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch = searchTerm.trim() === '' || 
      item.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.a.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-20">
        
        {/* Header */}
        <section className="py-16 bg-surface-container-lowest border-b border-surface-container-low text-center">
          <div className="max-w-4xl mx-auto px-margin sm:px-margin-lg">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="material-symbols-outlined text-[15px]">support_agent</span>
              Trung Tâm Hỗ Trợ 24/7
            </span>
            <h1 className="font-headline-xl text-3xl sm:text-5xl font-bold text-on-surface tracking-tight leading-tight">
              Câu Hỏi Thường Gặp
            </h1>
            <p className="mt-3 text-on-surface-variant font-body-md text-sm sm:text-base max-w-xl mx-auto">
              Tìm kiếm câu trả lời nhanh chóng cho tất cả các thắc mắc về quy trình thuê, giao nhận, thanh toán và bảo quản đồ.
            </p>

            {/* Search Input */}
            <div className="mt-8 max-w-lg mx-auto relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input
                type="text"
                placeholder="Tìm kiếm câu hỏi (vd: cọc tiền, đổi size, trả đồ...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-full bg-surface-container-low border border-surface-container text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="py-12 max-w-4xl mx-auto px-margin sm:px-margin-lg">
          
          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {[
              { id: 'all', label: 'Tất cả câu hỏi', icon: 'apps' },
              { id: 'booking', label: 'Đặt thuê & Lịch hẹn', icon: 'calendar_month' },
              { id: 'payment', label: 'Thanh toán & Cọc', icon: 'payments' },
              { id: 'shipping', label: 'Giao nhận & Trả đồ', icon: 'local_shipping' },
              { id: 'care', label: 'Bảo hiểm & Giặt ủi', icon: 'dry_cleaning' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                type="button"
                className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-on-surface text-on-primary shadow-sm'
                    : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container hover:text-on-surface border border-surface-container/60'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Accordion FAQ Items */}
          <div className="space-y-3.5">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <div
                    key={idx}
                    className="bg-surface-container-lowest rounded-2xl border border-surface-container/80 overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-on-surface text-sm sm:text-base cursor-pointer hover:bg-surface-container-low/40 transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-primary text-[20px] shrink-0">help</span>
                        <span>{faq.q}</span>
                      </span>
                      <span className={`material-symbols-outlined text-outline transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-primary' : ''}`}>
                        expand_more
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-sm text-on-surface-variant leading-relaxed pl-12 border-t border-surface-container/40">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 bg-surface-container-lowest rounded-2xl p-8 border border-surface-container">
                <span className="material-symbols-outlined text-[40px] text-outline mb-2">search_off</span>
                <p className="text-sm font-semibold text-on-surface">Không tìm thấy câu hỏi phù hợp</p>
                <p className="text-xs text-on-surface-variant mt-1">Hãy thử tìm với từ khóa khác hoặc liên hệ hotline để được giải đáp ngay.</p>
              </div>
            )}
          </div>

          {/* Support Channels Card */}
          <div className="mt-14 p-8 rounded-3xl bg-surface-container-low border border-surface-container flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-on-surface text-lg">Bạn vẫn còn câu hỏi khác?</h3>
              <p className="text-xs text-on-surface-variant mt-1">
                Đội ngũ Stylist và CSKH của Rent-ish luôn túc trực hỗ trợ bạn từ 8:00 đến 22:00 mỗi ngày.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="tel:19006868"
                className="px-5 py-2.5 rounded-full bg-primary-container text-on-primary-container text-xs font-bold shadow-sm hover:shadow transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                <span>Hotline: 1900 6868</span>
              </a>
              <a
                href="mailto:concierge@rent-ish.com"
                className="px-5 py-2.5 rounded-full bg-surface-container-highest text-on-surface text-xs font-bold hover:bg-surface-container transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">mail</span>
                <span>Email CSKH</span>
              </a>
            </div>
          </div>

        </section>

      </main>
      <Footer />
    </>
  );
}
