import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiSearch } from "react-icons/fi";
import { productsApi } from "../../api";
import ProductCard from "../../components/shared/ProductCard";
import PageBackHome from "../../components/shared/PageBackHome";
import Pageloader from "../../components/Pageloader/Pageloader";
import FilterDropdown from "../../components/FilterDropdown/FilterDropdown";

export default function ProductPage() {
  const [search] = useState("");

  const {
    data: products = [],
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const r = await productsApi.getAll();
      return r.data;
    },
  });

  return (
    <>
      <div className="relative mx-auto mt-6 md:mt-10 min-h-[42vh] max-w-7xl px-4 pb-12">
        {" "}
        <PageBackHome currentLabel="جميع العطور" className="mb-4" />
        {isLoading && <Pageloader variant="inline" />}
        <FilterDropdown packages={products}>
          {(sortedProducts, FilterUI) => {
            const filtered = sortedProducts.filter((p) => {
              return p.name.toLowerCase().includes(search.toLowerCase());
            });

            return (
              <>
                {/* العنوان + الفلتر */}
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-brand">
                    جميع العطور
                  </h2>
                  {FilterUI}
                </div>

                {/* المحتوى */}
                {isLoading ? (
                  <div className="min-h-[40vh]" aria-hidden />
                ) : filtered.length === 0 ? (
                  <div className="text-center py-24 text-white/30">
                    <p className="text-6xl mb-4">🔍</p>
                    <p>لا توجد نتائج</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {filtered.map((product, i) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        index={i}
                      />
                    ))}
                  </div>
                )}
              </>
            );
          }}
        </FilterDropdown>
      </div>
    </>
  );
}