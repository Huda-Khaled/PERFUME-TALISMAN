import { create } from "zustand";
import { persist } from "zustand/middleware";

const generateSessionId = () => {
  const random = Math.random().toString(36).slice(2, 10);
  return `sess_${Date.now()}_${random}`;
};

const useSessionStore = create(
  persist(
    (set, get) => ({
      sessionId: generateSessionId(),

      getSessionId: () => {
        const current = get().sessionId;
        if (current) return current;

        const newId = generateSessionId();
        set({ sessionId: newId });
        return newId;
      },

      resetSessionId: () => {
        set({ sessionId: generateSessionId() });
      },
    }),
    {
      name: "session-store",
    },
  ),
);

export default useSessionStore;
