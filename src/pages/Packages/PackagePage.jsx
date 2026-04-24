

import { useQuery } from "@tanstack/react-query";
import { packagesApi } from "../../api";
import ProductCard from "../../components/shared/ProductCard";
import PageBackHome from "../../components/shared/PageBackHome";
import Pageloader from "../../components/Pageloader/Pageloader";
import FilterDropdown from "../../components/FilterDropdown/FilterDropdown";
export default function PackagePage() {
  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: () => packagesApi.getAll().then((r) => r.data),
  });

  return (
    <>
     
      <div className="relative mx-auto min-h-[42vh] max-w-7xl px-6 pb-12 pt-6 md:pt-10">
        <PageBackHome currentLabel="بكجات" className="mb-4" />
        {isLoading && <Pageloader variant="inline" />}
        <FilterDropdown packages={packages}>
          {(sortedPackages, FilterUI) => (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-brand ">
                  بكجات
                </h2>
                {FilterUI}
              </div>

              {isLoading ? (
                <div className="min-h-[40vh]" aria-hidden />
              ) : sortedPackages.length === 0 ? (
                <p className="text-center text-gray-500">مفيش بكجات حالياً</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {sortedPackages.map((pkg) => (
                    <ProductCard
                      key={`package-${pkg.id}`}
                      product={{
                        id: pkg.id,
                        image: pkg.image,
                        name: pkg.name,
                        description: pkg.description,
                        price: pkg.price,
                        in_stock: pkg.in_stock,
                        item_type: "package",
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </FilterDropdown>
      </div>
    </>
  );
}
