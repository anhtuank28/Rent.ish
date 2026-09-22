"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import VietQrPaymentModal, { VietQrData } from '../../components/features/checkout/VietQrPaymentModal';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, isHydrated, clearCart } = useCartStore();
  const { user, isAuthenticated, isLoading: authLoading, checkAuth } = useAuthStore();
  
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    district: '',
    ward: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<'VIETQR' | 'COD'>('VIETQR');
  const [qrData, setQrData] = useState<VietQrData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/checkout');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (user && !address.fullName) {
      setAddress(prev => ({
        ...prev,
        fullName: user.fullName || prev.fullName
      }));
    }
  }, [user]);

  const subtotal = items.reduce((sum, item) => {
    const price = item?.product?.price || 0;
    const start = new Date(item?.rentalStartDate || Date.now()).getTime();
    const end = new Date(item?.rentalEndDate || Date.now()).getTime();
    const days = Math.ceil((end - start) / (1000 * 3600 * 24)) || 1;
    return sum + (price * days);
  }, 0);
  const shippingFee = 30; // 30K
  const total = subtotal + shippingFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. Đồng bộ giỏ hàng LocalStorage lên Backend Database
      const syncRes = await fetch('/api/cart/merge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ localItems: items })
      });

      if (syncRes.status === 401) {
        router.push('/login?redirect=/checkout');
        return;
      }

      // 2. Gửi request tạo đơn đặt thuê
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          address,
          paymentMethod,
          items
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Đặt hàng thất bại');
        return;
      }

      const booking = data.data;

      // 3. Nếu chọn Chuyển khoản VietQR: Tạo mã QR và mở modal
      if (paymentMethod === 'VIETQR') {
        const rawTotal = Number(booking.total_price);
        const paymentAmount = rawTotal >= 10000 ? rawTotal : rawTotal * 1000;

        const qrRes = await fetch('/api/payment/create-qr', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            bookingId: booking.id,
            amount: paymentAmount,
            description: `RENTISH ${booking.id.slice(0, 8)}`,
          }),
        });

        const qrJson = await qrRes.json();
        if (!qrRes.ok || !qrJson.success) {
          setError(qrJson.message || 'Không thể tạo mã VietQR thanh toán. Vui lòng thử lại.');
          return;
        }

        // Mở modal VietQR thanh toán
        setQrData({
          ...qrJson.data,
          bookingId: booking.id,
        });
        return;
      }

      // 4. Nếu chọn COD: hoàn tất ngay và chuyển tới trang thành công
      clearCart();
      router.push('/checkout/success');
    } catch {
      setError('Lỗi kết nối. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    clearCart();
    setQrData(null);
    router.push('/checkout/success');
  };

  const handlePaymentClose = () => {
    const confirmClose = window.confirm(
      'Đơn đặt thuê đã được lưu vào hệ thống ở trạng thái Chờ thanh toán. Bạn có muốn chuyển đến trang Quản lý đơn hàng?'
    );
    if (confirmClose) {
      clearCart();
      setQrData(null);
      router.push('/orders');
    } else {
      setQrData(null);
    }
  };

  if (!isHydrated || authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (items.length === 0 && !qrData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center p-8 bg-surface-container rounded-xl">
          <p className="text-body-lg text-on-surface mb-4">Giỏ hàng của bạn đang trống.</p>
          <button onClick={() => router.push('/')} className="px-6 py-2 bg-primary text-on-primary rounded-full">
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-surface py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Cột trái: Form Địa chỉ + Chọn phương thức thanh toán */}
        <div className="space-y-6">
          {/* Form Địa chỉ */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">local_shipping</span>
              Thông Tin Giao Hàng
            </h2>
            
            {error && (
              <div className="mb-4 p-3 bg-error-container text-error rounded-lg text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-base">error</span>
                {error}
              </div>
            )}

            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-label-md mb-1 text-on-surface">Họ và tên</label>
                <input required value={address.fullName} onChange={e => setAddress({...address, fullName: e.target.value})} className="w-full h-11 px-4 bg-surface-container-low rounded-lg outline-none focus:ring-2 focus:ring-primary/50 text-body-md" placeholder="Nguyễn Văn A" />
              </div>
              <div>
                <label className="block text-label-md mb-1 text-on-surface">Số điện thoại</label>
                <input required value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} className="w-full h-11 px-4 bg-surface-container-low rounded-lg outline-none focus:ring-2 focus:ring-primary/50 text-body-md" placeholder="0912 345 678" />
              </div>
              <div>
                <label className="block text-label-md mb-1 text-on-surface">Địa chỉ cụ thể (Số nhà, tên đường)</label>
                <input required value={address.street} onChange={e => setAddress({...address, street: e.target.value})} className="w-full h-11 px-4 bg-surface-container-low rounded-lg outline-none focus:ring-2 focus:ring-primary/50 text-body-md" placeholder="Số 123 đường Lê Lợi" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-label-md mb-1 text-on-surface">Phường/Xã</label>
                  <input required value={address.ward} onChange={e => setAddress({...address, ward: e.target.value})} className="w-full h-11 px-4 bg-surface-container-low rounded-lg outline-none focus:ring-2 focus:ring-primary/50 text-body-sm" placeholder="Phường Bến Nghé" />
                </div>
                <div>
                  <label className="block text-label-md mb-1 text-on-surface">Quận/Huyện</label>
                  <input required value={address.district} onChange={e => setAddress({...address, district: e.target.value})} className="w-full h-11 px-4 bg-surface-container-low rounded-lg outline-none focus:ring-2 focus:ring-primary/50 text-body-sm" placeholder="Quận 1" />
                </div>
                <div>
                  <label className="block text-label-md mb-1 text-on-surface">Tỉnh/TP</label>
                  <input required value={address.city} onChange={e => setAddress({...address, city: e.target.value})} className="w-full h-11 px-4 bg-surface-container-low rounded-lg outline-none focus:ring-2 focus:ring-primary/50 text-body-sm" placeholder="TP. Hồ Chí Minh" />
                </div>
              </div>
            </form>
          </div>

          {/* Phương thức thanh toán */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
              Phương Thức Thanh Toán
            </h2>

            <div className="space-y-3">
              {/* Option 1: VietQR PayOS */}
              <label 
                onClick={() => setPaymentMethod('VIETQR')}
                className={`relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'VIETQR' 
                    ? 'border-primary bg-primary-container/10 ring-1 ring-primary/20' 
                    : 'border-outline-variant/30 hover:border-outline-variant hover:bg-surface-container-lowest'
                }`}
              >
                <div className="pt-0.5">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="VIETQR"
                    checked={paymentMethod === 'VIETQR'}
                    onChange={() => setPaymentMethod('VIETQR')}
                    className="w-4 h-4 text-primary focus:ring-primary accent-primary"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-title-md text-on-surface font-semibold">Chuyển khoản VietQR tự động</span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-300">
                      ⚡ Xác nhận 1-2s
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800">
                      Khuyên dùng
                    </span>
                  </div>
                  <p className="text-body-sm text-on-surface-variant">
                    Quét mã QR qua app ngân hàng bất kỳ (MB, VCB, Momo, Techcombank, ...). Hệ thống tự động kích hoạt đơn hàng không cần gửi bill.
                  </p>
                </div>
              </label>

              {/* Option 2: COD */}
              <label 
                onClick={() => setPaymentMethod('COD')}
                className={`relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'COD' 
                    ? 'border-primary bg-primary-container/10 ring-1 ring-primary/20' 
                    : 'border-outline-variant/30 hover:border-outline-variant hover:bg-surface-container-lowest'
                }`}
              >
                <div className="pt-0.5">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="w-4 h-4 text-primary focus:ring-primary accent-primary"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-title-md text-on-surface font-semibold">Thanh toán khi nhận hàng (COD)</span>
                  </div>
                  <p className="text-body-sm text-on-surface-variant">
                    Thanh toán tiền mặt trực tiếp cho nhân viên giao hàng khi nhận trang phục.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Cột phải: Tóm tắt đơn hàng */}
        <div className="bg-surface-container-low p-6 rounded-2xl h-fit sticky top-24">
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-6">Tóm Tắt Đơn Đặt</h2>
          
          <div className="space-y-4 mb-6 max-h-[340px] overflow-y-auto pr-1">
            {items.map(item => (
              <div key={item.id} className="flex gap-4 items-center bg-surface-container-lowest p-3 rounded-xl">
                <img src={item.product?.image || ''} className="w-16 h-20 object-cover rounded-lg bg-surface-container-high shrink-0" alt={item.product?.name || 'Sản phẩm'} />
                <div className="flex-1 min-w-0">
                  <h4 className="text-label-md text-on-surface font-medium truncate">{item.product?.name || 'Sản phẩm'}</h4>
                  <p className="text-body-xs text-on-surface-variant">Size: {item.product?.size || 'N/A'}</p>
                  <p className="text-body-xs text-primary font-semibold mt-1">
                    {item.product?.price ? `${Number(item.product.price).toLocaleString('vi-VN')}K/ngày` : 'N/A'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-4 border-t border-surface-container-high text-body-md text-on-surface">
            <div className="flex justify-between">
              <span>Tạm tính</span>
              <span>{subtotal}.000đ</span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển</span>
              <span>{shippingFee}.000đ</span>
            </div>
            <div className="flex justify-between font-title-lg text-title-lg text-primary pt-2 border-t border-dashed border-outline-variant/30">
              <span>Tổng thanh toán</span>
              <span>{total}.000đ</span>
            </div>
          </div>

          <button 
            type="submit" 
            form="checkout-form"
            disabled={isLoading}
            className="w-full mt-8 h-12 rounded-full bg-primary text-on-primary font-label-lg transition-transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            {isLoading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Đang khởi tạo đơn...
              </>
            ) : paymentMethod === 'VIETQR' ? (
              <>
                <span className="material-symbols-outlined text-xl">qr_code_scanner</span>
                Thanh toán qua VietQR ngay
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-xl">check_circle</span>
                Xác nhận Đặt Thuê (COD)
              </>
            )}
          </button>

          <p className="text-center text-body-xs text-on-surface-variant mt-4">
            🔒 Thông tin của bạn được bảo mật tuyệt đối theo chuẩn PCI-DSS & Napas 247
          </p>
        </div>
      </div>

      {/* Modal Thanh toán VietQR */}
      {qrData && (
        <VietQrPaymentModal
          qrData={qrData}
          onSuccess={handlePaymentSuccess}
          onClose={handlePaymentClose}
        />
      )}
    </main>
  );
}
