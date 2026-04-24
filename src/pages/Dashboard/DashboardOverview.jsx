import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FiPackage, FiLayers, FiShoppingBag, FiTrendingUp } from "react-icons/fi";
import { adminStatsApi } from "../../api/adminApi";
import Pageloader from "../../components/Pageloader/Pageloader";

export default function DashboardOverview() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: () => adminStatsApi.get().then((r) => r.data),
  });

  const cards = [
    {
      label: "إجمالي المنتجات",
      value: stats?.total_products ?? "—",
      icon: FiPackage,
      href: "/dashboard/products",
      accent: "from-brand/15 to-slate-50",
      border: "border-brand/20",
    },
    {
      label: "إجمالي البكجات",
      value: stats?.total_packages ?? "—",
      icon: FiLayers,
      href: "/dashboard/packages",
      accent: "from-violet-100/80 to-slate-50",
      border: "border-violet-200/60",
    },
    {
      label: "إجمالي الطلبات",
      value: stats?.total_orders ?? "—",
      icon: FiShoppingBag,
      href: "/dashboard/orders",
      accent: "from-primary/15 to-slate-50",
      border: "border-primary/25",
    },
    {
      label: "إجمالي المبيعات (د.ك)",
      value:
        stats?.total_revenue != null
          ? Number(stats.total_revenue).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : "—",
      icon: FiTrendingUp,
      href: "/dashboard/orders",
      accent: "from-emerald-100/80 to-slate-50",
      border: "border-emerald-200/60",
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          مرحباً بك
        </h1>
      </div>

      <div className="relative min-h-[180px]">
        {isLoading && <Pageloader variant="inline" />}
        {isLoading ? (
          <div className="min-h-[160px]" aria-hidden />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <Link
              key={c.label}
              to={c.href}
              className={`group rounded-2xl border ${c.border} bg-gradient-to-br ${c.accent} p-6 hover:shadow-md transition shadow-sm`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-slate-600 text-sm">{c.label}</p>
                  <p className="text-2xl md:text-3xl font-bold text-slate-900 mt-2 tabular-nums">
                    {c.value}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/80 text-brand shadow-sm border border-slate-100 group-hover:border-primary/30 transition">
                  <c.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </Link>
          ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-2">اختصارات</h2>
        <p className="text-slate-600 text-sm mb-6">
          إدارة المنتجات والبكجات ومتابعة الطلبات من مكان واحد
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/dashboard/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-sm hover:bg-slate-50 transition"
          >
            إضافة أو تعديل منتجات
          </Link>
          <Link
            to="/dashboard/packages"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-sm hover:bg-slate-50 transition"
          >
            إدارة البكجات
          </Link>
          <Link
            to="/dashboard/orders"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-sm hover:bg-slate-50 transition"
          >
            عرض الطلبات
          </Link>
        </div>
      </div>
    </div>
  );
}
