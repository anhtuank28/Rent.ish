"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { CartHeader } from '@/components/layout/CartHeader';
import { CartFooter } from '@/components/layout/CartFooter';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('cod');
  const [shippingOption, setShippingOption] = useState<'standard' | 'express'>('standard');

  return (
    <main className="w-full min-h-screen bg-background flex flex-col">
      <CartHeader step={2} />
      
      <div className="flex-1 w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 py-24 lg:py-28">
        
        {/* Title Area */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10 border-b border-surface-container-high pb-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-container text-on-primary-container font-semibold text-sm">
              2
            </span>
            <div>
              <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight leading-tight">
                Giao hàng & Thanh toán
              </h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Bước 2/3 • Điền thông tin nhận hàng và phương thức thanh toán.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container-low text-on-surface-variant shadow-sm border border-surface-container">
            <span className="material-symbols-outlined text-base text-primary">verified_user</span>
            <span className="font-label-sm text-label-sm text-on-surface font-medium">Đảm bảo giao hàng trước sự kiện 2 ngày</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Checkout Form */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Step 1: Delivery Info */}
            <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-container-low space-y-6">
              <div className="flex items-center gap-3 border-b border-surface-container-low pb-4">
                <span className="w-6 h-6 rounded-full bg-surface-container text-primary text-xs font-semibold flex items-center justify-center">1</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Thông tin giao hàng</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-label-md text-label-md text-on-surface">Họ và tên</label>
                  <input type="text" placeholder="Ví dụ: Nguyễn Văn A" className="w-full h-12 px-4 rounded-xl bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary-container border border-transparent focus:border-primary-container transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="block font-label-md text-label-md text-on-surface">Số điện thoại</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-on-surface-variant material-symbols-outlined text-[20px]">call</span>
                    <input type="tel" placeholder="0901234567" className="w-full h-12 pl-11 pr-4 rounded-xl bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary-container border border-transparent focus:border-primary-container transition-all" />
                  </div>
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block font-label-md text-label-md text-on-surface">Địa chỉ cụ thể (Số nhà, tên đường)</label>
                  <input type="text" placeholder="Ví dụ: 123 Đường Lê Lợi, Phường Bến Thành" className="w-full h-12 px-4 rounded-xl bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary-container border border-transparent focus:border-primary-container transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="block font-label-md text-label-md text-on-surface">Tỉnh / Thành phố</label>
                  <select className="w-full h-12 px-4 rounded-xl bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary-container border border-transparent focus:border-primary-container transition-all appearance-none cursor-pointer">
                    <option value="">Chọn Tỉnh/Thành</option>
                    <option value="HN">Hà Nội</option>
                    <option value="HCM">Hồ Chí Minh</option>
                    <option value="DN">Đà Nẵng</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block font-label-md text-label-md text-on-surface">Quận / Huyện</label>
                  <select className="w-full h-12 px-4 rounded-xl bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary-container border border-transparent focus:border-primary-container transition-all appearance-none cursor-pointer">
                    <option value="">Chọn Quận/Huyện</option>
                  </select>
                </div>
              </div>

              {/* Shipping Modes */}
              <div className="pt-2 space-y-3">
                <span className="block font-label-md text-label-md text-on-surface font-semibold">Phương thức vận chuyển</span>
                
                <label className={`relative flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${shippingOption === 'standard' ? 'bg-primary-container/10 border-primary-container' : 'bg-surface-container-lowest border-surface-container-low hover:bg-surface-container-low'}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="shipping" 
                      value="standard" 
                      checked={shippingOption === 'standard'}
                      onChange={() => setShippingOption('standard')}
                      className="w-4 h-4 text-primary accent-primary focus:ring-0 cursor-pointer" 
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-label-md text-label-md text-on-surface font-semibold">Giao hàng Tiêu Chuẩn (Standard)</p>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container">Khuyên dùng</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Dự kiến nhận hàng trước sự kiện 2 ngày.</p>
                    </div>
                  </div>
                  <span className="font-label-md text-label-md text-primary font-bold">Miễn phí</span>
                </label>

                <label className={`relative flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${shippingOption === 'express' ? 'bg-primary-container/10 border-primary-container' : 'bg-surface-container-lowest border-surface-container-low hover:bg-surface-container-low'}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="shipping" 
                      value="express" 
                      checked={shippingOption === 'express'}
                      onChange={() => setShippingOption('express')}
                      className="w-4 h-4 text-primary accent-primary focus:ring-0 cursor-pointer" 
                    />
                    <div>
                      <p className="font-label-md text-label-md text-on-surface font-semibold">Giao hàng Hỏa Tốc (Express)</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Nhận hàng trong vòng 4 tiếng (Chỉ áp dụng nội thành HCM/HN).</p>
                    </div>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">+ 50.000đ</span>
                </label>
              </div>
            </section>

            {/* Step 2: Payment Method */}
            <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-container-low space-y-6">
              <div className="flex items-center justify-between border-b border-surface-container-low pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-surface-container text-primary text-xs font-semibold flex items-center justify-center">2</span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">Phương thức thanh toán</h2>
                </div>
                <div className="flex items-center gap-1 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-primary">lock</span>
                  <span className="font-label-sm text-label-sm">Bảo mật mã hóa</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setPaymentMethod('cod')}
                  className={`py-3 px-4 rounded-xl font-label-md text-label-md border transition-all flex items-center justify-center gap-2 ${paymentMethod === 'cod' ? 'bg-primary-container text-on-primary-container border-primary-container' : 'bg-surface-container-lowest text-on-surface border-surface-container-low hover:bg-surface-container-low'}`}
                >
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                  <span>Thanh toán khi nhận hàng (COD)</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod('card')}
                  className={`py-3 px-4 rounded-xl font-label-md text-label-md border transition-all flex items-center justify-center gap-2 ${paymentMethod === 'card' ? 'bg-primary-container text-on-primary-container border-primary-container' : 'bg-surface-container-lowest text-on-surface border-surface-container-low hover:bg-surface-container-low'}`}
                >
                  <span className="material-symbols-outlined text-[18px]">credit_card</span>
                  <span>Thẻ Tín dụng / Ghi nợ</span>
                </button>
              </div>

              {/* Card Form - Only show if card is selected */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-4">
                  <div className="space-y-1.5">
                    <label className="block font-label-md text-label-md text-on-surface">Tên chủ thẻ</label>
                    <input type="text" placeholder="NGUYEN VAN A" className="w-full h-12 px-4 rounded-xl bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary-container border border-transparent focus:border-primary-container uppercase transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block font-label-md text-label-md text-on-surface">Số thẻ</label>
                    <div className="relative">
                      <input type="text" placeholder="•••• •••• •••• ••••" maxLength={19} className="w-full h-12 px-4 pr-12 rounded-xl bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary-container border border-transparent focus:border-primary-container transition-all" />
                      <span className="absolute right-4 top-3 text-primary material-symbols-outlined text-[20px]">contactless</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block font-label-md text-label-md text-on-surface">Ngày hết hạn</label>
                      <input type="text" placeholder="MM/YY" maxLength={5} className="w-full h-12 px-4 rounded-xl bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary-container border border-transparent focus:border-primary-container transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block font-label-md text-label-md text-on-surface">Mã bảo mật (CVV)</label>
                      <input type="password" placeholder="•••" maxLength={3} className="w-full h-12 px-4 rounded-xl bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary-container border border-transparent focus:border-primary-container transition-all" />
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
            
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-container-low">
              <div className="flex items-center justify-between border-b border-surface-container-low pb-4 mb-4">
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Tóm tắt đơn hàng</h2>
                <span className="font-label-md text-label-md px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-medium">2 Sản phẩm</span>
              </div>

              {/* MOCK ITEMS */}
              <div className="space-y-4 mb-6">
                <div className="flex gap-4">
                  <div className="w-20 h-28 bg-surface-container-high rounded-xl overflow-hidden flex-shrink-0 relative">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2ltVJIZ4KcnzBklKe7kfHqk53hP0t4TqcUgfGcGQjlJdq1jJmBFXSz3WU5tXPSCWZ7pMS-1jSAbZXew5NLrhqs_YZP8CRM3WyBgNiLzTJNQC67ZZG6RMlFAkOqLYfJzH_WNOpGfe5ktcANQCo16PYv9F2HcgvDIoYgzni68eZ06_45u9svsSeIYqAkNKoJq5rYfkJD-YhN65l_cArIlnT0iKUd2UexOn39fISKl7GgjqKlyhMwZFkzg" alt="Dress" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-between flex-1 py-1">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary">AURA STUDIO</span>
                      <h3 className="font-label-lg text-label-lg text-on-surface font-semibold line-clamp-1">Draped Silk Maxi Dress</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Size S • Kèm Size M dự phòng</p>
                      <p className="text-[12px] text-on-surface-variant mt-1">14/10 - 18/10 (4 Ngày)</p>
                    </div>
                    <div className="font-label-md text-label-md text-on-surface font-bold">1.250.000đ</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-20 h-28 bg-surface-container-high rounded-xl overflow-hidden flex-shrink-0 relative">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-Wk8mHoucynZoBL7FbKR6mLAvWoJjZrYOfIwTa15tP4Yxf7jHCww77W_z7lyjuv5ZcWhGTA27uoWMZiw2z9nBw02gwvPvzma2LtIfz4HO0lkU0OfxWJN7S5RDWw3djgQULW00dae7hFrO-pM2Lcc4jvZrYsZEeMFnrWdVb5ZHgbxxK1Jmn74jkJ10FqUCq05LAw_SHUNBb-7G5i5YEjcckzVsbMbMlSo7lD-3aCHfBZJZz0Mfs-GiEA" alt="Dress" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-between flex-1 py-1">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary">CULT GAIA</span>
                      <h3 className="font-label-lg text-label-lg text-on-surface font-semibold line-clamp-1">Sunset Cowl Neck Bias Midi</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Size M • Kèm Size S dự phòng</p>
                      <p className="text-[12px] text-on-surface-variant mt-1">14/10 - 18/10 (4 Ngày)</p>
                    </div>
                    <div className="font-label-md text-label-md text-on-surface font-bold">850.000đ</div>
                  </div>
                </div>
              </div>

              {/* COST BREAKDOWN */}
              <div className="space-y-3 pt-4 border-t border-surface-container-low text-body-sm font-body-sm text-on-surface-variant">
                <div className="flex justify-between">
                  <span>Tạm tính (2 sản phẩm)</span>
                  <span className="text-on-surface font-medium">2.100.000đ</span>
                </div>
                <div className="flex justify-between">
                  <span>Size dự phòng</span>
                  <span className="text-primary font-semibold">Miễn phí</span>
                </div>
                <div className="flex justify-between">
                  <span>Giặt sấy sinh thái</span>
                  <span className="text-primary font-semibold">Miễn phí</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span className="text-primary font-semibold">{shippingOption === 'standard' ? 'Miễn phí' : '50.000đ'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Gói bảo hiểm hư hại nhẹ Rent-ish</span>
                  <span className="text-on-surface font-medium">49.000đ</span>
                </div>
                
                {/* TOTAL */}
                <div className="pt-4 mt-2 border-t border-surface-container-low flex items-center justify-between">
                  <div>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Tổng cộng</span>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">Đã bao gồm thuế & phí</p>
                  </div>
                  <span className="font-headline-lg text-headline-lg text-on-surface font-bold text-primary">
                    {shippingOption === 'standard' ? '2.149.000đ' : '2.199.000đ'}
                  </span>
                </div>
              </div>
              
              <div className="pt-6 space-y-4">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 rounded text-primary accent-primary cursor-pointer flex-shrink-0" />
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-[13px] leading-relaxed">
                    Tôi đồng ý với <Link href="#" className="text-primary font-medium hover:underline">Chính sách cho thuê</Link> và <Link href="#" className="text-primary font-medium hover:underline">Quy định đổi trả</Link> của Rent-ish.
                  </span>
                </label>
                
                <button className="w-full py-4 px-6 rounded-full bg-primary-container hover:bg-inverse-primary text-on-primary-fixed font-label-lg text-label-lg font-semibold tracking-tight transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                  <span>Hoàn Tất Đặt Hàng</span>
                </button>
              </div>
            </div>

            {/* Rent-ish Guarantees Card */}
            <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-surface-container-low space-y-4">
              <h3 className="font-label-lg text-label-lg text-on-surface font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">workspace_premium</span>
                Cam kết từ Rent-ish
              </h3>
              <div className="space-y-4 text-body-sm font-body-sm">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">straighten</span>
                  <div>
                    <strong className="text-on-surface text-[13px] block">100% Đảm bảo vừa vặn</strong>
                    <p className="text-on-surface-variant text-[12px] leading-relaxed mt-1">Gửi kèm 1 size dự phòng miễn phí. Đổi size hỏa tốc nếu cả 2 size đều không vừa.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">keyboard_return</span>
                  <div>
                    <strong className="text-on-surface text-[13px] block">Hoàn trả dễ dàng</strong>
                    <p className="text-on-surface-variant text-[12px] leading-relaxed mt-1">Sử dụng túi hoàn trả đi kèm, shipper sẽ đến tận nhà lấy hàng theo lịch hẹn.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <CartFooter />
    </main>
  );
}
