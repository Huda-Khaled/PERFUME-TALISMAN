import useCartStore, { cartLineKey, DELIVERY_FEE_KWD } from "../../store/cartStore";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";


export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getSubtotal, getTotalPrice } =
    useCartStore();

  return (
    <div className="min-h-screen ">
      {/* Breadcrumb - RTL order: الرئيسية › سلة المشتريات */}
      <div className="flex items-center gap-2 text-sm text-gray-500 p-6 justify-start">
        <Link to="/" className="hover:underline">
          الرئيسية
        </Link>
        <span>›</span>
        <span>سلة المشتريات</span>
      </div>

      {/* Main layout: items flex-1, summary fixed width */}
      <div className="max-w-6xl mx-auto px-4 pb-10 flex flex-col md:flex-row gap-6">
        {/* ===== CART ITEMS ===== */}
        <div className="flex-1 flex flex-col gap-4">
          {cartItems.length === 0 ? (
            <div className=" rounded-xl p-10 text-center text-gray-400">
              السلة فارغة
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={cartLineKey(item)}
                className="bg-white border border-brand-light rounded-md overflow-hidden px-8 "
              >
                {/* ---- DESKTOP (md+): one flat row ---- */}
                {/* RTL order: Image | Name+Price | Quantity | Total | × */}
                <div className="hidden md:flex items-center gap-4 p-4 mb-4">
                  <img
                    src={"/backend/" + item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0 "
                  />
                  <div className="flex-1 text-right">
                    <h3 className="title-lg ">{item.name}</h3>
                    <div className="flex items-center justify-start gap-2 mt-1">
                      <span className="text-error text-sm font-medium">
                        {item.price} ك‎
                      </span>
                      {item.original_price && (
                        <span className="text-gray-400 line-through text-xs">
                          {item.original_price} ك‎
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2 py-1 flex-shrink-0">
                    <button
                      onClick={() =>
                        item.quantity > 1
                          ? updateQuantity(cartLineKey(item), item.quantity - 1)
                          : removeFromCart(cartLineKey(item))
                      }
                      className="w-6 h-6 flex items-center justify-center text-lg hover:text-brand transition"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(cartLineKey(item), item.quantity + 1)
                      }
                      className="w-6 h-6 flex items-center justify-center text-lg hover:text-brand transition"
                    >
                      +
                    </button>
                  </div>
                  <span className="title-lg text-gray-700 whitespace-nowrap flex-shrink-0">
                    المجموع: {(item.price * item.quantity).toFixed(2)} ك‎
                  </span>
                  <button
                    onClick={() => removeFromCart(cartLineKey(item))}
                    className="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center text-lg leading-none hover:bg-red-600 transition flex-shrink-0"
                  >
                    <FiX />
                  </button>
                </div>

                {/* ---- MOBILE: 2 rows ---- */}
                <div className="md:hidden">
                  {/* Row 1: Image | Name+Price | × */}
                  <div className="flex items-start gap-3 p-4 pb-3">
                    <img
                      src={"/backend/" + item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 text-right">
                      <h3 className="font-semibold text-sm">{item.name}</h3>
                      <div className="flex items-center justify-start gap-2 mt-1">
                        <span className="text-error text-sm font-medium">
                          {item.price} ك‎
                        </span>
                        {item.original_price && (
                          <span className="text-gray-400 line-through text-xs">
                            {item.original_price} ك‎
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(cartLineKey(item))}
                      className="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center text-lg leading-none hover:bg-red-600 transition flex-shrink-0"
                    >
                      <FiX />
                    </button>
                  </div>
                  {/* Row 2: Total | Quantity */}
                  <div className="flex items-center justify-between px-4 pb-4 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2 py-1">
                      <button
                        onClick={() =>
                          item.quantity > 1
                            ? updateQuantity(cartLineKey(item), item.quantity - 1)
                            : removeFromCart(cartLineKey(item))
                        }
                        className="w-6 h-6 flex items-center justify-center text-lg hover:text-brand transition"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(cartLineKey(item), item.quantity + 1)
                        }
                        className="w-6 h-6 flex items-center justify-center text-lg hover:text-brand transition"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                      المجموع: {(item.price * item.quantity).toFixed(2)} ك‎
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ===== ORDER SUMMARY ===== */}
        <div className="w-full md:w-72 bg-white rounded-xl p-6 shadow-sm h-fit flex flex-col gap-4">
          <h2 className="font-bold text-lg text-right">ملخص الطلب</h2>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{getSubtotal().toFixed(2)} ك‎</span>
            <span className="text-gray-500">مجموع المنتجات</span>
          </div>
          {cartItems.length > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{DELIVERY_FEE_KWD.toFixed(2)} ك‎</span>
              <span className="text-gray-500">رسوم التوصيل</span>
            </div>
          )}
          <hr />
          <div className="flex items-center justify-between text-sm font-bold">
            <span>{getTotalPrice().toFixed(2)} ك‎</span>
            <span>الإجمالي</span>
          </div>
          <p className="text-xs text-gray-400 text-right">
            * الأسعار شاملة للضريبة
          </p>
          <Link
            to="/checkout"
            className="w-full bg-brand text-white py-3 rounded-lg font-medium hover:bg-brand/90 transition text-center"
          >
            اتمام الطلب
          </Link>
        </div>
      </div>
    </div>
  );
}
