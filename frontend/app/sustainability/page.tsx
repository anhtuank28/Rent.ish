"use client";

import React from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export default function SustainabilityPage() {
  const stats = [
    {
      value: '-84%',
      label: 'Lượng phát thải Carbon',
      desc: 'Giảm khí nhà kính so với việc sản xuất và mua mới một chiếc váy dạ hội.',
      icon: 'co2'
    },
    {
      value: '-89%',
      label: 'Lượng nước tiêu thụ',
      desc: 'Tiết kiệm hàng nghìn lít nước ngọt dùng cho trồng bông sợi và dệt nhuộm công nghiệp.',
      icon: 'water_drop'
    },
    {
      value: '200+',
      label: 'Vòng đời tái sử dụng túi',
      desc: 'Túi đựng chuyên dụng Re-Pack thay thế hơn 100.000 túi nilon dùng một lần mỗi năm.',
      icon: 'recycling'
    },
    {
      value: '100%',
      label: 'Khử khuẩn Ozone sinh học',
      desc: 'Quy trình giặt hấp không dung môi độc hại PERC, bảo vệ sức khỏe làn da người mặc.',
      icon: 'clean_hands'
    }
  ];

  const pillars = [
    {
      icon: 'autorenew',
      title: 'Kinh Tế Thời Trang Tuần Hoàn (Circular Economy)',
      subtitle: 'Mặc nhiều hơn, sản xuất ít đi',
      desc: 'Mỗi năm có hơn 92 triệu tấn rác thải dệt may bị chôn lấp hoặc đốt bỏ. Rent-ish được xây dựng với sứ mệnh tối đa hóa giá trị của từng tác phẩm thiết kế. Thay vì mua một chiếc váy dạ hội đắt đỏ chỉ để mặc 1 lần chụp ảnh rồi lãng quên trong tủ, chúng tôi giúp một thiết kế cao cấp được trân trọng và tỏa sáng từ 30 đến 50 lần cùng các quý cô khác nhau.',
      points: [
        'Hợp tác trực tiếp với các nhà thiết kế uy tín để tuyển chọn chất liệu bền vững',
        'Kéo dài tuổi thọ trang phục thông qua bảo dưỡng thủ công chuyên nghiệp',
        'Khi hết vòng đời cho thuê, trang phục được bán thanh lý từ thiện hoặc tái chế sợi vải'
      ]
    },
    {
      icon: 'local_laundry_service',
      title: 'Công Nghệ Giặt Khô Sinh Thái & Khử Trùng Ozone',
      subtitle: 'Sạch tinh khiết nhưng không làm tổn hại thiên nhiên',
      desc: 'Ngành giặt là truyền thống thường sử dụng Perchloroethylene (PERC) - một hóa chất độc hại gây ô nhiễm nguồn nước ngầm. Tại Rent-ish, chúng tôi đầu tư hệ thống giặt khô kín thế hệ mới ứng dụng khí Ozone và dung môi hữu cơ gốc nước tự nhiên. Quy trình này diệt khuẩn 99.9%, khử sạch mùi hôi và phấn trang điểm mà vẫn giữ nguyên độ óng mượt của sợi tơ lụa tự nhiên.',
      points: [
        'Không tồn dư hóa chất tẩy rửa, an toàn tuyệt đối cho làn da nhạy cảm',
        'Hệ thống tuần hoàn nước khép kín tái sử dụng đến 70% nước xả qua màng lọc RO',
        'Bảo toàn độ bền của vải gấp 3 lần so với phương pháp giặt hấp hóa chất'
      ]
    },
    {
      icon: 'shopping_bag',
      title: 'Bao Bì Tuần Hoàn Không Rác Thải (Zero-Waste Packaging)',
      subtitle: 'Nói không với nilon bọc 1 lần',
      desc: 'Mỗi đơn hàng gửi đi từ Rent-ish được bảo bọc cẩn thận trong túi Re-Pack may bằng vải canvas tái chế chống thấm nước và kháng bụi. Bạn nhận đồ, mặc đẹp, và chỉ việc cho lại vào chính chiếc túi đó để shipper đến nhận lại. Chúng tôi thu hồi, khử khuẩn và tiếp tục sử dụng cho lượt khách hàng tiếp theo.',
      points: [
        'Túi bọc cao cấp có khả năng tái sử dụng hơn 200 lượt giao nhận',
        'Móc treo đồ đúc từ nhựa tái sinh thu gom từ đại dương',
        'Tem niêm phong bằng giấy kraft tự hủy sinh học phân hủy hoàn toàn trong 90 ngày'
      ]
    },
    {
      icon: 'electric_moped',
      title: 'Giao Nhận Trung Hòa Carbon (Eco-Logistics)',
      subtitle: 'Hành trình xanh từ showroom tới ngưỡng cửa nhà bạn',
      desc: 'Chúng tôi hợp tác với các đơn vị vận chuyển hàng đầu để ưu tiên sử dụng đội ngũ xe máy điện cho các đơn giao hỏa tốc 2 giờ tại nội thành Hà Nội và TP.HCM. Đối với các đơn liên tỉnh vận chuyển bằng đường hàng không, Rent-ish trích một phần lợi nhuận để mua tín chỉ bù đắp carbon vào các dự án trồng rừng đầu nguồn tại Tây Nguyên.',
      points: [
        'Tối ưu hóa lộ trình gom đơn 2 chiều thông minh để giảm quãng đường di chuyển',
        'Đội xe điện giao nhận không phát thải CO2 và giảm ô nhiễm tiếng ồn đô thị',
        'Cam kết đạt chuẩn phát thải ròng bằng 0 (Net Zero) trên toàn bộ chuỗi vận hành vào năm 2028'
      ]
    }
  ];

  const comparison = [
    {
      criteria: 'Chi phí mua sắm',
      buying: '10.000.000đ - 30.000.000đ / bộ thiết kế',
      renting: '450.000đ - 1.500.000đ / lần thuê (Tiết kiệm 90%)',
      highlight: true
    },
    {
      criteria: 'Số lần mặc trung bình',
      buying: '1 - 2 lần rồi xếp xó trong tủ',
      renting: 'Luôn diện mẫu mới mỗi tuần mà không lo lặp lại',
      highlight: false
    },
    {
      criteria: 'Lượng khí thải CO2',
      buying: '~25 - 35 kg CO2 sản xuất mới',
      renting: '~3.2 kg CO2 giặt sấy & vận chuyển (Giảm 84%)',
      highlight: true
    },
    {
      criteria: 'Nước tiêu thụ',
      buying: '~2.700 lít nước sạch cho 1 bộ trang phục',
      renting: '~120 lít nước trong chu trình giặt tuần hoàn',
      highlight: false
    },
    {
      criteria: 'Không gian tủ đồ',
      buying: 'Chiếm diện tích, dễ ẩm mốc và mất giá',
      renting: 'Tủ đồ tinh gọn, linh hoạt bất tận theo nhu cầu',
      highlight: false
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-20">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 lg:py-24 bg-surface-container-lowest border-b border-surface-container-low">
          <div className="max-w-7xl mx-auto px-margin sm:px-margin-lg text-center relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-label-sm text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="material-symbols-outlined text-[16px]">eco</span>
              B-Corp Certified • 100% Net-Zero Fashion
            </span>
            <h1 className="font-headline-xl text-3xl sm:text-5xl lg:text-6xl font-bold text-on-surface tracking-tight max-w-4xl mx-auto leading-tight">
              Tỏa Sáng Tuyệt Đối, <br className="hidden sm:inline" />
              <span className="text-emerald-700">Yêu Thương Hành Tinh Xanh</span>
            </h1>
            <p className="mt-5 text-on-surface-variant font-body-lg text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              Rent-ish tin rằng vẻ đẹp thanh lịch đích thực không nên đánh đổi bằng sự suy thoái của môi trường. Chúng tôi mang đến giải pháp thời trang tuần hoàn giúp bạn thỏa sức thể hiện phong cách cá nhân mà vẫn gìn giữ tương lai bền vững.
            </p>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="py-12 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-margin sm:px-margin-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s, idx) => (
                <div key={idx} className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container shadow-sm flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-2xl">{s.icon}</span>
                  </div>
                  <div>
                    <div className="font-headline-xl text-3xl sm:text-4xl font-black text-emerald-800 tracking-tight mb-1">
                      {s.value}
                    </div>
                    <div className="font-semibold text-on-surface text-sm mb-1.5">
                      {s.label}
                    </div>
                    <div className="text-xs text-on-surface-variant leading-relaxed">
                      {s.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4 Pillars of Sustainability */}
        <section className="py-16 lg:py-24 max-w-7xl mx-auto px-margin sm:px-margin-lg">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-label-md text-xs uppercase tracking-widest text-emerald-700 font-bold">
              Trụ Cột Hành Động
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-4xl font-bold text-on-surface mt-2">
              Chúng Tôi Hiện Thực Hóa Sự Bền Vững Như Thế Nào?
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mt-3">
              Không chỉ là khẩu hiệu suông, tính bền vững được tích hợp vào từng công đoạn nhỏ nhất trong chu trình phục vụ của Rent-ish.
            </p>
          </div>

          <div className="space-y-12">
            {pillars.map((p, idx) => (
              <div 
                key={idx}
                className="bg-surface-container-lowest rounded-3xl p-8 sm:p-12 border border-surface-container/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-4 flex flex-col items-start">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-6 shadow-sm">
                    <span className="material-symbols-outlined text-3xl">{p.icon}</span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-3">
                    {p.subtitle}
                  </span>
                  <h3 className="font-headline-md text-xl sm:text-2xl font-bold text-on-surface leading-snug">
                    {p.title}
                  </h3>
                </div>

                <div className="lg:col-span-8 space-y-6">
                  <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                    {p.desc}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-surface-container/60">
                    {p.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-on-surface">
                        <span className="material-symbols-outlined text-emerald-600 text-[18px] shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-surface-container-low">
          <div className="max-w-5xl mx-auto px-margin sm:px-margin-lg">
            <div className="text-center mb-12">
              <span className="font-label-md text-xs uppercase tracking-widest text-emerald-700 font-bold">
                Tác Động Thực Tế
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface mt-2">
                So Sánh: Mua Mới Truyền Thống vs. Thuê Tại Rent-ish
              </h2>
              <p className="text-sm text-on-surface-variant mt-2">
                Sự khác biệt rõ ràng giữa tư duy tiêu dùng nhanh và thời trang tuần hoàn thông minh.
              </p>
            </div>

            <div className="overflow-x-auto bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-surface-container bg-surface-container-lowest">
                    <th className="py-4 px-6 font-semibold text-on-surface">Tiêu chí đánh giá</th>
                    <th className="py-4 px-6 font-semibold text-on-surface-variant">Mua mới truyền thống</th>
                    <th className="py-4 px-6 font-bold text-emerald-800 bg-emerald-50/50">Thuê tại Rent-ish</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container/60">
                  {comparison.map((row, idx) => (
                    <tr key={idx} className={row.highlight ? 'bg-emerald-50/20' : ''}>
                      <td className="py-4 px-6 font-medium text-on-surface">{row.criteria}</td>
                      <td className="py-4 px-6 text-on-surface-variant">{row.buying}</td>
                      <td className="py-4 px-6 font-semibold text-emerald-800 bg-emerald-50/30">{row.renting}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="max-w-7xl mx-auto px-margin sm:px-margin-lg pt-16">
          <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white p-10 sm:p-16 rounded-3xl text-center relative overflow-hidden shadow-lg">
            <div className="max-w-2xl mx-auto relative z-10">
              <span className="material-symbols-outlined text-4xl text-emerald-300 mb-4 inline-block">
                nature_people
              </span>
              <h2 className="font-headline-xl text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
                Cùng Chúng Tôi Kiến Tạo Kỷ Nguyên Thời Trang Mới
              </h2>
              <p className="text-emerald-100 text-sm sm:text-base leading-relaxed mb-8">
                Mỗi lần bạn lựa chọn thuê thay vì mua mới, bạn vừa tiết kiệm ngân sách cá nhân, vừa trực tiếp chung tay giảm thiểu rác thải thời trang cho Trái Đất.
              </p>
              <Link
                href="/dresses"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-emerald-950 font-bold hover:bg-emerald-50 shadow-md hover:shadow-xl transition-all active:scale-95"
              >
                <span>Bắt Đầu Tủ Đồ Tuần Hoàn</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
