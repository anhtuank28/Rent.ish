import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string; // local id for localstorage, db id when merged
  variantId: string;
  rentalStartDate: string;
  rentalEndDate: string;
  // Metadata for UI only
  product: {
    id: string;
    name: string;
    brand: string;
    image: string;
    price: number;
    retailPrice: number;
    size: string;
  }
}

interface CartState {
  items: CartItem[];
  isHydrated: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  setHydrated: () => void;
  setItems: (items: CartItem[]) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isHydrated: false,
      
      addItem: (item) => set((state) => ({ 
        items: [...state.items, item] 
      })),
      
      removeItem: (id) => set((state) => ({ 
        items: state.items.filter(item => item.id !== id) 
      })),
      
      clearCart: () => set({ items: [] }),
      
      setHydrated: () => set({ isHydrated: true }),
      
      setItems: (items) => set({ items })
    }),
    {
      name: 'rent-ish-cart', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      }
    }
  )
);
