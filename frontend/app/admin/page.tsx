"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Booking {
  id: string;
  total_price: string;
  status: string;
  created_at: string;
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
  items: Array<{
    inventory_unit: {
      variant: {
        size: string;
        product: {
          name: string;
          image_url: string;
        };
      };
    };
  }>;
}

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [productCount, setProductCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [bookingsRes, productsRes] = await Promise.all([
          fetch('/api/bookings', { credentials: 'include' }),
          fetch('/api/products')
        ]);

        const bookingsJson = await bookingsRes.json();
        const productsJson = await productsRes.json();

        if (bookingsJson.success) {
          setBookings(bookingsJson.data || []);
        }
        if (productsJson.success) {
          setProductCount(productsJson.data?.length || 0);
        }
      } catch (err) {
        console.error("Lỗi tải dữ liệu dashboard", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const totalRevenue = bookings.reduce((sum, b) => sum + Number(b.total_price || 0), 0);
  const pendingOrders = bookings.filter(b => b.status === 'PENDING').length;
  const confirmedOrders = bookings.filter(b => b.status === 'CONFIRMED').length;

  const stats = [
    {
      title: 'Tổng Đơn Thuê',
      value: bookings.length,
      icon: 'receipt_long',
      color: 'text-primary bg-primary/10 border-primary/20',
      hint: `${pendingOrders} đơn chờ xử lý`
    },
    {
      title: 'Doanh Thu Thuê',
      value: `${(totalRevenue / 1000).toLocaleString('vi-VN')}K`,
      icon: 'payments',
      color: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20',
      hint: 'Đơn đã xác nhận & chờ thanh toán'
    },
    {
      title: 'Đang Thuê / Đã Duyệt',
      value: confirmedOrders,
      icon: 'hourglass_top',
      color: 'text-amber-600 bg-amber-500/10 border-amber-500/20',
      hint: 'Trang phục đang lưu thông'
    },
    {
      title: 'Sản Phẩm Trong Kho',
      value: productCount,
      icon: 'styler',
      color: 'text-purple-600 bg-purple-500/10 border-purple-500/20',
      hint: 'Các mẫu váy & áo dạ hội'
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-700 border border-emerald-500/20">ĐÃ XÁC NHẬN</span>;
      case 'COMPLETED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/15 text-blue-700 border border-blue-500/20">HOÀN TẤT</span>;
      case 'CANCELLED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/15 text-rose-700 border border-rose-500/20">ĐÃ HỦY</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/15 text-amber-700 border border-amber-500/20">CHỜ DUYỆT</span>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-md text-headline-md font-semibold text-on-surface">
            Bảng Điều Khiển Quản Trị
          </h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Tổng quan tình hình kinh doanh cho thuê thời trang cao cấp Rent-ish.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-on-primary rounded-xl font-label-md hover:bg-primary/90 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Thêm Sản Phẩm</span>
          </Link>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-surface-container-lowest border border-surface-container text-on-surface rounded-xl font-label-md hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">list_alt</span>
            <span>Xem Tất Cả Đơn</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-low shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-label-md text-on-surface-variant font-medium">{stat.title}</span>
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${stat.color}`}>
                <span className="material-symbols-outlined text-[22px]">{stat.icon}</span>
              </div>
            </div>
            <div>
              <div className="font-headline-md text-[28px] font-bold text-on-surface tracking-tight">
                {stat.value}
              </div>
              <p className="text-[12px] text-secondary mt-1">{stat.hint}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Section */}
      <div className="bg-surface-container-lowest rounded-2xl border border-surface-container-low p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-title-lg text-title-lg font-semibold text-on-surface">Đơn Thuê Mới Nhất</h2>
            <p className="text-body-sm text-secondary">Danh sách các đơn đặt thuê gần đây cần xử lý</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-label-md text-primary hover:underline font-semibold flex items-center gap-1"
          >
            Xem tất cả
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="py-12 text-center text-secondary">
            <span className="material-symbols-outlined text-[48px] opacity-40 mb-2">inbox</span>
            <p>Chưa có đơn đặt thuê nào trên hệ thống.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-container-low text-[12px] font-semibold text-secondary uppercase tracking-wider">
                  <th className="pb-3 px-3">Mã đơn</th>
                  <th className="pb-3 px-3">Khách hàng</th>
                  <th className="pb-3 px-3">Sản phẩm</th>
                  <th className="pb-3 px-3">Tổng tiền</th>
                  <th className="pb-3 px-3">Ngày tạo</th>
                  <th className="pb-3 px-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low text-body-sm text-on-surface">
                {bookings.slice(0, 5).map((order) => {
                  const customerName = `${order.user?.first_name || ''} ${order.user?.last_name || ''}`.trim() || order.user?.email || 'N/A';
                  const primaryItem = order.items?.[0]?.inventory_unit?.variant?.product;
                  const itemSize = order.items?.[0]?.inventory_unit?.variant?.size;

                  return (
                    <tr key={order.id} className="hover:bg-surface-container-low/40 transition-colors">
                      <td className="py-4 px-3 font-mono text-xs font-semibold text-primary">
                        #{order.id.slice(0, 8)}
                      </td>
                      <td className="py-4 px-3">
                        <p className="font-medium text-on-surface">{customerName}</p>
                        <p className="text-[12px] text-secondary">{order.user?.email}</p>
                      </td>
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-3">
                          {primaryItem?.image_url && (
                            <img
                              src={primaryItem.image_url}
                              alt=""
                              className="w-9 h-11 object-cover rounded-md bg-surface-container"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="font-medium truncate max-w-[200px]">{primaryItem?.name || 'Sản phẩm thuê'}</p>
                            <p className="text-[11px] text-secondary">Size: {itemSize || 'Freesize'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-3 font-semibold text-on-surface">
                        {Number(order.total_price).toLocaleString('vi-VN')}đ
                      </td>
                      <td className="py-4 px-3 text-secondary text-xs">
                        {new Date(order.created_at).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="py-4 px-3">
                        {getStatusBadge(order.status)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
