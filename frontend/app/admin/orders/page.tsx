"use client";

import React, { useEffect, useState } from 'react';
import { authFetch } from '@/store/authStore';

interface BookingItem {
  id: string;
  inventory_unit: {
    barcode: string;
    variant: {
      size: string;
      color: string;
      product: {
        id: string;
        name: string;
        image_url: string;
      };
    };
  };
}

interface Booking {
  id: string;
  total_price: string;
  shipping_fee: string;
  status: string;
  created_at: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  shipping_address?: {
    full_name: string;
    phone: string;
    street: string;
    ward: string;
    district: string;
    city: string;
  };
  payment_transaction?: {
    provider: string;
    status: string;
  };
  items: BookingItem[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Booking[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const res = await authFetch('/api/bookings');
      const json = await res.json();
      if (json.success) {
        setOrders(json.data || []);
      }
    } catch (err) {
      console.error("Lỗi lấy danh sách đơn:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await authFetch(`/api/bookings/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });

      const json = await res.json();
      if (json.success) {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        setToastMessage(`Đã cập nhật trạng thái đơn #${orderId.slice(0, 8)} sang ${newStatus}!`);
        setTimeout(() => setToastMessage(null), 3500);
      } else {
        alert(json.message || "Cập nhật thất bại");
      }
    } catch {
      alert("Lỗi kết nối máy chủ");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = filterStatus === 'ALL' 
    ? orders 
    : orders.filter(o => o.status === filterStatus);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-700 border border-emerald-500/20">ĐÃ XÁC NHẬN</span>;
      case 'COMPLETED':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-700 border border-blue-500/20">HOÀN TẤT</span>;
      case 'CANCELLED':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-700 border border-rose-500/20">ĐÃ HỦY</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-700 border border-amber-500/20">CHỜ DUYỆT</span>;
    }
  };

  const filterTabs = [
    { label: 'Tất cả', value: 'ALL', count: orders.length },
    { label: 'Chờ duyệt', value: 'PENDING', count: orders.filter(o => o.status === 'PENDING').length },
    { label: 'Đã xác nhận', value: 'CONFIRMED', count: orders.filter(o => o.status === 'CONFIRMED').length },
    { label: 'Hoàn tất', value: 'COMPLETED', count: orders.filter(o => o.status === 'COMPLETED').length },
    { label: 'Đã hủy', value: 'CANCELLED', count: orders.filter(o => o.status === 'CANCELLED').length },
  ];

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-on-surface text-surface rounded-xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <span className="material-symbols-outlined text-emerald-400 text-[20px]">check_circle</span>
          <span className="text-body-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-md text-headline-md font-semibold text-on-surface">
            Quản Lý Đơn Thuê
          </h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Theo dõi, xử lý và cập nhật tiến trình đơn hàng của khách thuê.
          </p>
        </div>
        <button
          onClick={fetchOrders}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-xl font-label-md transition-colors"
        >
          <span className={`material-symbols-outlined text-[18px] ${isLoading ? 'animate-spin' : ''}`}>refresh</span>
          <span>Làm mới</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 p-1.5 bg-surface-container-low rounded-2xl w-fit overflow-x-auto">
        {filterTabs.map((tab) => {
          const isActive = filterStatus === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setFilterStatus(tab.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-label-md transition-all ${
                isActive
                  ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-sm'
                  : 'text-secondary hover:text-on-surface'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                isActive ? 'bg-primary/10 text-primary font-bold' : 'bg-surface-container text-secondary'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Orders Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-surface-container-low shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-24 text-center text-secondary">
            <span className="material-symbols-outlined text-[48px] opacity-40 mb-2">production_quantity_limits</span>
            <p>Không có đơn đặt thuê nào trong danh mục này.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/40 border-b border-surface-container-low text-[11px] font-semibold text-secondary uppercase tracking-wider">
                  <th className="py-3.5 px-4">Mã Đơn</th>
                  <th className="py-3.5 px-4">Khách Hàng & Địa Chỉ</th>
                  <th className="py-3.5 px-4">Trang Phục Thuê</th>
                  <th className="py-3.5 px-4">Tổng Tiền</th>
                  <th className="py-3.5 px-4">Trạng Thái</th>
                  <th className="py-3.5 px-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low text-body-sm text-on-surface">
                {filteredOrders.map((order) => {
                  const customerName = order.shipping_address?.full_name || `${order.user?.first_name || ''} ${order.user?.last_name || ''}`.trim() || order.user?.email;
                  const phone = order.shipping_address?.phone || 'Chưa có SĐT';
                  const fullAddress = order.shipping_address 
                    ? `${order.shipping_address.street}, ${order.shipping_address.ward}, ${order.shipping_address.district}, ${order.shipping_address.city}`
                    : 'Địa chỉ chưa cập nhật';

                  const isUpdating = updatingId === order.id;

                  return (
                    <tr key={order.id} className="hover:bg-surface-container-low/30 transition-colors">
                      {/* Mã đơn */}
                      <td className="py-4 px-4 align-top">
                        <span className="font-mono text-xs font-bold text-primary block">
                          #{order.id.slice(0, 8)}
                        </span>
                        <span className="text-[11px] text-secondary">
                          {new Date(order.created_at).toLocaleDateString('vi-VN')}
                        </span>
                      </td>

                      {/* Khách hàng & Địa chỉ */}
                      <td className="py-4 px-4 align-top max-w-[240px]">
                        <p className="font-semibold text-on-surface">{customerName}</p>
                        <p className="text-[12px] text-primary font-medium">{phone}</p>
                        <p className="text-[11px] text-secondary mt-1 line-clamp-2" title={fullAddress}>
                          {fullAddress}
                        </p>
                      </td>

                      {/* Sản phẩm thuê */}
                      <td className="py-4 px-4 align-top">
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-2.5">
                              {item.inventory_unit?.variant?.product?.image_url && (
                                <img
                                  src={item.inventory_unit.variant.product.image_url}
                                  alt=""
                                  className="w-10 h-12 object-cover rounded-md bg-surface-container shrink-0"
                                />
                              )}
                              <div className="min-w-0">
                                <p className="font-medium text-xs truncate max-w-[180px]">
                                  {item.inventory_unit?.variant?.product?.name || 'Váy thuê'}
                                </p>
                                <p className="text-[11px] text-secondary">
                                  Size: <span className="font-semibold text-on-surface">{item.inventory_unit?.variant?.size}</span> | Mã: {item.inventory_unit?.barcode}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Tổng tiền */}
                      <td className="py-4 px-4 align-top">
                        <p className="font-bold text-on-surface">
                          {Number(order.total_price).toLocaleString('vi-VN')}đ
                        </p>
                        <span className="text-[11px] text-secondary">
                          COD / Đặt cọc 0đ
                        </span>
                      </td>

                      {/* Trạng thái */}
                      <td className="py-4 px-4 align-top">
                        {getStatusBadge(order.status)}
                      </td>

                      {/* Thao tác */}
                      <td className="py-4 px-4 align-top text-right">
                        <div className="flex flex-col items-end gap-1.5">
                          {order.status === 'PENDING' && (
                            <>
                              <button
                                onClick={() => handleUpdateStatus(order.id, 'CONFIRMED')}
                                disabled={isUpdating}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
                              >
                                {isUpdating ? '...' : 'Duyệt đơn'}
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(order.id, 'CANCELLED')}
                                disabled={isUpdating}
                                className="px-2.5 py-1 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-medium transition-colors"
                              >
                                Hủy đơn
                              </button>
                            </>
                          )}

                          {order.status === 'CONFIRMED' && (
                            <>
                              <button
                                onClick={() => handleUpdateStatus(order.id, 'COMPLETED')}
                                disabled={isUpdating}
                                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
                              >
                                {isUpdating ? '...' : 'Hoàn thành'}
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(order.id, 'CANCELLED')}
                                disabled={isUpdating}
                                className="px-2.5 py-1 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-medium transition-colors"
                              >
                                Hủy
                              </button>
                            </>
                          )}

                          {(order.status === 'COMPLETED' || order.status === 'CANCELLED') && (
                            <span className="text-secondary text-xs italic">Không có thao tác</span>
                          )}
                        </div>
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
