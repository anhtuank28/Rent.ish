"use client";

import React from 'react';
import Link from 'next/link';
import { useWishlistStore } from '../../../store/wishlistStore';

export function WishlistToast() {
  const { toast, hideToast } = useWishlistStore();

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-sm w-full sm:w-auto bg-on-surface text-surface px-4 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3.5 animate-in fade-in slide-in-from-bottom-5 duration-300 border border-white/10"
    >
      <div className="flex-shrink-0 flex items-center justify-center">
        {toast.type === 'added' ? (
          <span
            className="material-symbols-outlined text-rose-500 text-[24px] animate-bounce"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            favorite
          </span>
        ) : (
          <span className="material-symbols-outlined text-outline-variant text-[24px]">
            heart_broken
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-body-sm font-medium text-surface leading-snug line-clamp-2">
          {toast.text}
        </p>
        {toast.type === 'added' && (
          <Link
            href="/wishlist"
            onClick={hideToast}
            className="inline-flex items-center gap-1 text-[12px] text-primary font-semibold hover:underline mt-1 transition-colors"
          >
            <span>Xem danh sách yêu thích</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </Link>
        )}
      </div>

      <button
        onClick={hideToast}
        className="flex-shrink-0 p-1 text-surface/60 hover:text-surface rounded-full transition-colors"
        aria-label="Đóng thông báo"
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>
  );
}
