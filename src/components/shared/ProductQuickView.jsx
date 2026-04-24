import { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { FiShoppingBag, FiX, FiPlus, FiMinus } from "react-icons/fi";
import { IoShareSocialOutline } from "react-icons/io5";
import useCartStore from "../../store/cartStore";

const BASE_URL = "/backend/";

/** أزرار مشاركة وإغلاق فوق الصورة — دائرة رمادية شفافة تحت الأيقونة للوضوح */
function ImageTopActions({ handleShare, handleClose, top = "0.75rem" }) {
  const btn =
    "pointer-events-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-600/55 text-white shadow-sm ring-1 ring-white/25 backdrop-blur-[2px] transition hover:bg-gray-600/75 active:scale-95";
  return (
    <div
      className="pointer-events-none absolute left-3 right-3 z-30 flex justify-between items-center"
      style={{ top }}
    >
      <button
        type="button"
        className={btn}
        onClick={handleShare}
        aria-label="مشاركة"
      >
        <IoShareSocialOutline size={19} />
      </button>
      <button
        type="button"
        className={btn}
        onClick={handleClose}
        aria-label="إغلاق"
      >
        <FiX size={19} strokeWidth={2.5} />
      </button>
    </div>
  );
}

function ModalContent({
  product,
  isAvailable,
  qty,
  setQty,
  handleClose,
  handleShare,
  handleAddToCart,
  isAdding,
  showDetails,
  isMobile = false,
}) {
  return (
    <>
      {/* صورة desktop */}
      {!isMobile && (
        <div className="w-[45%] shrink-0 bg-gray-50 overflow-hidden relative z-0">
          <img
            src={BASE_URL + product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 scale-100"
          />
          <ImageTopActions
            handleShare={handleShare}
            handleClose={handleClose}
          />
        </div>
      )}

      {/* المحتوى */}
      <div className="relative flex flex-col flex-1 min-h-0 overflow-hidden">
        {isMobile && (
          <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden shrink-0">
            <img
              src={BASE_URL + product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <ImageTopActions
              handleShare={handleShare}
              handleClose={handleClose}
              top="max(0.75rem, env(safe-area-inset-top, 0px))"
            />
          </div>
        )}

        {/* التفاصيل */}
        <div
          className={`
            flex flex-col gap-4 p-6 overflow-y-auto flex-1 min-h-0
            transition-all duration-500
            pt-6
            ${showDetails ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          {/* الاسم */}
          <div className="text-right">
            <h2 className="text-xl font-medium text-gray-900 mb-1">
              {product.name}
            </h2>
            <p className="text-sm text-gray-400">{product.description}</p>
          </div>

          {/* السعر */}
          <div className="flex items-baseline gap-3 flex-row-reverse justify-end">
            <span className="text-xl font-semibold text-red-500">
              {product.price} دينار كويتي
            </span>
            {product.old_price && (
              <span className="text-sm text-gray-400 line-through">
                {product.old_price} دينار كويتي
              </span>
            )}
          </div>

          <hr className="border-gray-100" />

          {/* متوفر */}
          <div className="flex justify-start">
            {isAvailable ? (
              <span className="flex items-center gap-1.5 text-sm text-green-700">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                متوفر
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-sm text-red-600">
                <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                غير متوفر
              </span>
            )}
          </div>

          {/* الكمية + زر السلة */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!isAvailable || isAdding}
              className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-800 py-2  hover:bg-gray-50 transition font-medium disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FiShoppingBag size={18} />
              {isAdding ? "جاري الإضافة..." : "إضافة للسلة"}
            </button>
            {/* العداد */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full transition disabled:opacity-30"
              >
                <FiMinus size={14} />
              </button>

              <span className="w-6 text-center font-medium text-gray-800">
                {qty}
              </span>

              <button
                onClick={() => setQty((q) => q + 1)}
                disabled={!isAvailable}
                className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full transition disabled:opacity-30"
              >
                <FiPlus size={14} />
              </button>
            </div>

            {/* زر السلة */}
          </div>
        </div>
      </div>
    </>
  );
}

export default function ProductQuickView({ product, onClose }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const [qty, setQty] = useState(1);
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const closeTimerRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const t = setTimeout(() => {
      setShowDetails(true);
    }, 350);
    return () => clearTimeout(t);
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    closeTimerRef.current = setTimeout(onClose, 300);
  }, [onClose]);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    const title = product?.name || "عطر";
    try {
      if (navigator.share) {
        await navigator.share({ title, text: title, url });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      /* إلغاء المستخدم أو عدم دعم المشاركة */
    }
  }, [product?.name]);

  const handleAddToCart = async () => {
    if (Number(product?.in_stock) !== 1) return;
    setIsAdding(true);
    try {
      await addToCart(product, qty);
      handleClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsAdding(false);
    }
  };

  if (!product) return null;

  const isAvailable = Number(product?.in_stock) === 1;

  const sharedProps = {
    product,
    isAvailable,
    qty,
    setQty,
    handleClose,
    handleShare,
    handleAddToCart,
    isAdding,
    showDetails,
  };

  /* Portal إلى body حتى لا يبقى المودال تحت الـ navbar (main + isolate) */
  const modalTree = (
    <div data-modal-open="true">
      <div
        className={`fixed inset-0 z-[1000] bg-black/50 transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
        aria-hidden={!visible}
      />

      <div
        className={`
          fixed z-[1010] bg-white overflow-hidden
          hidden md:flex flex-row
          w-full max-w-2xl
          top-1/2 left-1/2 -translate-x-1/2
          transition-all duration-300
          ${visible ? "-translate-y-1/2 opacity-100" : "-translate-y-[45%] opacity-0"}
        `}
        style={{ maxHeight: "90vh" }}
      >
        <ModalContent {...sharedProps} />
      </div>

      <div
        className={`
          fixed z-[1010] bg-white
          flex md:hidden flex-col
          w-[85%] top-0 right-0 bottom-0 max-h-dvh
          transition-transform duration-1000 ease-out
          ${visible ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <ModalContent {...sharedProps} isMobile />
      </div>
    </div>
  );

  return createPortal(modalTree, document.body);
}
