import React from 'react';

export function CustomerReviews() {
  return (
    <section className="w-full bg-surface py-space-xl" id="customer-gallery">
      <div className="max-w-7xl mx-auto px-margin-sm md:px-margin lg:px-margin-lg">
        
        {/* Section Header & Aggregate Metrics */}
        <div className="p-space-lg md:p-space-xl rounded-xl bg-surface-container-lowest shadow-[0_8px_24px_-4px_rgba(36,30,26,0.04)] mb-space-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
            
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
              <span className="font-display text-[56px] leading-none font-bold text-on-surface">4.9</span>
              <div className="flex items-center text-[#d48c3b] my-2">
                <span className="material-symbols-outlined text-[24px] fill-current">star</span>
                <span className="material-symbols-outlined text-[24px] fill-current">star</span>
                <span className="material-symbols-outlined text-[24px] fill-current">star</span>
                <span className="material-symbols-outlined text-[24px] fill-current">star</span>
                <span className="material-symbols-outlined text-[24px] fill-current">star</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant font-medium">
                Dựa trên 128 đánh giá thực tế từ khách thuê
              </p>
              <span className="mt-2 inline-flex items-center gap-1 font-label-sm text-label-sm text-primary font-semibold">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                100% Khách Hàng Rent-ish
              </span>
            </div>

            {/* Fit Consensus Visual Bars */}
            <div className="lg:col-span-8 flex flex-col justify-center space-y-3">
              <h4 className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-semibold">
                Đánh Giá Kích Cỡ
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-24 text-right font-label-sm text-label-sm text-on-surface-variant">Hơi nhỏ</span>
                  <div className="flex-1 h-3 rounded-full bg-surface-container overflow-hidden">
                    <div className="h-full bg-secondary w-[4%] rounded-full"></div>
                  </div>
                  <span className="w-10 font-label-sm text-label-sm font-semibold text-on-surface">4%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-24 text-right font-label-sm text-label-sm font-bold text-on-surface">Đúng size</span>
                  <div className="flex-1 h-3 rounded-full bg-surface-container overflow-hidden">
                    <div className="h-full bg-primary w-[91%] rounded-full"></div>
                  </div>
                  <span className="w-10 font-label-sm text-label-sm font-bold text-primary">91%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-24 text-right font-label-sm text-label-sm text-on-surface-variant">Hơi lớn</span>
                  <div className="flex-1 h-3 rounded-full bg-surface-container overflow-hidden">
                    <div className="h-full bg-secondary w-[5%] rounded-full"></div>
                  </div>
                  <span className="w-10 font-label-sm text-label-sm font-semibold text-on-surface">5%</span>
                </div>
              </div>

              {/* Body Type Filter Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-3">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Lọc theo:</span>
                <button className="px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm font-semibold" type="button">Tất cả dáng người</button>
                <button className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm" type="button">Thấp bé (&lt; 1m60)</button>
                <button className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm" type="button">Trung bình (1m60 - 1m68)</button>
                <button className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm" type="button">Cao (1m68+)</button>
                <button className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center gap-1" type="button">
                  <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                  <span>Có Ảnh (42)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* Review 1 */}
          <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-[0_8px_24px_-4px_rgba(36,30,26,0.04)] flex flex-col justify-between gap-space-md">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    className="w-11 h-11 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyHaK5sszAWjjVpz_eXTrZuk36zxStW91raGW1l4s3rLXw3Kv6awU2mhFl6pYxh_iL9v81aZQgsq9jhfoPVTtJQMDTZa78txz3LMSfVbTICx8CIUOWnbDIwYFioPLwmrBIxrOBqGyKFx8ampl6a0OaNp-71rmtENjlpMnrgmfSU39Wwm5-yI-zkzdrP-FHNGUfLNaDO3lqDzf47zg25M-l5sLkEqNq93vl5dlWiElgqXOMXe5yBl1nvA"
                    alt="Customer"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h5 className="font-headline-sm text-[16px] text-on-surface font-semibold">Elena Rostova</h5>
                      <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                    </div>
                    <span className="font-body-sm text-[12px] text-on-surface-variant">Thuê cho Tiệc cưới mùa hè</span>
                  </div>
                </div>
                <div className="flex items-center text-[#d48c3b]">
                  <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 font-label-sm text-[11px]">
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant">Cao: 1m72</span>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant">Size thường mặc: S</span>
                <span className="px-2.5 py-0.5 rounded-full bg-primary-container/60 text-on-primary-container font-semibold">Thuê size: S (Vừa in)</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                "Không thể đếm xuể số lời khen mình nhận được! Chất lụa nặng dệt thủ công tạo cảm giác như mặc đồ Haute Couture mà không bị hằn khuyết điểm. Mình đi cao gót 7cm và tùng váy quét đất trông cực kì thướt tha. Có thêm size dự phòng miễn phí làm mình rất an tâm."
              </p>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <div className="w-16 h-20 rounded-DEFAULT overflow-hidden bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCq8LctqQ4r3PGFClEmCwEs99xbXkM1bdQwaJqltV6SiZnMYc5C6lU_GKCjEJ1lNbWPyiiqQ5NL8iOLSkJ8OGPRAXaw8Fm7CLuQ7C2g9iaTViQUdCn7Nk2LN3S01eGzNYy7um2uMv1QSpAB9tZfi2cpDwEm8_IA3RiWhurq_VT895eFCg5Xcf6RHpfnpM6MXFLfivZ0KtYpIWDdT7zKryXDuSY_4JJf5mPp5Jaieb4LLlJi8meNyDdEOA"
                  alt="Review 1"
                />
              </div>
              <div className="w-16 h-20 rounded-DEFAULT overflow-hidden bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdDQ9lgrFU4PgAiIDy3xToLh5_bFfK0OaPOZzQTKkefrBsUzVFrvMK5eW-LBpSBMCZMkGbfQ4x19WyJQKnkE8Ta4AWtgcSzEHprjnw4yA9aFwdOyBgJwWhCapWt7wWRuvRNsKdktfSSmWDuGzHAlGo-bVna6Z_oahK6Xpsh6M56RBP_UkSHNtdOx5aLrGmx8vzLQxF6AI5PbsoDcKDA-pw72-kYh_EknnHp5iw9EWxlr1cDcbM-2PK6Q"
                  alt="Review 2"
                />
              </div>
              <span className="font-label-sm text-[11px] text-on-surface-variant pl-2">Đăng ngày 29/09/2026</span>
            </div>
          </div>

          {/* Review 2 */}
          <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-[0_8px_24px_-4px_rgba(36,30,26,0.04)] flex flex-col justify-between gap-space-md">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    className="w-11 h-11 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkNDnzg5G7OgRVIGCFg-8Xj79EydYFKtZWttzQyel53thp5LYF9kSKaamEBVwjv-0ubc0qVFejz82NeleiEzjTtBBMPKppUs3bHlK-_1qIq4w93aG7nUDSnj7cs0TYG8G51lcrPyAUYQi85x4-Af_5FMpsIAnwhy1qKsr3zeVuM-Z9WabKJ2fVapIszMlRxb509cfV0YUMcXPyW-eXQAobxxOsU850JjD5GFjLFSwMrWpnogzPqCmGIQ"
                    alt="Customer 2"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h5 className="font-headline-sm text-[16px] text-on-surface font-semibold">Morgan Chen</h5>
                      <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                    </div>
                    <span className="font-body-sm text-[12px] text-on-surface-variant">Thuê cho Sự kiện Gala từ thiện</span>
                  </div>
                </div>
                <div className="flex items-center text-[#d48c3b]">
                  <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 font-label-sm text-[11px]">
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant">Cao: 1m62</span>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant">Size thường mặc: M</span>
                <span className="px-2.5 py-0.5 rounded-full bg-primary-container/60 text-on-primary-container font-semibold">Thuê size: M & S (Mặc M)</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                "Với chiều cao 1m62 mình khá lo về độ dài, nhưng khi phối cùng giày platform 9cm thì thật sự xuất sắc. Màu sắc không phải vàng óng ả mà là màu champagne taupe rất tôn da. Túi trả hàng được trả cước trước làm cho việc hoàn trả sáng thứ Hai trở nên vô cùng dễ dàng!"
              </p>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <div className="w-16 h-20 rounded-DEFAULT overflow-hidden bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDulz9PDTQBEJ1a8aytindh7SQbUTGrrO5yZ6kVzXHQNFxZteYH2V7_F7gvtkJYXwX3gzCFcRqW4AP0Zv702mJ353eRtcArqaHulF7IBt7wxbh4uFNJdJ5nF7p0K9xnUkFKN2JrVFb-oucFvNtYlAXM8jhAht0aXbT5dmqVooJjXfxYbIwFxChKvd3vQ34HXrXW6HAqq87WB1XPZOimMbU4GOiNeKpWIlSwSl0Yph12vpA7TDuw3A0Fcg"
                  alt="Review 3"
                />
              </div>
              <span className="font-label-sm text-[11px] text-on-surface-variant pl-2">Đăng ngày 12/10/2026</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-space-lg">
          <button className="px-space-xl py-3 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-lg text-label-lg font-semibold transition-colors flex items-center gap-2" type="button">
            <span>Đọc tất cả 128 Đánh giá</span>
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
        </div>
      </div>
    </section>
  );
}
