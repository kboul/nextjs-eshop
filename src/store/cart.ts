import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearItem: () => void;
};

export type { CartItem, CartStore };

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(({ id }) => id === item.id);
          if (existing) {
            return {
              items: state.items.map((stateItem) =>
                stateItem.id === item.id ? { ...stateItem, quantity: stateItem.quantity + item.quantity } : stateItem
              )
            };
          }
          return { items: [...state.items, item] };
        }),
      removeItem: (id) =>
        set((state) => {
          return {
            items: state.items.map((stateItem) =>
              stateItem.id === id
                ? { ...stateItem, quantity: stateItem.quantity > 0 ? stateItem.quantity - 1 : 0 }
                : stateItem
            )
          };
        }),
      clearItem: () => set(() => ({ items: [] }))
    }),
    { name: "cart" }
  )
);
