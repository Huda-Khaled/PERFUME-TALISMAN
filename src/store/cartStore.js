import { create } from "zustand";
import useNotificationStore from "../store/NotificationStore";

export function cartLineKey(item) {
  if (item?.lineKey) return item.lineKey;
  const t = item?.item_type === "package" ? "package" : "product";
  return `${t}:${item?.id}`;
}

export const DELIVERY_FEE_KWD = 2;

const useCartStore = create((set, get) => ({
  cartItems: [],

  addToCart: (product, qty = 1) => {
    const item_type = product.item_type === "package" ? "package" : "product";
    const lineKey = `${item_type}:${product.id}`;
    const payload = { ...product, item_type, lineKey, quantity: qty };
    const name = product.name || product.title || "المنتج";

    const existing = get().cartItems.find(
      (item) => cartLineKey(item) === lineKey,
    );

    if (existing) {
      set((state) => ({
        cartItems: state.cartItems.map((item) =>
          cartLineKey(item) === lineKey
            ? { ...item, quantity: item.quantity + qty }
            : item,
        ),
      }));
    } else {
      set((state) => ({
        cartItems: [...state.cartItems, payload],
      }));
    }

    // ✅ إشعار الإضافة
    useNotificationStore.getState().addToast({
      type: "success",
      message: "تمت الإضافة للسلة",
      sub: name,
    });
  },

  removeFromCart: (lineKey) => {
    const item = get().cartItems.find((i) => cartLineKey(i) === lineKey);
    const name = item?.name || item?.title || "المنتج";

    set((state) => ({
      cartItems: state.cartItems.filter((i) => cartLineKey(i) !== lineKey),
    }));

    // ❌ إشعار الحذف
    useNotificationStore.getState().addToast({
      type: "error",
      message: "تم الحذف من السلة",
      sub: name,
    });
  },

  updateQuantity: (lineKey, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        cartLineKey(item) === lineKey ? { ...item, quantity } : item,
      ),
    })),

  clearCart: () => set({ cartItems: [] }),

  getTotalItems: () =>
    get().cartItems.reduce((acc, item) => acc + item.quantity, 0),

  getSubtotal: () =>
    get().cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),

  getTotalPrice: () => {
    const sub = get().getSubtotal();
    return get().cartItems.length === 0 ? sub : sub + DELIVERY_FEE_KWD;
  },
}));

export default useCartStore;
