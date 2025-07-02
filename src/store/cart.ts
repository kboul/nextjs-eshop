import { create } from "zustand";
import { persist } from "zustand/middleware";

import { quantityToAddSubtract } from "@/constants";

type CartProduct = {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
};

type CartStore = {
  products: CartProduct[];
  addProductQuantity: (product: CartProduct) => void;
  removeProductQuantity: (id: string) => void;
  removeProduct: (id: string) => void;
  clearCart: () => void;
};

export type { CartProduct, CartStore };

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      products: [],
      addProductQuantity: (product) =>
        set((state) => {
          const existing = state.products.find(({ id }) => id === product.id);
          if (existing) {
            return {
              products: state.products.map((stateProduct) =>
                stateProduct.id === product.id
                  ? { ...stateProduct, quantity: stateProduct.quantity + product.quantity }
                  : stateProduct
              )
            };
          }
          return { products: [...state.products, product] };
        }),
      removeProductQuantity: (id) =>
        set((state) => {
          return {
            products: state.products.map((product) =>
              product.id === id
                ? { ...product, quantity: product.quantity > 0 ? product.quantity - quantityToAddSubtract : 0 }
                : product
            )
          };
        }),
      removeProduct: (id) =>
        set((state) => {
          return {
            products: state.products.filter((product) => product.id !== id)
          };
        }),
      clearCart: () => set(() => ({ products: [] }))
    }),
    { name: "cart" }
  )
);
