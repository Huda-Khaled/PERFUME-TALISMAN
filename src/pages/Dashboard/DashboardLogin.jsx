import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminAuthApi } from "../../api/adminApi";
import Pageloader from "../../components/Pageloader/Pageloader";
import useNotificationStore from "../../store/NotificationStore";

export default function DashboardLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { data: alreadyIn, isLoading: checking } = useQuery({
    queryKey: ["adminAuth"],
    queryFn: async () => {
      const { data } = await adminAuthApi.checkAuth();
      return Boolean(data.authenticated);
    },
    staleTime: 0,
  });

  const login = useMutation({
    mutationFn: (body) => adminAuthApi.login(body),
    onSuccess: () => {
      queryClient.setQueryData(["adminAuth"], true);
      useNotificationStore.getState().addToast({
        type: "success",
        message: "تم تسجيل الدخول",
      });
      navigate("/dashboard", { replace: true });
    },
    onError: () =>
      useNotificationStore.getState().addToast({
        type: "error",
        message: "بيانات الدخول غير صحيحة",
      }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login.mutate({ username: username.trim(), password });
  };

  if (checking) {
    return <Pageloader variant="fullscreen" />;
  }

  if (alreadyIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-slate-100 text-slate-900"
      dir="rtl"
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">تسجيل الدخول</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50 space-y-5"
        >
          <div>
            <label className="block text-sm text-slate-700 mb-2">اسم المستخدم</label>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-2">كلمة المرور</label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
              required
            />
          </div>
          <button
            type="submit"
            disabled={login.isPending}
            className="w-full rounded-xl bg-primary text-white font-bold py-3.5 hover:bg-primary/90 transition disabled:opacity-50"
          >
            {login.isPending ? "جاري الدخول..." : "دخول"}
          </button>
        </form>

        <p className="text-center mt-8">
          <Link to="/" className="text-sm text-slate-600 hover:text-brand transition">
            ← العودة للموقع
          </Link>
        </p>
      </div>
    </div>
  );
}
