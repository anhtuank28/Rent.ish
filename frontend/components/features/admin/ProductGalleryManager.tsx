"use client";

import React, { useState, useRef } from "react";

interface ProductGalleryManagerProps {
  images: string[];
  onChange: (images: string[]) => void;
  isUploading: boolean;
  setIsUploading: (uploading: boolean) => void;
}

export default function ProductGalleryManager({
  images,
  onChange,
  isUploading,
  setIsUploading,
}: ProductGalleryManagerProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── Sắp xếp vị trí ảnh ───
  const moveImage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= images.length) return;
    const updated = [...images];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    onChange(updated);
  };

  const setAsPrimary = (index: number) => {
    if (index === 0) return;
    const updated = [...images];
    const [selected] = updated.splice(index, 1);
    updated.unshift(selected);
    onChange(updated);
  };

  const removeImage = (index: number) => {
    if (images.length <= 1) {
      alert("Sản phẩm cần tối thiểu 1 hình ảnh.");
      return;
    }
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  };

  // ─── Thêm qua URL thủ công ───
  const handleAddUrl = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    onChange([...images, trimmed]);
    setUrlInput("");
  };

  // ─── Upload File lên Backend / Storage ───
  const handleFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) {
        alert(`File "${file.name}" không phải là tệp hình ảnh.`);
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`Ảnh "${file.name}" có dung lượng quá 5MB. Vui lòng chọn ảnh nhỏ hơn.`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    try {
      setIsUploading(true);
      setUploadStatus(`Đang tải lên ${validFiles.length} ảnh...`);

      const formData = new FormData();
      validFiles.forEach((f) => formData.append("images", f));

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (json.success && Array.isArray(json.data?.urls)) {
        onChange([...images, ...json.data.urls]);
        setUploadStatus(`Đã tải lên thành công ${json.data.urls.length} ảnh!`);
        setTimeout(() => setUploadStatus(null), 3000);
      } else {
        alert(json.message || "Tải ảnh lên thất bại.");
        setUploadStatus(null);
      }
    } catch (err) {
      console.error("Lỗi khi upload ảnh:", err);
      alert("Không thể kết nối máy chủ để tải ảnh lên.");
      setUploadStatus(null);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer?.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="p-4 bg-surface-container-low/70 rounded-2xl border border-surface-container space-y-3.5">
      {/* Tiêu đề & Hướng dẫn */}
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-label-md font-bold text-on-surface">
            Bộ Sưu Tập Hình Ảnh ({images.length} ảnh)
          </label>
          <p className="text-xs text-on-surface-variant">
            Ảnh ở vị trí <strong className="text-primary font-semibold">#1 (Đầu tiên)</strong> sẽ là{" "}
            <strong>ảnh đại diện chính</strong> ngoài trang danh mục (/dresses).
          </p>
        </div>

        {/* Tab chuyển đổi: Tải từ máy tính vs Dán link */}
        <div className="flex bg-surface-container rounded-xl p-1 text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
              activeTab === "upload"
                ? "bg-surface-container-lowest text-primary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">cloud_upload</span>
            <span>Tải ảnh lên</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("url")}
            className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
              activeTab === "url"
                ? "bg-surface-container-lowest text-primary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">link</span>
            <span>Dán link</span>
          </button>
        </div>
      </div>

      {/* ─── TAB 1: Kéo thả tải ảnh từ máy tính ─── */}
      {activeTab === "upload" && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/png,image/jpeg,image/webp,image/gif,image/jpg"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) handleFiles(e.target.files);
            }}
          />

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={`w-full py-5 px-4 rounded-xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center ${
              isDragging
                ? "border-primary bg-primary/10 scale-[1.01]"
                : "border-surface-container-high bg-surface-container-lowest/60 hover:bg-surface-container-lowest hover:border-primary/60"
            } ${isUploading ? "opacity-60 cursor-not-allowed pointer-events-none" : ""}`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-2 py-1">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-semibold text-primary">
                  {uploadStatus || "Đang xử lý tải ảnh lên Cloud..."}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">add_photo_alternate</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-on-surface">
                    Kéo thả nhiều ảnh vào đây, hoặc{" "}
                    <span className="text-primary underline font-bold">chọn từ thiết bị</span>
                  </p>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">
                    Hỗ trợ JPG, PNG, WEBP (tối đa 5MB / ảnh, chọn nhiều file cùng lúc)
                  </p>
                </div>
              </div>
            )}
          </div>
          {uploadStatus && !isUploading && (
            <p className="text-[11px] text-emerald-600 font-medium mt-1.5 flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">check_circle</span>
              <span>{uploadStatus}</span>
            </p>
          )}
        </div>
      )}

      {/* ─── TAB 2: Dán link ảnh Internet ─── */}
      {activeTab === "url" && (
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="Dán đường dẫn ảnh mạng (https://images.unsplash.com/...)"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddUrl();
              }
            }}
            className="flex-1 h-10 px-3 bg-surface-container-lowest rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-xs text-on-surface border border-surface-container"
          />
          <button
            type="button"
            onClick={() => handleAddUrl()}
            className="px-4 h-10 bg-secondary text-on-secondary rounded-xl text-xs font-semibold hover:bg-secondary/90 transition-colors flex items-center gap-1 shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">add_link</span>
            <span>Thêm</span>
          </button>
        </div>
      )}

      {/* ─── DANH SÁCH ẢNH THUMBNAILS & SẮP XẾP THỨ TỰ ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        {images.map((url, idx) => (
          <div
            key={idx}
            className={`relative group rounded-xl overflow-hidden border-2 bg-surface-container-lowest flex flex-col justify-between shadow-xs transition-all ${
              idx === 0
                ? "border-primary ring-2 ring-primary/20 shadow-md"
                : "border-surface-container hover:border-surface-container-high"
            }`}
          >
            {/* Badge vị trí #1 Chính vs #2, #3 */}
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
              onClick={() => removeImage(idx)}
              className="absolute top-1.5 right-1.5 z-10 w-6 h-6 rounded-full bg-black/60 hover:bg-rose-600 text-white flex items-center justify-center transition-colors shadow-sm"
              title="Xóa ảnh này"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>

            {/* Khung xem trước ảnh tỷ lệ 3:4 */}
            <div className="w-full aspect-[3/4] bg-surface-container overflow-hidden">
              <img
                src={url}
                alt={`Ảnh ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  // Fallback khi ảnh lỗi
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600";
                }}
              />
            </div>

            {/* Thanh công cụ điều khiển vị trí */}
            <div className="p-1.5 bg-surface-container-lowest border-t border-surface-container flex items-center justify-between gap-1">
              <button
                type="button"
                disabled={idx === 0}
                onClick={() => moveImage(idx, idx - 1)}
                className="flex-1 py-1 rounded bg-surface-container-low hover:bg-surface-container text-on-surface disabled:opacity-30 text-[11px] font-bold transition-colors flex items-center justify-center"
                title="Di chuyển sang trước"
              >
                <span className="material-symbols-outlined text-[14px]">arrow_back</span>
              </button>
              {idx !== 0 && (
                <button
                  type="button"
                  onClick={() => setAsPrimary(idx)}
                  className="px-2 py-1 rounded bg-primary/10 hover:bg-primary/20 text-primary text-[10px] font-bold transition-colors"
                  title="Đặt làm ảnh đại diện chính"
                >
                  Lên đầu
                </button>
              )}
              <button
                type="button"
                disabled={idx === images.length - 1}
                onClick={() => moveImage(idx, idx + 1)}
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
  );
}
