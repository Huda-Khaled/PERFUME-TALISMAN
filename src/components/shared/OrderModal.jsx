import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { ordersApi } from "../../api";
import useSessionStore from "../../store/sessionStore";
import useNotificationStore from "../../store/NotificationStore";

export default function OrderModal({ item, onClose }) {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const getSessionId = useSessionStore((s) => s.getSessionId);

  const handleSubmit = async () => {
    if (!name.trim()) {
      useNotificationStore.getState().addToast({
        type: "error",
        message: "من فضلك ادخل اسمك",
      });
      return;
    }
    setLoading(true);
    try {
      await ordersApi.create({
        session_id: getSessionId(),
        customer_name: name,
        product_id: item.id,
        notes,
      });
      useNotificationStore.getState().addToast({
        type: "success",
        message: "تم إرسال طلبك بنجاح! 🎉",
      });
      onClose();
    } catch {
      useNotificationStore.getState().addToast({
        type: "error",
        message: "حدث خطأ، حاول مرة أخرى",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="glass rounded-3xl p-8 w-full max-w-md"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif">تأكيد الطلب</h2>
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white transition-colors"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 mb-6">
            <p className="text-white/50 text-sm mb-1">المنتج</p>
            <p className="font-serif text-lg">{item.name}</p>
            <p className="gold-text font-semibold mt-1">{item.price} ج.م</p>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="text-white/50 text-sm mb-2 block">اسمك *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ادخل اسمك الكامل"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div>
              <label className="text-white/50 text-sm mb-2 block">
                ملاحظات (اختياري)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="أي ملاحظات إضافية..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-primary w-full justify-center flex items-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin" />
            ) : (
              "إرسال الطلب"
            )}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
