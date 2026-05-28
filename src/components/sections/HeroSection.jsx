import img from "../../assets/hero.webp";

export default function Hero() {
  const scrollToCategories = (e) => {
    e.preventDefault();
    document
      .getElementById("categories-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full h-[500px] md:h-[700px] overflow-hidden bg-dark">
      <img
        src={img}
        alt="hero"
        width={1920}
        height={700}
        className="w-full h-full object-cover object-center"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      {/* النص والزرار */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-center px-4">
        <h1 className="text-white text-lg md:text-base max-w-md">
          تشكيلة فاخرة من أرقى العطور العالمية
        </h1>
        <a
          href="#categories-section"
          onClick={scrollToCategories}
          className="bg-primary hover:bg-gold-dark text-white text-sm font-semibold px-8 py-3  transition-all duration-300 inline-block"
        >
          اطلب الآن
        </a>
      </div>
    </div>
  );
}
