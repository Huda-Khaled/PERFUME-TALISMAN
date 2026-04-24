import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiPackage, FiShoppingBag, FiLogOut, FiGrid } from "react-icons/fi";
import { GiPerfumeBottle } from "react-icons/gi";
import { authApi } from "../../api";
import useNotificationStore from "../../store/NotificationStore";

const links = [
  { to: "/dashboard/products", label: "المنتجات", icon: FiGrid },
  { to: "/dashboard/packages", label: "الباقات", icon: FiPackage },
  { to: "/dashboard/orders", label: "الطلبات", icon: FiShoppingBag },
];

export default function DashLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    authApi
      .checkAuth()
      .then((r) => {
        if (!r.data.authenticated) navigate("/dashboard");
      })
      .catch(() => navigate("/dashboard"));
  }, []);

  const handleLogout = async () => {
    await authApi.logout();
    useNotificationStore.getState().addToast({
      type: "success",
      message: "تم تسجيل الخروج",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-dark flex">
      <aside className="w-64 bg-surface border-r border-white/5 flex flex-col">
        <div className="p-6 border-b border-white/5">
          <Link to="/" className="flex items-center gap-2">
            <GiPerfumeBottle className="text-primary text-2xl" />
            <span className="font-serif gold-text font-semibold">
              Luxe Scents
            </span>
          </Link>
          <p className="text-white/20 text-xs mt-1">لوحة التحكم</p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const active = location.pathname === link.to;
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                      active
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-white/40 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="text-base" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all w-full"
          >
            <FiLogOut /> تسجيل الخروج
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
