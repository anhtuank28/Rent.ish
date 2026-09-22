"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';

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

      // 2. Gửi request tạo đơn đặt thuê kèm fallback items
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          address,
          paymentMethod: 'COD',
          items
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Đặt hàng thất bại');
        return;
      }

      // Xóa giỏ hàng local và chuyển sang trang thành công
      clearCart();
      router.push('/checkout/success');
    } catch {
      setError('Lỗi kết nối. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isHydrated || authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (items.length === 0) {
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
        
        {/* Form Địa chỉ */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm">
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-6">Thông Tin Giao Hàng</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-error-container text-error rounded-lg text-sm">
              {error}
            </div>
          )}

          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-label-md mb-1 text-on-surface">Họ và tên</label>
              <input required value={address.fullName} onChange={e => setAddress({...address, fullName: e.target.value})} className="w-full h-11 px-4 bg-surface-container-low rounded-lg outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="block text-label-md mb-1 text-on-surface">Số điện thoại</label>
              <input required value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} className="w-full h-11 px-4 bg-surface-container-low rounded-lg outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="block text-label-md mb-1 text-on-surface">Địa chỉ cụ thể (Số nhà, đường)</label>
              <input required value={address.street} onChange={e => setAddress({...address, street: e.target.value})} className="w-full h-11 px-4 bg-surface-container-low rounded-lg outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-label-md mb-1 text-on-surface">Phường/Xã</label>
                <input required value={address.ward} onChange={e => setAddress({...address, ward: e.target.value})} className="w-full h-11 px-4 bg-surface-container-low rounded-lg outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="block text-label-md mb-1 text-on-surface">Quận/Huyện</label>
                <input required value={address.district} onChange={e => setAddress({...address, district: e.target.value})} className="w-full h-11 px-4 bg-surface-container-low rounded-lg outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="block text-label-md mb-1 text-on-surface">Tỉnh/TP</label>
                <input required value={address.city} onChange={e => setAddress({...address, city: e.target.value})} className="w-full h-11 px-4 bg-surface-container-low rounded-lg outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
            </div>
          </form>
        </div>

        {/* Tóm tắt đơn hàng */}
        <div className="bg-surface-container-low p-6 rounded-2xl">
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-6">Tóm Tắt Đơn Đặt</h2>
          
          <div className="space-y-4 mb-6">
            {items.map(item => (
              <div key={item.id} className="flex gap-4 items-center">
                <img src={item.product?.image || ''} className="w-16 h-20 object-cover rounded-md bg-surface-container-high" alt={item.product?.name || 'Sản phẩm'} />
                <div className="flex-1">
                  <h4 className="text-label-md text-on-surface font-medium truncate">{item.product?.name || 'Sản phẩm chưa rõ'}</h4>
                  <p className="text-body-sm text-on-surface-variant">Size: {item.product?.size || 'N/A'}</p>
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
            <div className="flex justify-between font-title-lg text-title-lg text-primary pt-2">
              <span>Tổng cộng</span>
              <span>{total}.000đ</span>
            </div>
          </div>

          <button 
            type="submit" 
            form="checkout-form"
            disabled={isLoading}
            className="w-full mt-8 h-12 rounded-full bg-primary text-on-primary font-label-lg transition-transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? 'Đang xử lý...' : 'Xác nhận Đặt Thuê'}
          </button>
        </div>
      </div>
    </main>
  );
}
