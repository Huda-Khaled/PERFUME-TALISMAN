import { Link } from "react-router-dom";

/** شريط: الرئيسية › عنوان الصفحة الحالية */
export default function PageBackHome({ currentLabel, className = "" }) {
  return (
    <nav
      className={`flex items-center gap-2 text-sm text-gray-600 ${className}`}
      aria-label="مسار التنقل"
    >
      <Link to="/" className="hover:text-brand hover:underline">
        الرئيسية
      </Link>
      <span className="text-gray-400" aria-hidden>
        ›
      </span>
      <span className="text-gray-900 font-medium">{currentLabel}</span>
    </nav>
  );
}
