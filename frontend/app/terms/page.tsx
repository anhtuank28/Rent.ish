"use client";

import React from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export default function TermsPage() {
  const sections = [
    {
      id: 'general',
      title: '1. Định Nghĩa & Phạm Vi Áp Dụng',
      icon: 'gavel',
      items: [
        {
          heading: 'Thỏa thuận dịch vụ',
          body: 'Bằng việc truy cập, đăng ký tài khoản hoặc đặt thuê bất kỳ sản phẩm nào trên nền tảng Rent-ish, bạn xác nhận đã đọc, hiểu rõ và đồng ý tuân thủ toàn bộ các điều khoản và quy định dưới đây.'
        },
        {
          heading: 'Kỳ hạn thuê tiêu chuẩn',
          body: 'Thời hạn thuê tiêu chuẩn là 4 ngày, bắt đầu từ ngày bạn nhận được trang phục (Ngày 1) và kết thúc khi bạn bàn giao lại trang phục cho nhân viên giao nhận (Ngày 4). Bạn có thể lựa chọn gói thuê dài hạn 8 ngày hoặc 16 ngày khi đặt đơn.'
        },
        {
          heading: 'Tài sản cho thuê',
          body: 'Bao gồm trang phục chính, sản phẩm size dự phòng miễn phí (nếu có chọn), móc treo chuyên dụng, bao bọc chống bụi và túi trả hàng Re-Pack. Toàn bộ các vật phẩm này thuộc quyền sở hữu của Rent-ish và các đối tác thiết kế.'
        }
      ]
    },
    {
      id: 'booking-payment',
      title: '2. Quy Trình Đặt Thuê & Thanh Toán',
      icon: 'receipt',
      items: [
        {
          heading: 'Xác nhận lịch thuê thời gian thực',
          body: 'Hệ thống của Rent-ish ứng dụng thuật toán kiểm tra lịch trống tự động nhằm ngăn chặn tình trạng trùng lịch (double-booking). Đơn hàng chỉ được xác nhận chính thức khi bạn hoàn tất bước thanh toán trực tuyến.'
        },
        {
          heading: 'Hình thức thanh toán & Đặt cọc',
          body: 'Chúng tôi hỗ trợ chuyển khoản ngân hàng qua mã VietQR tự động, thẻ thanh toán nội địa và quốc tế. Rent-ish áp dụng chính sách KHÔNG YÊU CẦU ĐẶT CỌC TIỀN MẶT đối với khách hàng đã xác thực danh tính điện tử qua số điện thoại/email.'
        },
        {
          heading: 'Chính sách Size dự phòng',
          body: 'Để đảm bảo bạn vừa vặn, Rent-ish tặng kèm 1 size dự phòng không tính phí thuê. Sản phẩm size dự phòng được gắn tem niêm phong riêng biệt. Nếu bạn không sử dụng đến size dự phòng, vui lòng giữ nguyên tem niêm phong khi hoàn trả.'
        }
      ]
    },
    {
      id: 'cancellation',
      title: '3. Chính Sách Hủy Đơn & Đổi Lịch Thuê',
      icon: 'event_busy',
      items: [
        {
          heading: 'Hủy trước 48 giờ',
          body: 'Nếu bạn cần hủy đơn trước 48 giờ tính từ ngày nhận đồ dự kiến, Rent-ish sẽ hoàn trả 100% số tiền đã thanh toán về tài khoản ngân hàng hoặc cấp 100% điểm tín dụng (Store Credit) không thời hạn theo mong muốn của bạn.'
        },
        {
          heading: 'Hủy trong vòng 24 - 48 giờ',
          body: 'Chúng tôi hoàn trả 100% giá trị đơn hàng dưới dạng điểm tín dụng Store Credit để bạn sử dụng cho bất kỳ lần thuê nào trong tương lai.'
        },
        {
          heading: 'Sau khi đơn hàng đã gửi đi',
          body: 'Khi đơn hàng đã được đóng gói và bàn giao cho đơn vị vận chuyển, chúng tôi rất tiếc không thể hỗ trợ hủy đơn do các chi phí điều phối và giữ lịch đã phát sinh.'
        }
      ]
    },
    {
      id: 'insurance-care',
      title: '4. Bảo Hiểm Trang Phục (Rent-ish Care) & Tổn Hại',
      icon: 'health_and_safety',
      items: [
        {
          heading: 'Đã tích hợp bảo hiểm cơ bản',
          body: 'Mọi đơn hàng đều đã bao gồm gói bảo hiểm Rent-ish Care. Chúng tôi MIỄN PHÍ xử lý cho các hao mòn thông thường như: vết ố rượu vang nhỏ, vết son, phấn trang điểm, sút chỉ gấu váy, rơi cúc áo hoặc kẹt dây kéo.'
        },
        {
          heading: 'Tổn hại nghiêm trọng hoặc Không thể phục hồi',
          body: 'Trong trường hợp trang phục bị cháy xém bởi tàn thuốc, rách thủng mảng lớn vải tơ lụa, dính sơn dầu hóa chất không thể tẩy sạch, hoặc mất các phụ kiện đính kết cao cấp độc bản, khách hàng sẽ chịu chi phí sửa chữa chuyên sâu hoặc bồi thường theo tỷ lệ khấu hao tối đa không quá 70% giá bán lẻ niêm yết của sản phẩm.'
        },
        {
          heading: 'Mất mát trang phục',
          body: 'Nếu trang phục bị thất lạc hoặc không hoàn trả sau thời gian thuê, bạn sẽ phải thanh toán 100% giá trị bán lẻ niêm yết của sản phẩm theo hợp đồng.'
        }
      ]
    },
    {
      id: 'returns-late-fees',
      title: '5. Quy Định Hoàn Trả & Phí Trễ Hạn',
      icon: 'assignment_return',
      items: [
        {
          heading: 'Tuyệt đối KHÔNG tự ý giặt ủi',
          body: 'Các trang phục thiết kế làm từ lụa tơ tằm, nhung dạ hội hay đính kết thủ công cần quy trình giặt khô sinh thái chuyên biệt. Bạn KHÔNG ĐƯỢC tự giặt bằng máy, giặt tay với bột giặt thông thường hoặc mang ra tiệm giặt không đảm bảo.'
        },
        {
          heading: 'Quy trình hoàn trả nhẹ nhàng',
          body: 'Vào ngày thứ 4 của kỳ thuê, trước 12:00 trưa, bạn chỉ việc gấp trang phục, cho lại vào túi Re-Pack và bàn giao cho nhân viên giao nhận theo lịch hẹn lấy tận nhà.'
        },
        {
          heading: 'Phí trả trễ hạn không báo trước',
          body: 'Do trang phục cần được giặt hấp và chuẩn bị cho khách hàng tiếp theo, trường hợp bạn giữ đồ trễ hạn mà không thông báo gia hạn trước với Rent-ish, phí trễ hạn là 20% giá trị gói thuê cho mỗi ngày phát sinh.'
        }
      ]
    },
    {
      id: 'liability',
      title: '6. Giới Hạn Trách Nhiệm & Bất Khả Kháng',
      icon: 'policy',
      items: [
        {
          heading: 'Trường hợp bất khả kháng',
          body: 'Rent-ish không chịu trách nhiệm pháp lý nếu việc giao hàng chậm trễ phát sinh do các trường hợp bất khả kháng như thiên tai, thời tiết cực đoan, đình công diện rộng hoặc sự cố nghiêm trọng của mạng lưới bưu chính quốc gia. Tuy nhiên, chúng tôi cam kết sẽ hoàn trả toàn bộ phí thuê hoặc dời ngày linh hoạt cho bạn.'
        },
        {
          heading: 'Bản quyền hình ảnh & Thiết kế',
          body: 'Toàn bộ hình ảnh, mô tả sản phẩm và thương hiệu hiển thị trên trang web thuộc quyền sở hữu của Rent-ish và các đối tác. Nghiêm cấm mọi hành vi sao chép nhằm mục đích thương mại khi chưa có sự đồng ý bằng văn bản.'
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
              <span className="material-symbols-outlined text-[15px]">description</span>
              Quy Chế & Hợp Đồng Dịch Vụ
            </span>
            <h1 className="font-headline-xl text-3xl sm:text-5xl font-bold text-on-surface tracking-tight leading-tight">
              Điều Khoản Dịch Vụ
            </h1>
            <p className="mt-4 text-on-surface-variant font-body-lg text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Các điều khoản minh bạch, rõ ràng nhằm đảm bảo quyền lợi tối đa cho bạn và xây dựng cộng đồng chia sẻ thời trang văn minh, bền vững.
            </p>
            <div className="mt-4 text-xs text-outline">
              Hiệu lực từ ngày: 01 tháng 01 năm 2026 • Áp dụng toàn quốc
            </div>
          </div>
        </section>

        {/* Highlight Summary Bar */}
        <section className="py-8 bg-surface-container-low border-b border-surface-container">
          <div className="max-w-5xl mx-auto px-margin sm:px-margin-lg">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-primary text-2xl mb-1">check_circle</span>
                <span className="font-bold text-on-surface text-sm">Không Cần Đặt Cọc Tiền Mặt</span>
                <span className="text-xs text-on-surface-variant">Xác thực tài khoản nhanh chóng</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-primary text-2xl mb-1">verified_user</span>
                <span className="font-bold text-on-surface text-sm">Đã Tích Hợp Bảo Hiểm Hư Hại</span>
                <span className="text-xs text-on-surface-variant">Vết bẩn & đường may nhỏ được bao trọn</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-primary text-2xl mb-1">replay</span>
                <span className="font-bold text-on-surface text-sm">Hủy Đơn Hoàn Tiền 100%</span>
                <span className="text-xs text-on-surface-variant">Trước 48h so với ngày nhận đồ</span>
              </div>
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

                <div className="space-y-6">
                  {sec.items.map((item, iIdx) => (
                    <div key={iIdx} className="bg-surface-container-low/40 p-6 rounded-2xl border border-surface-container/50">
                      <h3 className="font-semibold text-on-surface text-base mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                        {item.heading}
                      </h3>
                      <p className="text-sm text-on-surface-variant leading-relaxed pl-4">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quick FAQ / Contact Link */}
          <div className="mt-16 bg-surface-container-lowest p-8 sm:p-10 rounded-3xl border border-surface-container text-center max-w-2xl mx-auto shadow-sm">
            <h3 className="font-headline-md text-xl font-bold text-on-surface mb-2">
              Bạn Có Câu Hỏi Cần Được Tư Vấn Riêng?
            </h3>
            <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
              Đội ngũ Concierge của chúng tôi túc trực 24/7 để hướng dẫn quy trình thuê đồ, đo size và điều khoản bảo hiểm chi tiết cho bạn.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
              <Link
                href="/faq"
                className="px-6 py-3 rounded-full bg-primary-container text-on-primary-container hover:bg-tertiary-container transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">help_center</span>
                <span>Xem Câu Hỏi Thường Gặp</span>
              </Link>
              <Link
                href="/how-it-works"
                className="px-6 py-3 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>Hướng Dẫn 4 Bước Thuê Đồ</span>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
