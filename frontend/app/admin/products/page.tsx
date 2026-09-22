"use client";

import React, { useEffect, useState } from 'react';

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
  rental_price: string;
  retail_price: string;
  image_url: string;
  created_at: string;
  variants?: ProductVariant[];
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800',
    rental_price: 350000,
    retail_price: 2500000,
    size: 'Freesize',
    color: 'Tiêu chuẩn',
    inventory_count: 3
  });

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/products');
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

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          image_url: formData.image_url,
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
          image_url: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800',
          rental_price: 350000,
          retail_price: 2500000,
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

  const handleDeleteProduct = async (productId: string, productName: string) => {
    if (!confirm(`Bạn có chắc muốn xóa trang phục "${productName}" khỏi danh mục không?`)) {
      return;
    }

    setDeletingId(productId);
    try {
      const res = await fetch(`/api/products/${productId}`, {
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-md text-headline-md font-semibold text-on-surface">
            Quản Lý Kho Trang Phục
          </h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Danh sách các mẫu đầm, áo dạ hội và số lượng tồn kho khả dụng để cho thuê.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-on-primary rounded-xl font-label-md hover:bg-primary/90 transition-all shadow-sm active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Thêm Trang Phục Mới</span>
        </button>
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
                {products.map((p) => {
                  const isDeleting = deletingId === p.id;
                  const totalUnits = p.variants?.reduce((sum, v) => sum + (v.inventory?.length || 0), 0) || 0;

                  return (
                    <tr key={p.id} className="hover:bg-surface-container-low/30 transition-colors">
                      {/* Sản phẩm */}
                      <td className="py-4 px-4 align-middle">
                        <div className="flex items-center gap-3.5">
                          <img
                            src={p.image_url || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800'}
                            alt=""
                            className="w-12 h-16 object-cover rounded-lg bg-surface-container shrink-0"
                          />
                          <div className="min-w-0 max-w-[280px]">
                            <p className="font-semibold text-on-surface truncate">{p.name}</p>
                            <p className="text-[12px] text-secondary line-clamp-1 mt-0.5">{p.description || 'Chưa có mô tả'}</p>
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
                        <button
                          onClick={() => handleDeleteProduct(p.id, p.name)}
                          disabled={isDeleting}
                          className="px-3 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
                        >
                          {isDeleting ? 'Đang xóa...' : 'Xóa'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Thêm Sản Phẩm Mới */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-surface-container animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-surface-container-low mb-5">
              <h3 className="font-title-lg text-title-lg font-semibold text-on-surface">
                Thêm Trang Phục Cho Thuê Mới
              </h3>
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

              <div>
                <label className="block text-label-md font-medium text-on-surface mb-1">Đường dẫn ảnh (URL)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image_url}
                  onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full h-11 px-3.5 bg-surface-container-low rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-body-md text-on-surface"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-label-md font-medium text-on-surface mb-1">Giá thuê / ngày (VNĐ) *</label>
                  <input
                    type="number"
                    required
                    min={1000}
                    step={10000}
                    value={formData.rental_price}
                    onChange={e => setFormData({ ...formData, rental_price: Number(e.target.value) })}
                    className="w-full h-11 px-3.5 bg-surface-container-low rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-body-md text-on-surface font-semibold text-primary"
                  />
                </div>
                <div>
                  <label className="block text-label-md font-medium text-on-surface mb-1">Giá bán thị trường (VNĐ) *</label>
                  <input
                    type="number"
                    required
                    min={1000}
                    step={50000}
                    value={formData.retail_price}
                    onChange={e => setFormData({ ...formData, retail_price: Number(e.target.value) })}
                    className="w-full h-11 px-3.5 bg-surface-container-low rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-body-md text-on-surface"
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
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-primary text-on-primary rounded-xl font-label-md hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? 'Đang lưu...' : 'Lưu Trang Phục'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
