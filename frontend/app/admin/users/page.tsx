"use client";

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../../store/authStore';

interface UserItem {
  id: string;
  email: string;
  fullName: string;
  role: string;
  created_at: string;
  bookingCount: number;
}

export default function AdminUsersPage() {
  const { user: currentAdmin } = useAuthStore();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'ALL' | 'CUSTOMER' | 'ADMIN'>('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal xác nhận
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    user: UserItem | null;
    targetRole: 'CUSTOMER' | 'ADMIN';
  }>({
    isOpen: false,
    user: null,
    targetRole: 'CUSTOMER',
  });

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/users', { credentials: 'include' });
      const json = await res.json();
      if (json.success) {
        setUsers(json.data || []);
      }
    } catch (err) {
      console.error("Lỗi lấy danh sách người dùng:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleConfirmRoleChange = async () => {
    if (!confirmModal.user) return;
    const targetUserId = confirmModal.user.id;
    const targetRole = confirmModal.targetRole;

    setUpdatingId(targetUserId);
    setConfirmModal({ isOpen: false, user: null, targetRole: 'CUSTOMER' });

    try {
      const res = await fetch(`/api/users/${targetUserId}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ role: targetRole }),
      });

      const json = await res.json();
      if (json.success) {
        setUsers(prev => prev.map(u => u.id === targetUserId ? { ...u, role: targetRole } : u));
        setToastMessage(`Đã cập nhật vai trò của ${confirmModal.user?.fullName} thành ${targetRole}!`);
        setTimeout(() => setToastMessage(null), 3500);
      } else {
        alert(json.message || "Cập nhật vai trò thất bại");
      }
    } catch {
      alert("Lỗi kết nối máy chủ");
    } finally {
      setUpdatingId(null);
    }
  };

  // Lọc dữ liệu theo search và tab vai trò
  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'ALL' || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const filterTabs = [
    { label: 'Tất cả tài khoản', value: 'ALL', count: users.length },
    { label: 'Khách hàng', value: 'CUSTOMER', count: users.filter(u => u.role === 'CUSTOMER').length },
    { label: 'Quản trị viên', value: 'ADMIN', count: users.filter(u => u.role === 'ADMIN').length },
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-md text-headline-md font-semibold text-on-surface">
            Quản Lý Tài Khoản Khách Hàng
          </h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Theo dõi danh sách người dùng đăng ký, số lượng đơn đã thuê và phân quyền quản trị viên.
          </p>
        </div>
        <button
          onClick={fetchUsers}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-xl font-label-md transition-colors w-fit"
        >
          <span className={`material-symbols-outlined text-[18px] ${isLoading ? 'animate-spin' : ''}`}>refresh</span>
          <span>Làm mới</span>
        </button>
      </div>

      {/* Search Bar & Role Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary text-[20px]">search</span>
          <input
            type="text"
            placeholder="Tìm theo tên hoặc email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-10 pr-4 bg-surface-container-lowest border border-surface-container-low rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-body-sm text-on-surface shadow-sm"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1.5 p-1 bg-surface-container-low rounded-2xl w-fit">
          {filterTabs.map((tab) => {
            const isActive = filterRole === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setFilterRole(tab.value as any)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-label-md transition-all ${
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
      </div>

      {/* Users Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-surface-container-low shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="py-24 text-center text-secondary">
            <span className="material-symbols-outlined text-[48px] opacity-40 mb-2">person_search</span>
            <p>Không tìm thấy người dùng nào phù hợp với điều kiện tìm kiếm.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/40 border-b border-surface-container-low text-[11px] font-semibold text-secondary uppercase tracking-wider">
                  <th className="py-3.5 px-4">Khách Hàng</th>
                  <th className="py-3.5 px-4">Vai Trò</th>
                  <th className="py-3.5 px-4">Lịch Sử Thuê</th>
                  <th className="py-3.5 px-4">Ngày Tham Gia</th>
                  <th className="py-3.5 px-4 text-right">Phân Quyền</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low text-body-sm text-on-surface">
                {filteredUsers.map((item) => {
                  const isCurrent = currentAdmin?.email === item.email;
                  const isUpdating = updatingId === item.id;

                  return (
                    <tr key={item.id} className="hover:bg-surface-container-low/30 transition-colors">
                      {/* Khách hàng */}
                      <td className="py-4 px-4 align-middle">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                            item.role === 'ADMIN' ? 'bg-purple-500/20 text-purple-700' : 'bg-primary/20 text-primary'
                          }`}>
                            {item.fullName.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-on-surface truncate">{item.fullName}</p>
                              {isCurrent && (
                                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">
                                  Bạn
                                </span>
                              )}
                            </div>
                            <p className="text-[12px] text-secondary">{item.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Vai trò */}
                      <td className="py-4 px-4 align-middle">
                        {item.role === 'ADMIN' ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-700 border border-purple-500/30 shadow-xs">
                            <span className="material-symbols-outlined text-[14px]">shield</span>
                            QUẢN TRỊ VIÊN
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-surface-container-high text-on-surface-variant border border-surface-container-highest">
                            <span className="material-symbols-outlined text-[14px]">person</span>
                            KHÁCH HÀNG
                          </span>
                        )}
                      </td>

                      {/* Lịch sử thuê */}
                      <td className="py-4 px-4 align-middle">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          item.bookingCount > 0 ? 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/20' : 'bg-surface-container text-secondary'
                        }`}>
                          <span className="material-symbols-outlined text-[14px]">shopping_bag</span>
                          {item.bookingCount} đơn thuê
                        </span>
                      </td>

                      {/* Ngày tham gia */}
                      <td className="py-4 px-4 align-middle text-secondary text-xs">
                        {new Date(item.created_at).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </td>

                      {/* Thao tác phân quyền */}
                      <td className="py-4 px-4 align-middle text-right">
                        {isCurrent ? (
                          <span className="text-secondary text-xs italic px-3 py-1 bg-surface-container-low rounded-lg">
                            Tài khoản hiện tại
                          </span>
                        ) : item.role === 'CUSTOMER' ? (
                          <button
                            onClick={() => setConfirmModal({ isOpen: true, user: item, targetRole: 'ADMIN' })}
                            disabled={isUpdating}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg text-xs font-semibold border border-purple-200 transition-colors disabled:opacity-50"
                          >
                            <span className="material-symbols-outlined text-[15px]">arrow_upward</span>
                            <span>Thăng cấp Admin</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => setConfirmModal({ isOpen: true, user: item, targetRole: 'CUSTOMER' })}
                            disabled={isUpdating}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-lg text-xs font-semibold border border-amber-200 transition-colors disabled:opacity-50"
                          >
                            <span className="material-symbols-outlined text-[15px]">arrow_downward</span>
                            <span>Hạ quyền Customer</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal xác nhận chuyển quyền */}
      {confirmModal.isOpen && confirmModal.user && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-6 shadow-2xl border border-surface-container animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[28px]">manage_accounts</span>
            </div>
            <h3 className="font-title-lg text-title-lg font-semibold text-on-surface mb-2">
              Xác nhận thay đổi vai trò
            </h3>
            <p className="text-body-md text-on-surface-variant mb-6">
              Bạn có chắc chắn muốn chuyển tài khoản <span className="font-semibold text-on-surface">{confirmModal.user.fullName} ({confirmModal.user.email})</span> thành vai trò <span className="font-bold text-primary">{confirmModal.targetRole}</span> không?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmModal({ isOpen: false, user: null, targetRole: 'CUSTOMER' })}
                className="px-4 py-2 rounded-xl text-secondary hover:bg-surface-container-low font-label-md transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmRoleChange}
                className="px-5 py-2 bg-primary text-on-primary rounded-xl font-label-md hover:bg-primary/90 transition-colors font-semibold shadow-sm"
              >
                Xác Nhận Đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
