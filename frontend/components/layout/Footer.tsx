import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-low mt-space-xl">
      <div className="max-w-7xl mx-auto px-margin sm:px-margin-lg py-space-xl">
        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter pb-space-xl bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_8px_24px_-4px_rgba(36,30,26,0.05)] mb-space-xl">
          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-tertiary">checkroom</span>
            </div>
            <div>
              <div className="font-label-lg text-label-lg text-on-surface">Vừa vặn 100%</div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">Tặng kèm size dự phòng trong mỗi đơn hàng</div>
            </div>
          </div>
          
          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-tertiary">dry_cleaning</span>
            </div>
            <div>
              <div className="font-label-lg text-label-lg text-on-surface">Miễn phí giặt ủi</div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">Không cần giặt, chỉ việc cho vào túi và gửi lại</div>
            </div>
          </div>
          
          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-tertiary">verified_user</span>
            </div>
            <div>
              <div className="font-label-lg text-label-lg text-on-surface">Đã bao gồm bảo hiểm</div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">Bảo hiểm toàn diện cho vết bẩn nhỏ và lỗi khóa kéo</div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5 space-y-space-md">
            <div className="flex items-center gap-space-sm">
              <img
                alt="Rent-ish Logo"
                className="h-7 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1U4Jw_sQZMV2SGYtxAQRLouJB8-6jBWrV3nPwaIxlTltmAB_yDfAyAKCPzfwf0h03d3gos-n02Vr1hsD4b-yrczw76WnhGkZNSexkn4nZKOr0xFZDc5zqdUp_ZXzAdpBH-iV5sin4gV11QZwtgSG1k7B9yGCVGSkjxSZfHefyplAGRHkfBtATu9WCL2fnNfbp-jab7vFNowbnwfAuw3LTQUxMusSulYj1gEHIcyH6z6YH5q9R0xovqKN-k"
              />
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Rent-ish</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Thời trang cao cấp tinh tế cho những khoảnh khắc đáng nhớ. Mặc thiết kế mơ ước, ủng hộ thời trang bền vững và hoàn trả thật nhẹ nhàng.
            </p>
            <div className="pt-space-xs">
              <span className="font-label-lg text-label-lg text-on-surface block mb-space-xs">
                Đăng ký & nhận ưu đãi giảm 20% cho lần thuê đầu tiên
              </span>
              <form className="flex items-center gap-space-xs max-w-md">
                <input
                  className="w-full bg-surface-container-lowest font-body-sm text-body-sm px-space-md py-space-xs rounded-full border border-outline-variant focus:outline-none focus:ring-1 focus:ring-primary text-on-surface placeholder:text-outline"
                  placeholder="Nhập địa chỉ email của bạn"
                  type="email"
                />
                <button
                  className="bg-on-secondary-fixed text-surface-container-lowest font-label-md text-label-md px-space-lg py-space-xs rounded-full hover:bg-primary transition-colors shrink-0"
                  type="button"
                >
                  Tham gia
                </button>
              </form>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-4 space-y-space-md">
            <div className="font-label-lg text-label-lg text-on-surface tracking-wider uppercase">
              Trải nghiệm Rent-ish
            </div>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <li className="hover:text-on-surface transition-colors">
                <Link href="/pass">Gói hội viên Rent-ish Pass</Link>
              </li>
              <li className="hover:text-on-surface transition-colors">
                <Link href="/how-it-works">Hướng dẫn sử dụng</Link>
              </li>
              <li className="hover:text-on-surface transition-colors">
                <Link href="/sustainability">Cam kết bền vững</Link>
              </li>
              <li className="hover:text-on-surface transition-colors">
                <Link href="/fit-guarantee">Chính sách đảm bảo vừa vặn</Link>
              </li>
              <li className="hover:text-on-surface transition-colors">
                <Link href="/faq">Câu hỏi thường gặp & CSKH</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Eco */}
          <div className="lg:col-span-3 space-y-space-md">
            <div className="font-label-lg text-label-lg text-on-surface tracking-wider uppercase">
              Showroom & CSKH
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Flagship Styling Loft<br />SoHo, New York, NY 10012<br />concierge@rent-ish.com
            </p>
            <div className="flex items-center gap-space-sm pt-space-xs">
              <span className="material-symbols-outlined text-primary">eco</span>
              <span className="font-label-sm text-label-sm text-tertiary">
                Doanh nghiệp B-Corp chứng nhận 100% Trung hòa Carbon
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-space-xl pt-space-md border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm text-outline">
          <div>© 2026 Rent-ish Studio Inc. Bảo lưu mọi quyền.</div>
          <div className="flex items-center gap-space-lg">
            <Link href="/privacy" className="hover:text-on-surface transition-colors">Chính sách bảo mật</Link>
            <Link href="/terms" className="hover:text-on-surface transition-colors">Điều khoản dịch vụ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
