import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "../../api";
import DashLayout from "./DashLayout";
import useNotificationStore from "../../store/NotificationStore";

const statuses = ["الكل", "pending", "confirmed", "delivered", "cancelled"];
const statusLabel = {
  pending: "انتظار",
  confirmed: "مؤكد",
  delivered: "تم التوصيل",
  cancelled: "ملغي",
};
const statusColor = {
  pending: "bg-yellow-500/10 text-yellow-400",
  confirmed: "bg-blue-500/10 text-blue-400",
  delivered: "bg-green-500/10 text-green-400",
  cancelled: "bg-red-500/10 text-red-400",
};

export default function DashOrders() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("الكل");

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => ordersApi.getAll().then((r) => r.data),
    refetchInterval: 30000,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => ordersApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      useNotificationStore.getState().addToast({
        type: "success",
        message: "تم تحديث الحالة ✅",
      });
    },
  });

  const filtered =
    filter === "الكل" ? orders : orders?.filter((o) => o.status === filter);

  return (
    <DashLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif">الطلبات</h1>
          <p className="text-white/30 text-sm mt-1">
            {orders?.length || 0} طلب
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              filter === s
                ? "bg-primary text-dark"
                : "border border-white/10 text-white/40 hover:border-primary/30"
            }`}
          >
            {s === "الكل" ? "الكل" : statusLabel[s]}
          </button>
        ))}
      </div>

      <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-right px-6 py-4 text-white/40 text-sm font-normal">
                #
              </th>
              <th className="text-right px-6 py-4 text-white/40 text-sm font-normal">
                العميل
              </th>
              <th className="text-right px-6 py-4 text-white/40 text-sm font-normal">
                المنتج
              </th>
              <th className="text-right px-6 py-4 text-white/40 text-sm font-normal">
                السعر
              </th>
              <th className="text-right px-6 py-4 text-white/40 text-sm font-normal">
                الحالة
              </th>
              <th className="text-right px-6 py-4 text-white/40 text-sm font-normal">
                التاريخ
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-white/20">
                  جاري التحميل...
                </td>
              </tr>
            ) : filtered?.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-white/20">
                  لا توجد طلبات
                </td>
              </tr>
            ) : (
              filtered?.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-white/5 hover:bg-white/2 transition-colors"
                >
                  <td className="px-6 py-4 text-white/30 text-sm">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium">{order.customer_name}</p>
                    <p className="text-white/20 text-xs">
                      {order.session_id?.slice(0, 8)}...
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-white/70">
                    {order.product_name}
                  </td>
                  <td className="px-6 py-4 text-primary text-sm">
                    {order.product_price} ج.م
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateMutation.mutate({
                          id: order.id,
                          status: e.target.value,
                        })
                      }
                      className={`text-xs px-3 py-1 rounded-full border-0 cursor-pointer ${statusColor[order.status]}`}
                    >
                      <option value="pending">انتظار</option>
                      <option value="confirmed">مؤكد</option>
                      <option value="delivered">تم التوصيل</option>
                      <option value="cancelled">ملغي</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-white/30 text-xs">
                    {new Date(order.created_at).toLocaleDateString("ar-EG")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashLayout>
  );
}
