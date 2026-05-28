import { Link } from "react-router-dom";
import { FiArrowRight, FiHome } from "react-icons/fi";

export default function PolicyLayout({ title, updatedAt, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light/30 via-white to-white">
      <div className=" px-4 sm:px-6 py-8 md:py-12">
        <nav
          className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-8"
          aria-label="مسار التنقل"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 hover:text-brand transition-colors"
          >
            <FiHome size={15} aria-hidden />
            الرئيسية
          </Link>
          <span aria-hidden>›</span>
          <span className="text-brand font-medium">{title}</span>
        </nav>

        <article className="shadow-sm overflow-hidden">
          <header className="px-6 sm:px-10 pt-8 sm:pt-10 pb-6 border-b border-brand-light/80 bg-gradient-to-l from-brand-light/25 to-transparent">
            <h1 className="title-xl text-2xl sm:text-3xl mb-2">{title}</h1>
            {updatedAt && (
              <p className="text-caption text-sm">تاريخ التحديث: {updatedAt}</p>
            )}
          </header>

          <div className="policy-content px-6 sm:px-10 py-8 sm:py-10 text-primary text-[15px] leading-7 space-y-6">
            {children}
          </div>
    
        </article>
      </div>
    </div>
  );
}

function PolicySection({ title, children }) {
  return (
    <section>
      {title && (
        <h2 className="title-md text-brand text-lg mb-3">{title}</h2>
      )}
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function PolicyList({ items, ordered = false }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      className={`${
        ordered ? "list-decimal" : "list-disc"
      } list-inside sm:list-outside sm:mr-5 space-y-2 marker:text-brand`}
    >
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </Tag>
  );
}

export { PolicySection, PolicyList };
