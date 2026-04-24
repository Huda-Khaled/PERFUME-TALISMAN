import { Link, NavLink, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  FiLayout,
  FiPackage,
  FiLayers,
  FiShoppingBag,
  FiLogOut,
  FiMenu,
  FiX,
  FiExternalLink,
} from "react-icons/fi";
import { adminAuthApi } from "../../api/adminApi";
import useNotificationStore from "../../store/NotificationStore";

const nav = [
  { to: "/dashboard", end: true, label: "نظرة عامة", icon: FiLayout },
  { to: "/dashboard/products", label: "المنتجات", icon: FiPackage },
  { to: "/dashboard/packages", label: "البكجات", icon: FiLayers },
  { to: "/dashboard/orders", label: "الطلبات", icon: FiShoppingBag },
];

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = useMutation({
    mutationFn: () => adminAuthApi.logout(),
    onSuccess: () => {
      queryClient.setQueryData(["adminAuth"], false);
      useNotificationStore.getState().addToast({
        type: "success",
        message: "تم تسجيل الخروج",
      });
      navigate("/dashboard/login");
    },
    onError: () =>
      useNotificationStore.getState().addToast({
        type: "error",
        message: "فشل تسجيل الخروج",
      }),
  });

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
      isActive
        ? "bg-brand/10 text-brand border border-brand/25"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex">
      <aside className="hidden lg:flex w-64 flex-col border-l border-slate-200 bg-white shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <p className="text-xs uppercase tracking-widest text-brand font-semibold">
            لوحة التحكم
          </p>
          <h1 className="text-lg font-bold text-slate-900 mt-1">متجر العطور</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {nav.map(({ to, end, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={end} className={linkClass} onClick={() => setMobileOpen(false)}>
              <Icon className="w-5 h-5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-200 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-slate-600 hover:text-brand hover:bg-slate-50 transition"
          >
            <FiExternalLink className="w-4 h-4" />
            الموقع
          </Link>
          <button
            type="button"
            onClick={() => logout.mutate()}
            disabled={logout.isPending}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 transition"
          >
            <FiLogOut className="w-4 h-4" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
        <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between gap-4 px-4 py-3 bg-white border-b border-slate-200 shadow-sm">
          <button
            type="button"
            aria-label="القائمة"
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg text-slate-800 hover:bg-slate-100"
          >
            <FiMenu className="w-6 h-6" />
          </button>
          <span className="font-bold text-slate-900">لوحة التحكم</span>
          <span className="w-10" />
        </header>

        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <button
              type="button"
              className="absolute inset-0 bg-slate-900/40"
              aria-label="إغلاق"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative ml-auto w-[min(85vw,280px)] h-full bg-white border-l border-slate-200 shadow-xl flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <span className="font-bold text-slate-900">القائمة</span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {nav.map(({ to, end, label, icon: Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    className={linkClass}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {label}
                  </NavLink>
                ))}
              </nav>
              <div className="p-4 border-t border-slate-200 space-y-2">
                <Link
                  to="/"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-slate-600"
                  onClick={() => setMobileOpen(false)}
                >
                  <FiExternalLink className="w-4 h-4" />
                  الموقع
                </Link>
                <button
                  type="button"
                  onClick={() => logout.mutate()}
                  className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-red-600"
                >
                  <FiLogOut className="w-4 h-4" />
                  تسجيل الخروج
                </button>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 p-4 md:p-8 overflow-x-auto">{children}</main>
      </div>
    </div>
  );
}
