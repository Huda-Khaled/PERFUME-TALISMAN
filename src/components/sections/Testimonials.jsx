import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "رنا غنيم",
    review:
      "بصراحة تجربة حلوة خامة وفخامة وعن نفسي أكررها الف مرة وحيكون متجري المفضل.",
    stars: 4,
  },
  {
    id: 2,
    name: "أمل السبيعي",
    review: "ريحة جميلة جداً وتدوم طول اليوم، التغليف أنيق والتوصيل سريع.",
    stars: 5,
  },
  {
    id: 3,
    name: "أم رائد",
    review: "منتج راقي جداً وسعر مناسب، هطلب أكثر من مرة بالتأكيد.",
    stars: 5,
  },
  {
    id: 4,
    name: "منى الشهري",
    review: "تجربة رائعة من أول طلب للتوصيل، كل شيء كان ممتاز.",
    stars: 4,
  },
  {
    id: 5,
    name: "سارة محمد",
    review: "العطر فاق توقعاتي والخدمة كانت محترمة جداً.",
    stars: 5,
  },
  {
    id: 6,
    name: "نورة العتيبي",
    review: "أجمل هدية قدمتها، الكل أعجبه التغليف والريحة.",
    stars: 5,
  },
];

function Stars({ count }) {
  return (
    <div className="flex gap-1 justify-end">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-xl ${i < count ? "text-yellow-400" : "text-gray-200"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function Avatar() {
  return (
    <div className="w-12 h-12 rounded-full bg-[#e8f4f8] flex items-center justify-center shrink-0">
      <svg
        viewBox="0 0 24 24"
        className="w-8 h-8 text-[#164863]"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
      </svg>
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const update = () => setPerView(window.innerWidth < 768 ? 1 : 3);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const total = Math.ceil(testimonials.length / perView);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 3500);
    return () => clearInterval(timer);
  }, [total]);

  const visible = testimonials.slice(
    current * perView,
    current * perView + perView,
  );

  return (
    <section className="py-14 px-4 bg-gray-50">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-brand mb-2">
          آراء العملاء
        </h2>
        <div className=" w-[100px] h-[3px] bg-brand-light mx-auto" />
      </div>

      {/* الكاردز */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto min-h-[200px]">
        {visible.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between gap-4"
          >
            <div>
              <span className="text-4xl text-gray-200 font-serif leading-none">
                "
              </span>
              <p className="text-gray-600 text-sm leading-relaxed mt-1 text-right">
                {t.review}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="text-right">
                <p className="text-gray-800 text-sm font-semibold">{t.name}</p>
                <Stars count={t.stars} />
              </div>
              <Avatar name={t.name} />
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`انتقل إلى التقييم ${i + 1}`}
            className="p-3 flex items-center justify-center"
          >
            <span
              className={`h-2 rounded-full transition-all duration-300 block ${
                i === current ? "w-6 bg-[#164863]" : "w-2 bg-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
