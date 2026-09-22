"use client";

import React from 'react';
import { useWishlistStore, WishlistItem } from '../../../store/wishlistStore';

interface WishlistButtonProps {
  item: WishlistItem;
  variant?: 'icon' | 'button' | 'pill';
  className?: string;
  iconClassName?: string;
  onToggle?: (isSaved: boolean) => void;
}

export function WishlistButton({
  item,
  variant = 'icon',
  className = '',
  iconClassName = '',
  onToggle,
}: WishlistButtonProps) {
  const { isInWishlist, toggleItem, isHydrated } = useWishlistStore();

  const isSaved = isHydrated ? isInWishlist(item.id) : false;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = toggleItem(item);
    if (onToggle) {
      onToggle(result);
    }
  };

  if (variant === 'button') {
    return (
      <button
        onClick={handleClick}
        type="button"
        aria-label={isSaved ? 'Đã lưu vào danh sách yêu thích' : 'Thêm vào danh sách yêu thích'}
        className={`flex-1 h-11 rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-label-md text-label-md font-semibold ${
          isSaved
            ? 'bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100'
            : 'bg-surface-container-low hover:bg-surface-container text-on-surface border border-transparent'
        } ${className}`}
      >
        <span
          className={`material-symbols-outlined text-[19px] transition-transform duration-300 ${
            isSaved ? 'text-rose-500 scale-110' : 'text-on-surface-variant'
          }`}
          style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
        >
          favorite
        </span>
        <span>{isSaved ? 'Đã Lưu Vào Yêu Thích' : 'Thêm vào Yêu thích'}</span>
      </button>
    );
  }

  if (variant === 'pill') {
    return (
      <button
        onClick={handleClick}
        type="button"
        aria-label={isSaved ? 'Xóa khỏi yêu thích' : 'Lưu vào yêu thích'}
        className={`w-11 h-11 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface flex items-center justify-center shadow-md hover:bg-surface-container-lowest transition-transform active:scale-95 ${className}`}
      >
        <span
          className={`material-symbols-outlined text-[22px] transition-all duration-300 ${
            isSaved ? 'text-rose-500 scale-110' : 'text-on-surface hover:text-primary'
          } ${iconClassName}`}
          style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
        >
          favorite
        </span>
      </button>
    );
  }

  // Default 'icon' variant for Product Cards
  return (
    <button
      onClick={handleClick}
      type="button"
      aria-label={isSaved ? 'Xóa khỏi yêu thích' : 'Lưu vào yêu thích'}
      className={`w-9 h-9 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-sm hover:bg-surface-container-lowest active:scale-90 ${className}`}
    >
      <span
        className={`material-symbols-outlined text-[20px] transition-all duration-300 ${
          isSaved ? 'text-rose-500 scale-110' : 'text-on-surface hover:text-rose-500'
        } ${iconClassName}`}
        style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
      >
        favorite
      </span>
    </button>
  );
}
