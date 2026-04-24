import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { GoArrowUp } from "react-icons/go";
import { WHATSAPP_URL } from "../../constants/contact";

export default function FloatingButtons() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        setScrollProgress(progress);
        setShowScroll(scrollTop > 100);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // SVG circle calculations
    const size = 48;
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset =
      circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-6 left-0 right-0 px-6 flex flex-row items-center justify-between z-50">
      {/* WhatsApp - يمين */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className=" flex items-center gap-2 bg-[#25D366] text-white px-3 py-3 rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
      >
        <FaWhatsapp size={24} />
        <span className="text-base font-medium">تواصل معنا</span>
      </a>
      {showScroll ? (
        <button
          onClick={scrollToTop}
          className="relative w-12 h-12 flex items-center justify-center"
        >
          {/* SVG Progress Circle */}
          <svg
            width={size}
            height={size}
            className="absolute top-0 left-0 -rotate-90"
          >
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="white"
              stroke="#e5e7eb"
              strokeWidth="2"
            />
            {/* Progress circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#0f3d4f"
              strokeWidth="2"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.1s linear" }}
            />
          </svg>

          <GoArrowUp size={22} className="text-[#0f3d4f] relative z-10" />
        </button>
      ) : (
        <div />
      )}
    </div>
  );
}
