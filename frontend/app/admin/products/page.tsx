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
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Add Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    images: ['https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800'],
    newImageUrl: '',
    rental_price: 350000,
    retail_price: 2500000,
    size: 'Freesize',
    color: 'Tiêu chuẩn',
    inventory_count: 3
  });

  // Edit Form state
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    images: [] as string[],
    newImageUrl: '',
    rental_price: 0,
    retail_price: 0
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

  // ─── Image Reorder Helpers ───
  const moveImage = (
    images: string[],
    fromIndex: number,
    toIndex: number,
    setter: (newImgs: string[]) => void
  ) => {
    if (toIndex < 0 || toIndex >= images.length) return;
    const updated = [...images];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setter(updated);
  };

  const setAsPrimary = (
    images: string[],
    index: number,
    setter: (newImgs: string[]) => void
  ) => {
    if (index === 0) return;
    const updated = [...images];
    const [selected] = updated.splice(index, 1);
    updated.unshift(selected);
    setter(updated);
  };

  const removeImage = (
    images: string[],
    index: number,
    setter: (newImgs: string[]) => void
  ) => {
    if (images.length <= 1) {
      alert("Sản phẩm cần tối thiểu 1 hình ảnh.");
      return;
    }
    const updated = images.filter((_, i) => i !== index);
    setter(updated);
  };

  // ─── Create Product ───
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.images.length === 0) {
      alert("Vui lòng thêm ít nhất 1 ảnh cho trang phục.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/products', {
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
          newImageUrl: '',
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
      newImageUrl: '',
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
      const res = await fetch(`/api/products/${editingProduct.id}`, {
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
                  <input
                    type="number"
                    required
                    min={1000}
                    step={10000}
                    value={editFormData.rental_price}
                    onChange={e => setEditFormData({ ...editFormData, rental_price: Number(e.target.value) })}
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
                    value={editFormData.retail_price}
                    onChange={e => setEditFormData({ ...editFormData, retail_price: Number(e.target.value) })}
                    className="w-full h-11 px-3.5 bg-surface-container-low rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-body-md text-on-surface"
                  />
                </div>
              </div>

              {/* ─── Quản lý nhiều ảnh & Sắp xếp thứ tự ─── */}
              <div className="p-4 bg-surface-container-low/60 rounded-2xl border border-surface-container space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-label-md font-bold text-on-surface">
                      Bộ Sưu Tập Hình Ảnh ({editFormData.images.length} ảnh)
                    </label>
                    <p className="text-xs text-on-surface-variant">
                      Ảnh ở vị trí <strong>#1 (Đầu tiên)</strong> sẽ là <strong>ảnh đại diện</strong> ngoài trang danh mục (/dresses).
                    </p>
                  </div>
                </div>

                {/* Ô thêm ảnh mới */}
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Dán đường dẫn ảnh mới (https://...)"
                    value={editFormData.newImageUrl}
                    onChange={e => setEditFormData({ ...editFormData, newImageUrl: e.target.value })}
                    className="flex-1 h-10 px-3 bg-surface-container-lowest rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-xs text-on-surface border border-surface-container"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (editFormData.newImageUrl.trim()) {
                        setEditFormData({
                          ...editFormData,
                          images: [...editFormData.images, editFormData.newImageUrl.trim()],
                          newImageUrl: ''
                        });
                      }
                    }}
                    className="px-4 h-10 bg-secondary text-on-secondary rounded-xl text-xs font-semibold hover:bg-secondary/90 transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_photo_alternate</span>
                    <span>Thêm ảnh</span>
                  </button>
                </div>

                {/* Danh sách ảnh thumbnails với các nút sắp xếp thứ tự */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {editFormData.images.map((url, idx) => (
                    <div
                      key={idx}
                      className={`relative group rounded-xl overflow-hidden border-2 bg-surface-container-lowest flex flex-col justify-between ${
                        idx === 0 ? 'border-primary ring-2 ring-primary/20 shadow-md' : 'border-surface-container'
                      }`}
                    >
                      {/* Badge vị trí */}
                      <div className="absolute top-1.5 left-1.5 z-10">
                        {idx === 0 ? (
                          <span className="bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[11px]">star</span>
                            <span>#1 Chính</span>
                          </span>
                        ) : (
                          <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
                            #{idx + 1}
                          </span>
                        )}
                      </div>

                      {/* Nút xóa ảnh */}
                      <button
                        type="button"
                        onClick={() => removeImage(editFormData.images, idx, newImgs => setEditFormData({ ...editFormData, images: newImgs }))}
                        className="absolute top-1.5 right-1.5 z-10 w-6 h-6 rounded-full bg-black/60 hover:bg-rose-600 text-white flex items-center justify-center transition-colors shadow-sm"
                        title="Xóa ảnh này"
                      >
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>

                      {/* Ảnh xem trước */}
                      <div className="w-full aspect-[3/4] bg-surface-container overflow-hidden">
                        <img src={url} alt={`Ảnh ${idx + 1}`} className="w-full h-full object-cover" />
                      </div>

                      {/* Thanh công cụ điều khiển vị trí */}
                      <div className="p-1.5 bg-surface-container-lowest border-t border-surface-container flex items-center justify-between gap-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => moveImage(editFormData.images, idx, idx - 1, newImgs => setEditFormData({ ...editFormData, images: newImgs }))}
                          className="flex-1 py-1 rounded bg-surface-container-low hover:bg-surface-container text-on-surface disabled:opacity-30 text-[11px] font-bold transition-colors flex items-center justify-center"
                          title="Di chuyển sang trước"
                        >
                          <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                        </button>

                        {idx !== 0 && (
                          <button
                            type="button"
                            onClick={() => setAsPrimary(editFormData.images, idx, newImgs => setEditFormData({ ...editFormData, images: newImgs }))}
                            className="px-2 py-1 rounded bg-primary/10 hover:bg-primary/20 text-primary text-[10px] font-bold transition-colors"
                            title="Đặt làm ảnh đại diện chính"
                          >
                            Lên đầu
                          </button>
                        )}

                        <button
                          type="button"
                          disabled={idx === editFormData.images.length - 1}
                          onClick={() => moveImage(editFormData.images, idx, idx + 1, newImgs => setEditFormData({ ...editFormData, images: newImgs }))}
                          className="flex-1 py-1 rounded bg-surface-container-low hover:bg-surface-container text-on-surface disabled:opacity-30 text-[11px] font-bold transition-colors flex items-center justify-center"
                          title="Di chuyển sang sau"
                        >
                          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

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
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-primary text-on-primary rounded-xl font-label-md hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50 flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  <span>{isSubmitting ? 'Đang lưu...' : 'Lưu Thay Đổi'}</span>
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

              {/* ─── Quản lý nhiều ảnh trong Thêm mới ─── */}
              <div className="p-4 bg-surface-container-low/60 rounded-2xl border border-surface-container space-y-3">
                <div>
                  <label className="block text-label-md font-bold text-on-surface">
                    Bộ Sưu Tập Hình Ảnh ({formData.images.length} ảnh)
                  </label>
                  <p className="text-xs text-on-surface-variant">
                    Ảnh ở vị trí <strong>#1 (Đầu tiên)</strong> sẽ là <strong>ảnh đại diện</strong> ngoài trang danh mục (/dresses).
                  </p>
                </div>

                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Dán đường dẫn ảnh (https://...)"
                    value={formData.newImageUrl}
                    onChange={e => setFormData({ ...formData, newImageUrl: e.target.value })}
                    className="flex-1 h-10 px-3 bg-surface-container-lowest rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-xs text-on-surface border border-surface-container"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (formData.newImageUrl.trim()) {
                        setFormData({
                          ...formData,
                          images: [...formData.images, formData.newImageUrl.trim()],
                          newImageUrl: ''
                        });
                      }
                    }}
                    className="px-4 h-10 bg-secondary text-on-secondary rounded-xl text-xs font-semibold hover:bg-secondary/90 transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_photo_alternate</span>
                    <span>Thêm ảnh</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {formData.images.map((url, idx) => (
                    <div
                      key={idx}
                      className={`relative group rounded-xl overflow-hidden border-2 bg-surface-container-lowest flex flex-col justify-between ${
                        idx === 0 ? 'border-primary ring-2 ring-primary/20 shadow-md' : 'border-surface-container'
                      }`}
                    >
                      <div className="absolute top-1.5 left-1.5 z-10">
                        {idx === 0 ? (
                          <span className="bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[11px]">star</span>
                            <span>#1 Chính</span>
                          </span>
                        ) : (
                          <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
                            #{idx + 1}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeImage(formData.images, idx, newImgs => setFormData({ ...formData, images: newImgs }))}
                        className="absolute top-1.5 right-1.5 z-10 w-6 h-6 rounded-full bg-black/60 hover:bg-rose-600 text-white flex items-center justify-center transition-colors shadow-sm"
                        title="Xóa ảnh này"
                      >
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>

                      <div className="w-full aspect-[3/4] bg-surface-container overflow-hidden">
                        <img src={url} alt={`Ảnh ${idx + 1}`} className="w-full h-full object-cover" />
                      </div>

                      <div className="p-1.5 bg-surface-container-lowest border-t border-surface-container flex items-center justify-between gap-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => moveImage(formData.images, idx, idx - 1, newImgs => setFormData({ ...formData, images: newImgs }))}
                          className="flex-1 py-1 rounded bg-surface-container-low hover:bg-surface-container text-on-surface disabled:opacity-30 text-[11px] font-bold transition-colors flex items-center justify-center"
                        >
                          <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                        </button>
                        {idx !== 0 && (
                          <button
                            type="button"
                            onClick={() => setAsPrimary(formData.images, idx, newImgs => setFormData({ ...formData, images: newImgs }))}
                            className="px-2 py-1 rounded bg-primary/10 hover:bg-primary/20 text-primary text-[10px] font-bold transition-colors"
                          >
                            Lên đầu
                          </button>
                        )}
                        <button
                          type="button"
                          disabled={idx === formData.images.length - 1}
                          onClick={() => moveImage(formData.images, idx, idx + 1, newImgs => setFormData({ ...formData, images: newImgs }))}
                          className="flex-1 py-1 rounded bg-surface-container-low hover:bg-surface-container text-on-surface disabled:opacity-30 text-[11px] font-bold transition-colors flex items-center justify-center"
                        >
                          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
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
