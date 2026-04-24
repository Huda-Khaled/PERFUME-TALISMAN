import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { packagesApi } from "../../api"; 
import ProductCard from "../shared/ProductCard";
import Pageloader from "../Pageloader/Pageloader";

export default function FeaturedPerfumes() {
  const { data: packages, isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const r = await packagesApi.getAll(); 
      return r.data;
    },
  });

  const featured = packages?.slice(0, 6); 

  return (
    <section className="py-8 px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-brand mb-2">
          عطور مختارة
        </h2>
        <div className="mx-auto mt-3 bg-brand-light w-[100px] h-[3px]" />
      </div>

      <div className="relative mx-auto min-h-[260px] max-w-7xl">
        {isLoading && <Pageloader variant="inline" />}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto">
          {!isLoading &&
            featured?.map((pkg) => (
              <ProductCard
                key={pkg.id}
                product={{
                  id: pkg.id,
                  image: pkg.image,
                  name: pkg.name,
                  description: pkg.description,
                  price: pkg.price,
                  in_stock: pkg.in_stock,
                  item_type: "package", // مهم للـ QuickView
                }}
              />
            ))}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <Link
          to="/PackagePage" // صح زي ما هو
          className="border border-brand text-brand hover:bg-brand hover:text-white text-sm px-8 py-3"
        >
          عرض الكل
        </Link>
      </div>
    </section>
  );
}
