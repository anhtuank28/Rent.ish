import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface WishlistItem {
  id: string | number;
  title: string;
  brand: string;
  price: number; // rental price in K
  retailPrice: number; // retail price in K
  imageUrl: string;
  sizes: string[];
  material?: string;
  addedAt?: string;
}

interface ToastInfo {
  text: string;
  type: 'added' | 'removed';
  id: number;
}

interface WishlistState {
  items: WishlistItem[];
  isHydrated: boolean;
  toast: ToastInfo | null;
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string | number) => void;
  toggleItem: (item: WishlistItem) => boolean;
  isInWishlist: (id: string | number) => boolean;
  clearWishlist: () => void;
  setHydrated: () => void;
  showToast: (text: string, type: 'added' | 'removed') => void;
  hideToast: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isHydrated: false,
      toast: null,

      addItem: (item) => {
        const currentItems = get().items;
        const exists = currentItems.some((i) => String(i.id) === String(item.id));
        if (!exists) {
          const newItem = { ...item, addedAt: new Date().toISOString() };
          set({ items: [newItem, ...currentItems] });
          get().showToast(`Đã thêm "${item.title}" vào danh sách yêu thích!`, 'added');
        }
      },

      removeItem: (id) => {
        const currentItems = get().items;
        const removedItem = currentItems.find((i) => String(i.id) === String(id));
        set({
          items: currentItems.filter((item) => String(item.id) !== String(id)),
        });
        if (removedItem) {
          get().showToast(`Đã xóa "${removedItem.title}" khỏi danh sách yêu thích!`, 'removed');
        }
      },

      toggleItem: (item) => {
        const currentItems = get().items;
        const exists = currentItems.some((i) => String(i.id) === String(item.id));
        if (exists) {
          get().removeItem(item.id);
          return false;
        } else {
          get().addItem(item);
          return true;
        }
      },

      isInWishlist: (id) => {
        return get().items.some((item) => String(item.id) === String(id));
      },

      clearWishlist: () => {
        set({ items: [] });
        get().showToast('Đã xóa tất cả trang phục trong danh sách yêu thích!', 'removed');
      },

      setHydrated: () => set({ isHydrated: true }),

      showToast: (text, type) => {
        const toastId = Date.now();
        set({ toast: { text, type, id: toastId } });
        setTimeout(() => {
          const currentToast = get().toast;
          if (currentToast && currentToast.id === toastId) {
            set({ toast: null });
          }
        }, 3500);
      },

      hideToast: () => set({ toast: null }),
    }),
    {
      name: 'rent-ish-wishlist',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
