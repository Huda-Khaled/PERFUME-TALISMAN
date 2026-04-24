import { useState, useEffect } from "react";

export default function AnnouncementBar() {
  const items = [
    { ar: "تستر بدون كرتون" },
    { ar: "اصلية 100%" },
    { ar: "ضمان ذهبي 3 ايام" },
  ];

  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % items.length);
        setVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="bg-black border-b border-neutral-800 py-2.5">
      <div className="flex justify-center items-center">
        <span
          style={{ transition: "opacity 0.5s ease", opacity: visible ? 1 : 0 }}
          className="flex items-center gap-2.5 text-white text-[15px] font-semibold"
        >
          <span className="w-1.5 h-1.5 rounded-full  shrink-0" />
          {items[current].ar}
        </span>
      </div>
    </div>
  );
}
