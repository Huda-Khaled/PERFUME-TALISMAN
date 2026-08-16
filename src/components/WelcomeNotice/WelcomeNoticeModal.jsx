import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiCheckCircle } from "react-icons/fi";

const NOTICE_ITEMS = [
  "جميع العطور المتوفرة اصلية 100%",
  "تستر بدون كرتون",
  "بدون استعمال ( جديدة كلياً)",
  "حيث نقدم لكم ضمان 3 ايام من تاريخ استلام الطلب",
];

export default function WelcomeNoticeModal() {
  const [mounted, setMounted] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    const frameId = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frameId);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted]);

  const handleAccept = useCallback(() => {
    setVisible(false);
    setTimeout(() => setMounted(false), 300);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div data-modal-open="true" role="dialog" aria-modal="true" aria-labelledby="welcome-notice-title">
      <div
        className={`fixed inset-0 z-[1000] bg-black/55 backdrop-blur-[2px] transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      <div
        className={`fixed z-[1010] top-1/2 left-1/2 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 transition-all duration-300 ${
          visible ? "-translate-y-1/2 opacity-100 scale-100" : "-translate-y-[45%] opacity-0 scale-95"
        }`}
      >
        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
          <div className="h-1.5 bg-gradient-to-l from-primary via-gold-light to-gold-dark" />

          <div className="px-6 pb-6 pt-7 text-right">
            <div className="mb-5 flex items-center justify-center gap-2">
              <span className="h-px w-10 bg-brand-light" />
              <h2
                id="welcome-notice-title"
                className="text-xl font-bold text-brand"
              >
                ملاحظة
              </h2>
              <span className="h-px w-10 bg-brand-light" />
            </div>

            <ul className="mb-7 space-y-3.5">
              {NOTICE_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-gray-700">
                  <FiCheckCircle
                    className="mt-0.5 shrink-0 text-primary"
                    size={18}
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={handleAccept}
              className="w-full bg-primary py-3 text-sm font-bold text-white transition-colors duration-300 hover:bg-gold-dark active:scale-[0.98]"
            >
              موافق
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
