import { useNavigate } from "react-router-dom";
import catPerfumes from "../../assets/Perfumes.webp";
import catPackages from "../../assets/Packages.webp";

const categories = [
  { id: 1, title: "جميع العطور", image: catPerfumes, path: "/products" },
  { id: 2, title: "البكجات", image: catPackages, path: "/PackagePage" },
];

export default function CategoriesSection() {
  const navigate = useNavigate();

  return (
    <section id="categories-section" className="py-12 px-4 scroll-mt-24">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-brand mb-2">
          أقسام العطور
        </h2>
        <div className="mx-auto mt-3  bg-brand-light w-[100px] h-[3px]" />
      </div>

      <div className="flex flex-row gap-4 max-w-3xl mx-auto">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(cat.path)}
            className="flex-1 cursor-pointer group"
          >
            {/* الصورة */}
            <div className="relative h-44 md:h-56 rounded-2xl overflow-hidden">
              <img
                src={cat.image}
                alt={cat.title}
                width={400}
                height={300}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/50 transition-all duration-300" />
            </div>

            {/* العنوان تحت الصورة */}
            <div className="text-center mt-3">
              <span className=" title-lg md:text-brand  tracking-wide">
                {cat.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
