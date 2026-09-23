"use client";

import React from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export default function PrivacyPage() {
  const sections = [
    {
      id: 'collection',
      title: '1. Thông Tin Chúng Tôi Thu Thập',
      icon: 'contact_page',
      content: [
        {
          sub: 'Thông tin tài khoản & định danh',
          desc: 'Khi bạn đăng ký tài khoản hoặc đặt thuê tại Rent-ish, chúng tôi thu thập họ và tên, địa chỉ email, số điện thoại, và mật khẩu được mã hóa một chiều (Bcrypt).'
        },
        {
          sub: 'Thông tin giao nhận & địa chỉ',
          desc: 'Địa chỉ nhà riêng, cơ quan, số điện thoại liên hệ nhận hàng và ghi chú giao đồ để điều phối shipper giao nhận 2 chiều chính xác.'
        },
        {
          sub: 'Dữ liệu số đo & hồ sơ kích cỡ',
          desc: 'Để đảm bảo dịch vụ "Vừa Vặn 100%", bạn có thể tự nguyện cung cấp chiều cao, cân nặng và số đo 3 vòng. Thông tin này chỉ dùng cho mục đích tư vấn size và chuẩn bị trang phục dự phòng phù hợp nhất.'
        },
        {
          sub: 'Thông tin giao dịch & thanh toán',
          desc: 'Mọi giao dịch thanh toán trực tuyến qua VietQR, thẻ nội địa hoặc quốc tế đều được xử lý trực tiếp qua Cổng thanh toán đối tác (PayOS/Napas) đạt chuẩn an ninh PCI-DSS. Rent-ish tuyệt đối KHÔNG lưu trữ số tài khoản hay mật mã ngân hàng của bạn trên hệ thống.'
        }
      ]
    },
    {
      id: 'purpose',
      title: '2. Mục Đích Sử Dụng Thông Tin',
      icon: 'manage_search',
      content: [
        {
          sub: 'Xử lý đơn thuê & Vận hành dịch vụ',
          desc: 'Xác nhận đơn đặt thuê, giữ lịch trang phục, đóng gói size chính & size dự phòng, và sắp xếp shipper giao nhận tận nơi theo khung giờ bạn chọn.'
        },
        {
          sub: 'Hỗ trợ khách hàng & Đổi size hỏa tốc',
          desc: 'Phục vụ khi bạn cần đổi size trong vòng 2 giờ, giải đáp thắc mắc về chất liệu, hoặc hướng dẫn mặc và bảo quản trang phục.'
        },
        {
          sub: 'Nâng cao trải nghiệm cá nhân hóa',
          desc: 'Lưu lại danh sách yêu thích (Wishlist) và gợi ý các mẫu thiết kế mới phù hợp với gu thẩm mỹ và kích thước của bạn.'
        },
        {
          sub: 'Bảo vệ an toàn & Ngăn chặn gian lận',
          desc: 'Xác thực tài khoản và phòng ngừa rủi ro gian lận hoặc thất thoát tài sản trang phục cao cấp.'
        }
      ]
    },
    {
      id: 'security',
      title: '3. Tiêu Chuẩn Bảo Mật Dữ Liệu Của Rent-ish',
      icon: 'security',
      content: [
        {
          sub: 'Mã hóa đường truyền SSL 256-bit',
          desc: 'Toàn bộ dữ liệu trao đổi giữa thiết bị của bạn và hệ thống Rent-ish được mã hóa bằng chuẩn HTTPS/TLS 256-bit cao cấp nhất.'
        },
        {
          sub: 'Bảo mật chuẩn PCI-DSS Level 1',
          desc: 'Hệ thống thanh toán tuân thủ nghiêm ngặt tiêu chuẩn bảo mật dữ liệu thẻ thanh toán toàn cầu (Payment Card Industry Data Security Standard).'
        },
        {
          sub: 'Quy trình nội bộ nghiêm ngặt',
          desc: 'Chỉ những nhân sự được phân quyền cụ thể (bộ phận vận đơn, chuyên viên hỗ trợ trực tiếp) mới được truy cập thông tin giao hàng trong thời gian xử lý đơn.'
        }
      ]
    },
    {
      id: 'sharing',
      title: '4. Chia Sẻ Thông Tin Với Bên Thứ Ba',
      icon: 'share_off',
      content: [
        {
          sub: 'Cam kết KHÔNG bán dữ liệu',
          desc: 'Rent-ish cam kết KHÔNG bao giờ bán, cho thuê hoặc thương mại hóa thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào vì mục đích quảng cáo độc lập.'
        },
        {
          sub: 'Đối tác vận chuyển',
          desc: 'Chúng tôi chỉ cung cấp họ tên, số điện thoại và địa chỉ giao hàng cho các đơn vị vận chuyển đối tác để thực hiện công tác giao nhận trang phục.'
        },
        {
          sub: 'Cơ quan có thẩm quyền',
          desc: 'Chúng tôi chỉ cung cấp thông tin khi có yêu cầu bằng văn bản hợp pháp từ cơ quan pháp luật theo quy định của pháp luật hiện hành.'
        }
      ]
    },
    {
      id: 'user-rights',
      title: '5. Quyền Lợi Của Khách Hàng',
      icon: 'verified_user',
      content: [
        {
          sub: 'Quyền tra cứu và chỉnh sửa',
          desc: 'Bạn có quyền đăng nhập vào tài khoản cá nhân để xem lại, cập nhật hoặc sửa đổi các thông tin cá nhân bất cứ lúc nào.'
        },
        {
          sub: 'Quyền xóa dữ liệu',
          desc: 'Bạn có quyền gửi yêu cầu tới bộ phận CSKH để xóa vĩnh viễn tài khoản và toàn bộ lịch sử thông tin liên quan khi không còn nhu cầu sử dụng dịch vụ.'
        },
        {
          sub: 'Quyền từ chối tiếp thị',
          desc: 'Bạn có thể hủy đăng ký nhận bản tin khuyến mãi hoặc thông báo xu hướng thời trang bằng cách bấm nút "Unsubscribe" ở cuối mỗi email.'
        }
      ]
    },
    {
      id: 'cookies',
      title: '6. Chính Sách Cookie & Lưu Trữ Phiên',
      icon: 'cookie',
      content: [
        {
          sub: 'Cookie cần thiết cho hệ thống',
          desc: 'Được dùng để duy trì trạng thái đăng nhập an toàn (httpOnly JWT cookie) và đồng bộ giỏ hàng, danh sách yêu thích của bạn.'
        },
        {
          sub: 'Quản lý Cookie trên trình duyệt',
          desc: 'Bạn hoàn toàn có thể tùy chỉnh cài đặt trên trình duyệt của mình để từ chối lưu cookie, tuy nhiên điều này có thể làm ảnh hưởng đến một số tính năng ghi nhớ giỏ hàng tự động.'
        }
      ]
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-20">
        
        {/* Header / Hero */}
        <section className="relative overflow-hidden py-16 lg:py-20 bg-surface-container-lowest border-b border-surface-container-low text-center">
          <div className="max-w-4xl mx-auto px-margin sm:px-margin-lg">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="material-symbols-outlined text-[15px]">lock</span>
              Chính Sách & Bảo Mật
            </span>
            <h1 className="font-headline-xl text-3xl sm:text-5xl font-bold text-on-surface tracking-tight leading-tight">
              Chính Sách Bảo Mật Thông Tin
            </h1>
            <p className="mt-4 text-on-surface-variant font-body-lg text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Sự tin tưởng và riêng tư của bạn là ưu tiên hàng đầu tại Rent-ish. Chúng tôi cam kết bảo vệ dữ liệu cá nhân theo các tiêu chuẩn quốc tế nghiêm ngặt nhất.
            </p>
            <div className="mt-4 text-xs text-outline">
              Cập nhật lần cuối: Ngày 15 tháng 09 năm 2026 • Phiên bản 2.4
            </div>
          </div>
        </section>

        {/* Content Body */}
        <section className="py-16 max-w-5xl mx-auto px-margin sm:px-margin-lg">
          <div className="space-y-12">
            {sections.map((sec) => (
              <div
                key={sec.id}
                id={sec.id}
                className="bg-surface-container-lowest p-8 sm:p-10 rounded-3xl border border-surface-container/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] scroll-mt-28"
              >
                <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-surface-container">
                  <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-2xl">{sec.icon}</span>
                  </div>
                  <h2 className="font-headline-md text-xl sm:text-2xl font-bold text-on-surface">
                    {sec.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {sec.content.map((item, iIdx) => (
                    <div key={iIdx} className="bg-surface-container-low/40 p-5 rounded-2xl border border-surface-container/50">
                      <h3 className="font-semibold text-on-surface text-sm sm:text-base mb-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                        {item.sub}
                      </h3>
                      <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Support Box */}
          <div className="mt-16 bg-surface-container-low p-8 sm:p-10 rounded-3xl border border-surface-container text-center max-w-2xl mx-auto">
            <span className="material-symbols-outlined text-3xl text-primary mb-3 inline-block">
              contact_support
            </span>
            <h3 className="font-headline-md text-xl font-bold text-on-surface mb-2">
              Bạn Có Thắc Mắc Về Dữ Liệu Của Mình?
            </h3>
            <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
              Bộ phận Bảo vệ Dữ liệu (DPO) của Rent-ish luôn sẵn sàng hỗ trợ giải đáp mọi thắc mắc hoặc xử lý yêu cầu trích xuất / xóa thông tin của bạn.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
              <a
                href="mailto:privacy@rent-ish.com"
                className="px-6 py-3 rounded-full bg-surface-container-lowest border border-outline-variant hover:border-primary text-on-surface transition-colors flex items-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">email</span>
                <span>privacy@rent-ish.com</span>
              </a>
              <Link
                href="/faq"
                className="px-6 py-3 rounded-full bg-primary-container text-on-primary-container hover:bg-tertiary-container transition-colors flex items-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">help</span>
                <span>Trung Tâm Trợ Giúp</span>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
