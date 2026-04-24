import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCartStore, { cartLineKey, DELIVERY_FEE_KWD } from "../../store/cartStore";
import useSessionStore from "../../store/sessionStore";
import useNotificationStore from "../../store/NotificationStore";
import { ordersApi } from "../../api";
import Pageloader from "../../components/Pageloader/Pageloader";

const initialForm = {
  full_name: "",
  phone: "",
  region: "",
  street: "",
  house: "",
  notes: "",
  payment_method: "cod",
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, clearCart, getTotalItems, getSubtotal, getTotalPrice } =
    useCartStore();
  const getSessionId = useSessionStore((s) => s.getSessionId);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const totalItems = useMemo(() => getTotalItems(), [cartItems, getTotalItems]);
  const subtotal = useMemo(() => getSubtotal(), [cartItems, getSubtotal]);
  const totalPrice = useMemo(() => getTotalPrice(), [cartItems, getTotalPrice]);

  const validate = () => {
    if (!cartItems.length) {
      useNotificationStore.getState().addToast({
        type: "error",
        message: "السلة فارغة",
      });
      return false;
    }

    if (!form.full_name.trim()) {
      useNotificationStore.getState().addToast({
        type: "error",
        message: "الاسم الكامل مطلوب",
      });
      return false;
    }

    if (!/^\d{8}$/.test(form.phone.trim())) {
      useNotificationStore.getState().addToast({
        type: "error",
        message: "رقم الهاتف يجب أن يكون 8 أرقام",
      });
      return false;
    }

    if (!form.region.trim() || !form.street.trim() || !form.house.trim()) {
      useNotificationStore.getState().addToast({
        type: "error",
        message: "من فضلك أدخل المنطقة والشارع والمنزل",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await ordersApi.create({
        session_id: getSessionId(),
        customer_name: form.full_name.trim(),
        phone: form.phone.trim(),
        region: form.region.trim(),
        street: form.street.trim(),
        house: form.house.trim(),
        pieces_count: totalItems,
        payment_method: "cod",
        notes: form.notes.trim(),
        cart_items: cartItems.map((item) => ({
          item_type: item.item_type === "package" ? "package" : "product",
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price,
          product_name: item.name,
        })),
      });

      clearCart();
      useNotificationStore.getState().addToast({
        type: "success",
        message: "تم إرسال الطلب بنجاح",
      });
      navigate("/");
    } catch (error) {
      useNotificationStore.getState().addToast({
        type: "error",
        message: error?.response?.data?.error || "فشل إرسال الطلب",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {loading && <Pageloader variant="inline" />}
      <div className="flex items-center gap-2 text-sm text-gray-500 p-6 justify-start">
        <Link to="/" className="hover:underline">
          الرئيسية
        </Link>
        <span>›</span>
        <Link to="/cart" className="hover:underline">
          السلة
        </Link>
        <span>›</span>
        <span>إتمام الطلب</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-brand-light rounded-xl p-6 space-y-4"
        >
          <h1 className="font-bold text-xl text-right"> اتمام الطلب</h1>

          <div>
            <label className="block text-sm mb-1 text-right">
              الاسم الكامل
            </label>
            <input
              type="text"
              value={form.full_name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, full_name: e.target.value }))
              }
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-right">
              رقم الهاتف (8 أرقام)
            </label>
            <input
              type="tel"
              inputMode="numeric"
              pattern="\d{8}"
              maxLength={8}
              value={form.phone}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  phone: e.target.value.replace(/\D/g, "").slice(0, 8),
                }))
              }
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-right">المنطقة</label>
            <input
              type="text"
              value={form.region}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, region: e.target.value }))
              }
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-right">الشارع</label>
            <input
              type="text"
              value={form.street}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, street: e.target.value }))
              }
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-right">المنزل</label>
            <input
              type="text"
              value={form.house}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, house: e.target.value }))
              }
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-right">
              ملاحظات (اختياري)
            </label>
            <textarea
              value={form.notes}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, notes: e.target.value }))
              }
              className="w-full border rounded-lg px-3 py-2 resize-none"
              rows={3}

            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-right">طريقة الدفع</label>
            <input
              type="text"
              value="الدفع عند الاستلام"
              disabled
              className="w-full border rounded-lg px-3 py-2 bg-gray-50"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !cartItems.length}
            className="w-full bg-brand text-white py-3 rounded-lg font-medium hover:bg-brand/90 transition disabled:opacity-50"
          >
            {loading ? "جاري إرسال الطلب..." : "تأكيد الطلب"}
          </button>
        </form>

        <div className="bg-white rounded-xl p-6 shadow-sm h-fit flex flex-col gap-4">
          <h2 className="font-bold text-lg text-right">ملخص الطلب</h2>

          <div className="space-y-3">
            {cartItems.map((item) => (
              <div
                key={cartLineKey(item)}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <img
                  src={`/backend/${item.image}`}
                  alt={item.name}
                  className="w-12 h-12 rounded-md object-cover border border-gray-100 flex-shrink-0"
                />
                <span className="text-right flex-1">{item.name}</span>
                <span>{item.quantity}x</span>
                <span>{(item.quantity * item.price).toFixed(2)} ك‎</span>
              </div>
            ))}
          </div>

          <hr />
          <div className="flex items-center justify-between text-sm">
            <span>{totalItems}</span>
            <span className="text-gray-500">عدد القطع</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>{subtotal.toFixed(2)} ك‎</span>
            <span className="text-gray-500">مجموع المنتجات</span>
          </div>
          {cartItems.length > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span>{DELIVERY_FEE_KWD.toFixed(2)} ك‎</span>
              <span className="text-gray-500">رسوم التوصيل</span>
            </div>
          )}
          <div className="flex items-center justify-between text-sm font-bold">
            <span>{totalPrice.toFixed(2)} ك‎</span>
            <span>الإجمالي</span>
          </div>
        </div>
      </div>
    </div>
  );
}
