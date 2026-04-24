import { create } from "zustand";

let nextId = 1;

const NotificationStore = create((set) => ({
  toasts: [],

  addToast: ({ message, sub = "", type = "success" }) => {
    const id = nextId++;
    set((state) => ({
      toasts: [...state.toasts, { id, message, sub, type }],
    }));
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));

export default NotificationStore;
