"use client";

import React, { useEffect, useState, useCallback } from 'react';
import ProductGalleryManager from '@/components/features/admin/ProductGalleryManager';
import { authFetch } from '@/store/authStore';

// ─── Format số tiền VNĐ với dấu chấm phân cách hàng nghìn ───
const formatVND = (value: number): string => {
  if (!value && value !== 0) return '';
  if (value === 0) return '';
  return value.toLocaleString('vi-VN');
};

function numberToVietnameseWords(n: number): string {
  if (!n || n <= 0) return '';
  const digits = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
  
  function readTriple(num: number, showZeroHundred: boolean): string {
    const h = Math.floor(num / 100);
    const t = Math.floor((num % 100) / 10);
    const u = num % 10;
    if (num === 0) return '';
    let res = '';
    if (h > 0 || showZeroHundred) {
      res += `${digits[h]} trăm `;
    }
    if (t === 0 && u > 0) {
      if (h > 0 || showZeroHundred) res += 'lẻ ';
      res += digits[u];
    } else if (t === 1) {
      res += 'mười ';
      if (u === 1) res += 'một';
      else if (u === 5) res += 'lăm';
      else if (u > 0) res += digits[u];
    } else if (t > 1) {
      res += `${digits[t]} mươi `;
      if (u === 1) res += 'mốt';
      else if (u === 4) res += 'tư';
      else if (u === 5) res += 'lăm';
      else if (u > 0) res += digits[u];
    }
    return res.trim();
  }

  const billions = Math.floor(n / 1_000_000_000);
  const millions = Math.floor((n % 1_000_000_000) / 1_000_000);
  const thousands = Math.floor((n % 1_000_000) / 1_000);
  const units = n % 1_000;

  const parts: string[] = [];
  if (billions > 0) parts.push(`${readTriple(billions, false)} tỷ`);
  if (millions > 0) parts.push(`${readTriple(millions, parts.length > 0)} triệu`);
  if (thousands > 0) parts.push(`${readTriple(thousands, parts.length > 0)} nghìn`);
  if (units > 0) parts.push(`${readTriple(units, parts.length > 0)}`);

  const str = parts.join(' ').trim();
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1) + ' đồng';
}

// ─── Component Input Giá với format tự động & đọc chữ ───
function PriceInput({ value, onChange, placeholder, className, required }: {
  value: number;
  onChange: (val: number) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
}) {
  const displayValue = formatVND(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const num = raw ? parseInt(raw, 10) : 0;
    onChange(num);
  };

  const words = value > 0 ? numberToVietnameseWords(value) : '';

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          inputMode="numeric"
          required={required}
          placeholder={placeholder}
          value={displayValue}
          onChange={handleChange}
          className={className}
        />
        {value > 0 && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-primary/70 pointer-events-none bg-surface-container px-1 py-0.5 rounded">
            VNĐ
          </span>
        )}
      </div>
      {words && (
        <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1 animate-in fade-in">
          <span className="material-symbols-outlined text-[13px]">check_circle</span>
          <span>{words}</span>
        </p>
      )}
    </div>
  );
}

interface ProductVariant {
  id: string;
  size: string;
  color: string;
  sku: string;
  inventory?: Array<{ id: string; barcode: string; status: string }>;
}

interface Product {
  id: string;
  name: string;
  description: string;
  rental_price: string | number;
  retail_price: string | number;
  image_url: string;
  images?: string[];
  created_at: string;
  variants?: ProductVariant[];
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Add Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    images: ['https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800'],
    rental_price: 0,
    retail_price: 0,
    size: 'Freesize',
    color: 'Tiêu chuẩn',
    inventory_count: 3
  });

  // Edit Form state
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    images: [] as string[],
    rental_price: 0,
    retail_price: 0
  });

  const [searchQuery, setSearchQuery] = useState('');

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/products?limit=100');
      const json = await res.json();
      if (json.success) {
        setProducts(json.data || []);
      }
    } catch (err) {
      console.error("Lỗi lấy danh sách sản phẩm:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ─── Create Product ───
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.images.length === 0) {
      alert("Vui lòng thêm ít nhất 1 ảnh cho trang phục.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await authFetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          images: formData.images,
          image_url: formData.images[0],
          rental_price: Number(formData.rental_price),
          retail_price: Number(formData.retail_price),
          variants: [
            {
              size: formData.size,
              color: formData.color,
              sku: `SKU-${Date.now().toString(36).toUpperCase()}`,
              inventory_count: Number(formData.inventory_count)
            }
          ]
        })
      });

      const json = await res.json();
      if (json.success) {
        setShowAddModal(false);
        setToastMessage(`Đã thêm mới trang phục "${formData.name}" thành công!`);
        setTimeout(() => setToastMessage(null), 3500);
        setFormData({
          name: '',
          description: '',
          images: ['https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800'],
          rental_price: 0,
          retail_price: 0,
          size: 'Freesize',
          color: 'Tiêu chuẩn',
          inventory_count: 3
        });
        fetchProducts();
      } else {
        alert(json.message || "Tạo sản phẩm thất bại");
      }
    } catch {
      alert("Lỗi kết nối máy chủ");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Open Edit Modal ───
  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    const existingImages = p.images && p.images.length > 0
      ? p.images
      : (p.image_url ? [p.image_url] : ['https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800']);

    setEditFormData({
      name: p.name,
      description: p.description || '',
      images: existingImages,
      rental_price: Number(p.rental_price),
      retail_price: Number(p.retail_price)
    });
  };

  // ─── Submit Edit Product ───
  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (editFormData.images.length === 0) {
      alert("Sản phẩm cần tối thiểu 1 hình ảnh.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await authFetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: editFormData.name,
          description: editFormData.description,
          rental_price: Number(editFormData.rental_price),
          retail_price: Number(editFormData.retail_price),
          images: editFormData.images,
        })
      });

      const json = await res.json();
      if (json.success) {
        setEditingProduct(null);
        setToastMessage(`Đã cập nhật trang phục "${editFormData.name}" thành công!`);
        setTimeout(() => setToastMessage(null), 3500);
        fetchProducts();
      } else {
        alert(json.message || "Cập nhật thất bại");
      }
    } catch {
      alert("Lỗi kết nối khi cập nhật");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Delete Product ───
  const handleDeleteProduct = async (productId: string, productName: string) => {
    if (!confirm(`Bạn có chắc muốn xóa trang phục "${productName}" khỏi danh mục không?`)) {
      return;
    }

    setDeletingId(productId);
    try {
      const res = await authFetch(`/api/products/${productId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const json = await res.json();
      if (json.success) {
        setProducts(prev => prev.filter(p => p.id !== productId));
        setToastMessage(`Đã xóa "${productName}"!`);
        setTimeout(() => setToastMessage(null), 3500);
      } else {
        alert(json.message || "Xóa thất bại");
      }
    } catch {
      alert("Lỗi kết nối khi xóa");
    } finally {
      setDeletingId(null);
    }
  };

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
          <div className="flex items-center gap-3">
            <h1 className="font-headline-md text-headline-md font-semibold text-on-surface">
              Quản Lý Kho Trang Phục
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-xs">
              {products.length} trang phục
            </span>
          </div>
          <p className="text-body-md text-on-surface-variant mt-1">
            Toàn bộ danh sách trang phục đang hiển thị trên website và tồn kho cho thuê.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[18px]">search</span>
            <input
              type="text"
              placeholder="Tìm kiếm trang phục..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-2 bg-surface-container-low rounded-xl text-body-sm text-on-surface placeholder:text-secondary outline-none focus:ring-2 focus:ring-primary/40 w-48 sm:w-60"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-on-primary rounded-xl font-label-md hover:bg-primary/90 transition-all shadow-sm active:scale-95 shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Thêm Mới</span>
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-surface-container-low shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="py-24 text-center text-secondary">
            <span className="material-symbols-outlined text-[48px] opacity-40 mb-2">checkroom</span>
            <p>Kho hàng hiện đang trống. Hãy bấm nút thêm trang phục mới!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/40 border-b border-surface-container-low text-[11px] font-semibold text-secondary uppercase tracking-wider">
                  <th className="py-3.5 px-4">Trang Phục</th>
                  <th className="py-3.5 px-4">Giá Thuê / Ngày</th>
                  <th className="py-3.5 px-4">Giá Bán Thị Trường</th>
                  <th className="py-3.5 px-4">Biến Thể & Kho Tồn</th>
                  <th className="py-3.5 px-4">Ngày Đăng</th>
                  <th className="py-3.5 px-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low text-body-sm text-on-surface">
                {products
                  .filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description?.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((p) => {
                  const isDeleting = deletingId === p.id;
                  const displayImages = p.images && p.images.length > 0 ? p.images : (p.image_url ? [p.image_url] : []);
                  const primaryImg = displayImages[0] || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800';

                  return (
                    <tr key={p.id} className="hover:bg-surface-container-low/30 transition-colors">
                      {/* Sản phẩm */}
                      <td className="py-4 px-4 align-middle">
                        <div className="flex items-center gap-3.5">
                          <div className="relative shrink-0">
                            <img
                              src={primaryImg}
                              alt=""
                              className="w-12 h-16 object-cover rounded-lg bg-surface-container border border-surface-container-high"
                            />
                            {displayImages.length > 1 && (
                              <span className="absolute -top-1.5 -right-1.5 bg-primary text-on-primary text-[10px] font-bold px-1.5 py-0.2 rounded-full shadow-sm">
                                {displayImages.length}
                              </span>
                            )}
                          </div>
                          <div className="min-w-0 max-w-[280px]">
                            <p className="font-semibold text-on-surface truncate">{p.name}</p>
                            <p className="text-[12px] text-secondary line-clamp-1 mt-0.5">{p.description || 'Chưa có mô tả'}</p>
                            <span className="text-[11px] text-primary/80 font-medium inline-flex items-center gap-1 mt-1">
                              <span className="material-symbols-outlined text-[13px]">photo_library</span>
                              <span>{displayImages.length} ảnh trong bộ sưu tập</span>
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Giá thuê */}
                      <td className="py-4 px-4 align-middle font-semibold text-primary">
                        {Number(p.rental_price).toLocaleString('vi-VN')}đ
                      </td>

                      {/* Giá bán lẻ */}
                      <td className="py-4 px-4 align-middle text-secondary font-medium">
                        {Number(p.retail_price).toLocaleString('vi-VN')}đ
                      </td>

                      {/* Biến thể & Kho tồn */}
                      <td className="py-4 px-4 align-middle">
                        <div className="flex flex-wrap gap-1.5">
                          {p.variants?.map((v) => (
                            <span key={v.id} className="px-2 py-0.5 bg-surface-container rounded text-xs text-on-surface font-medium border border-surface-container-high">
                              {v.size}: <span className="text-primary font-bold">{v.inventory?.length || 0}</span> cái
                            </span>
                          ))}
                          {(!p.variants || p.variants.length === 0) && (
                            <span className="text-secondary text-xs italic">Chưa có size</span>
                          )}
                        </div>
                      </td>

                      {/* Ngày đăng */}
                      <td className="py-4 px-4 align-middle text-secondary text-xs">
                        {new Date(p.created_at).toLocaleDateString('vi-VN')}
                      </td>

                      {/* Thao tác */}
                      <td className="py-4 px-4 align-middle text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="px-3 py-1.5 text-primary hover:bg-primary/10 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[15px]">edit</span>
                            <span>Sửa</span>
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            disabled={isDeleting}
                            className="px-3 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[15px]">delete</span>
                            <span>{isDeleting ? 'Đang xóa...' : 'Xóa'}</span>
                          </button>
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

      {/* Modal Chỉnh Sửa Sản Phẩm */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-surface-container-lowest rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-surface-container animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-surface-container-low mb-5">
              <div>
                <h3 className="font-title-lg text-title-lg font-semibold text-on-surface">
                  Chỉnh Sửa Trang Phục & Thứ Tự Ảnh
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Thay đổi thông tin, thêm nhiều ảnh và điều chỉnh vị trí hiển thị ngoài trang danh mục.
                </p>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1 text-secondary hover:text-on-surface rounded-full hover:bg-surface-container-low transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleUpdateProduct} className="space-y-5">
              <div>
                <label className="block text-label-md font-medium text-on-surface mb-1">Tên trang phục *</label>
                <input
                  required
                  value={editFormData.name}
                  onChange={e => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full h-11 px-3.5 bg-surface-container-low rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-body-md text-on-surface"
                />
              </div>

              <div>
                <label className="block text-label-md font-medium text-on-surface mb-1">Mô tả</label>
                <textarea
                  rows={2}
                  value={editFormData.description}
                  onChange={e => setEditFormData({ ...editFormData, description: e.target.value })}
                  className="w-full p-3 bg-surface-container-low rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-body-md text-on-surface"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-label-md font-medium text-on-surface mb-1">Giá thuê / ngày (VNĐ) *</label>
                  <PriceInput
                    required
                    placeholder="Ví dụ: 350.000"
                    value={editFormData.rental_price}
                    onChange={val => setEditFormData({ ...editFormData, rental_price: val })}
                    className="w-full h-11 px-3.5 pr-12 bg-surface-container-low rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-body-md text-on-surface font-semibold text-primary"
                  />
                </div>
                <div>
                  <label className="block text-label-md font-medium text-on-surface mb-1">Giá bán thị trường (VNĐ) *</label>
                  <PriceInput
                    required
                    placeholder="Ví dụ: 2.500.000"
                    value={editFormData.retail_price}
                    onChange={val => setEditFormData({ ...editFormData, retail_price: val })}
                    className="w-full h-11 px-3.5 pr-12 bg-surface-container-low rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-body-md text-on-surface"
                  />
                </div>
              </div>

              {/* ─── Quản lý nhiều ảnh & Tải lên với Drag & Drop ─── */}
              <ProductGalleryManager
                images={editFormData.images}
                onChange={newImgs => setEditFormData({ ...editFormData, images: newImgs })}
                isUploading={isUploading}
                setIsUploading={setIsUploading}
              />

              <div className="flex justify-end gap-3 pt-4 border-t border-surface-container-low mt-5">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2.5 rounded-xl text-secondary hover:bg-surface-container-low font-label-md transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  className="px-5 py-2.5 bg-primary text-on-primary rounded-xl font-label-md hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50 flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  <span>{isUploading ? 'Đang tải ảnh...' : isSubmitting ? 'Đang lưu...' : 'Lưu Thay Đổi'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Thêm Sản Phẩm Mới */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-surface-container-lowest rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-surface-container animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-surface-container-low mb-5">
              <div>
                <h3 className="font-title-lg text-title-lg font-semibold text-on-surface">
                  Thêm Trang Phục Cho Thuê Mới
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Thêm trang phục mới với đầy đủ bộ ảnh, biến thể và số lượng tồn kho.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-secondary hover:text-on-surface rounded-full hover:bg-surface-container-low transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-label-md font-medium text-on-surface mb-1">Tên trang phục *</label>
                <input
                  required
                  placeholder="Ví dụ: Đầm Dạ Hội Lụa Satin Cao Cấp"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-11 px-3.5 bg-surface-container-low rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-body-md text-on-surface"
                />
              </div>

              <div>
                <label className="block text-label-md font-medium text-on-surface mb-1">Mô tả ngắn</label>
                <textarea
                  rows={2}
                  placeholder="Mô tả phong cách, chất liệu, dịp mặc phù hợp..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 bg-surface-container-low rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-body-md text-on-surface"
                />
              </div>

              {/* ─── Quản lý nhiều ảnh & Tải lên với Drag & Drop ─── */}
              <ProductGalleryManager
                images={formData.images}
                onChange={newImgs => setFormData({ ...formData, images: newImgs })}
                isUploading={isUploading}
                setIsUploading={setIsUploading}
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-label-md font-medium text-on-surface mb-1">Giá thuê / ngày (VNĐ) *</label>
                  <PriceInput
                    required
                    placeholder="Ví dụ: 350.000"
                    value={formData.rental_price}
                    onChange={val => setFormData({ ...formData, rental_price: val })}
                    className="w-full h-11 px-3.5 pr-12 bg-surface-container-low rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-body-md text-on-surface font-semibold text-primary"
                  />
                </div>
                <div>
                  <label className="block text-label-md font-medium text-on-surface mb-1">Giá bán thị trường (VNĐ) *</label>
                  <PriceInput
                    required
                    placeholder="Ví dụ: 2.500.000"
                    value={formData.retail_price}
                    onChange={val => setFormData({ ...formData, retail_price: val })}
                    className="w-full h-11 px-3.5 pr-12 bg-surface-container-low rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-body-md text-on-surface"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-label-md font-medium text-on-surface mb-1">Kích cỡ (Size)</label>
                  <select
                    value={formData.size}
                    onChange={e => setFormData({ ...formData, size: e.target.value })}
                    className="w-full h-11 px-3 bg-surface-container-low rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-body-md text-on-surface"
                  >
                    <option value="Freesize">Freesize</option>
                    <option value="S">Size S</option>
                    <option value="M">Size M</option>
                    <option value="L">Size L</option>
                  </select>
                </div>
                <div>
                  <label className="block text-label-md font-medium text-on-surface mb-1">Số lượng chiếc trong kho</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={formData.inventory_count}
                    onChange={e => setFormData({ ...formData, inventory_count: Number(e.target.value) })}
                    className="w-full h-11 px-3.5 bg-surface-container-low rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-body-md text-on-surface font-medium"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-surface-container-low mt-5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl text-secondary hover:bg-surface-container-low font-label-md transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  className="px-5 py-2.5 bg-primary text-on-primary rounded-xl font-label-md hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
                >
                  {isUploading ? 'Đang tải ảnh...' : isSubmitting ? 'Đang lưu...' : 'Lưu Trang Phục'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
