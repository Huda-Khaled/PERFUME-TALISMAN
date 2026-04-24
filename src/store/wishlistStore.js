import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const exists = get().items.find((i) => i.id === product.id);
        if (!exists) {
          set((state) => ({ items: [...state.items, product] }));
        }
      },

      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
      },

      toggleItem: (product) => {
        const exists = get().items.find((i) => i.id === product.id);
        if (exists) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },

      isWishlisted: (id) => {
        const items = get().items ?? [];
        return !!items.find((i) => i.id === id);
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "wishlist",
    },
  ),
);

export default useWishlistStore;
