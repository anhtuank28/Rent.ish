"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/layout/Navbar';
import { useAuthStore } from '../../store/authStore';

interface Order {
  id: string;
  total_price?: string | number;
  total_amount?: string | number;
  shipping_fee?: string | number;
  status: string;
  created_at: string;
  items: {
    inventory_unit: {
      variant: {
        product: {
          name: string;
          image_url: string;
          rental_price?: string | number;
        };
        size: string;
        color: string;
      };
    };
    rental_start_date?: string | null;
    rental_end_date?: string | null;
    start_date?: string | null;
    end_date?: string | null;
    price?: string | number;
  }[];
}

export default function OrdersPage() {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchOrders = async () => {
        try {
          const res = await fetch('/api/bookings/my-orders');
          const json = await res.json();
          if (json.success) {
            setOrders(json.data);
          }
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        } finally {
          setLoadingOrders(false);
        }
      };
      fetchOrders();
    } else if (!isLoading) {
      setLoadingOrders(false);
    }
  }, [isAuthenticated, isLoading]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <span className="px-2 py-1 rounded text-xs font-semibold bg-warning-container text-on-warning-container">Chờ xác nhận</span>;
      case 'CONFIRMED':
        return <span className="px-2 py-1 rounded text-xs font-semibold bg-info-container text-on-info-container">Đã xác nhận</span>;
      case 'SHIPPED':
        return <span className="px-2 py-1 rounded text-xs font-semibold bg-primary-container text-on-primary-container">Đang giao</span>;
      case 'COMPLETED':
        return <span className="px-2 py-1 rounded text-xs font-semibold bg-success-container text-on-success-container">Hoàn thành</span>;
      case 'CANCELLED':
        return <span className="px-2 py-1 rounded text-xs font-semibold bg-error-container text-on-error-container">Đã hủy</span>;
      default:
        return <span className="px-2 py-1 rounded text-xs font-semibold bg-surface-container-high text-on-surface">Không xác định</span>;
    }
  };

  if (isLoading || loadingOrders) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background pt-28 pb-12 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </main>
      </>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background pt-28 pb-12">
          <div className="max-w-4xl mx-auto px-4 text-center py-20">
            <span className="material-symbols-outlined text-6xl text-outline mb-4">lock</span>
            <h1 className="text-2xl font-bold mb-4">Vui lòng đăng nhập</h1>
            <p className="text-on-surface-variant mb-8">Bạn cần đăng nhập để xem lịch sử đơn hàng của mình.</p>
            <Link href="/login" className="bg-primary text-on-primary px-6 py-3 rounded-full hover:bg-primary/90 transition-colors">
              Đăng nhập ngay
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-28 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-bold font-headline-lg text-on-surface mb-8">Lịch Sử Đơn Hàng</h1>
          
          {orders.length === 0 ? (
            <div className="bg-surface-container-low rounded-xl p-12 text-center border border-surface-container">
              <span className="material-symbols-outlined text-6xl text-outline mb-4">receipt_long</span>
              <h2 className="text-xl font-semibold mb-2">Chưa có đơn hàng nào</h2>
              <p className="text-on-surface-variant mb-6">Bạn chưa thuê trang phục nào từ Rent-ish.</p>
              <Link href="/dresses" className="bg-primary-container text-on-primary-container px-6 py-3 rounded-full hover:bg-primary-container/80 transition-colors font-label-lg">
                Khám phá bộ sưu tập
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-surface-container-lowest rounded-xl border border-surface-container overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Order Header */}
                  <div className="bg-surface-container-low px-6 py-4 border-b border-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-xs text-on-surface-variant uppercase font-semibold mb-1">Mã đơn hàng</p>
                        <p className="font-mono text-sm">{order.id.split('-')[0].toUpperCase()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-on-surface-variant uppercase font-semibold mb-1">Ngày đặt</p>
                        <p className="text-sm">{new Date(order.created_at).toLocaleDateString('vi-VN')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-on-surface-variant uppercase font-semibold mb-1">Tổng tiền</p>
                        <p className="text-sm font-bold text-primary">
                          {(() => {
                            const raw = order.total_price ?? order.total_amount;
                            const num = Number(raw);
                            if (isNaN(num) || num <= 0) return '0đ';
                            return num >= 1000 ? `${(num / 1000).toLocaleString('vi-VN')}K` : `${num.toLocaleString('vi-VN')}đ`;
                          })()}
                        </p>
                      </div>
                    </div>
                    <div>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                  
                  {/* Order Items */}
                  <div className="p-6">
                    <ul className="space-y-6">
                      {order.items.map((item, idx) => {
                        const product = item.inventory_unit.variant.product;
                        const variant = item.inventory_unit.variant;
                        
                        return (
                          <li key={idx} className="flex flex-col sm:flex-row gap-6 items-start">
                            <div className="w-24 h-32 bg-surface-container rounded-md overflow-hidden shrink-0 relative">
                              <img 
                                src={product.image_url || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800'} 
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 flex flex-col h-full justify-between">
                              <div>
                                <h3 className="font-semibold text-lg text-on-surface mb-1">{product.name}</h3>
                                <p className="text-sm text-on-surface-variant mb-2">Size: {variant.size} | Màu: {variant.color}</p>
                                <div className="flex items-center gap-2 text-xs bg-surface-container-low w-fit px-2 py-1 rounded text-on-surface-variant">
                                  <span className="material-symbols-outlined text-[14px]">calendar_month</span>
                                  <span>
                                    {(() => {
                                      const start = item.rental_start_date || item.start_date;
                                      const end = item.rental_end_date || item.end_date;
                                      const validStart = start && !isNaN(new Date(start).getTime());
                                      const validEnd = end && !isNaN(new Date(end).getTime());
                                      if (validStart && validEnd) {
                                        return `${new Date(start!).toLocaleDateString('vi-VN')} - ${new Date(end!).toLocaleDateString('vi-VN')}`;
                                      }
                                      return 'Gói thuê 4 ngày tiêu chuẩn';
                                    })()}
                                  </span>
                                </div>
                              </div>
                              <div className="mt-4 sm:mt-0 font-semibold text-on-surface">
                                {(() => {
                                  const rawPrice = item.price ?? product.rental_price;
                                  const numPrice = Number(rawPrice);
                                  if (isNaN(numPrice) || numPrice <= 0) return '0đ / kỳ thuê';
                                  return numPrice >= 1000 ? `${(numPrice / 1000).toLocaleString('vi-VN')}K / kỳ thuê` : `${numPrice.toLocaleString('vi-VN')}đ / kỳ thuê`;
                                })()}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
