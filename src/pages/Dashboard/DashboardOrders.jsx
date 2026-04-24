import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FiChevronDown, FiChevronUp, FiTrash2 } from "react-icons/fi";
import { adminOrdersApi } from "../../api/adminApi";
import Pageloader from "../../components/Pageloader/Pageloader";
import useNotificationStore from "../../store/NotificationStore";

const IMG = (path) => (path ? `/backend/${path}` : "");

const statusLabels = {
  pending: "قيد الانتظار",
  confirmed: "مؤكد",
  delivered: "تم التسليم",
  cancelled: "ملغي",
};

const statusColors = {
  pending: "bg-amber-100 text-amber-900 border-amber-200",
  confirmed: "bg-sky-100 text-sky-900 border-sky-200",
  delivered: "bg-emerald-100 text-emerald-900 border-emerald-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("ar-KW", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export default function DashboardOrders() {
  const queryClient = useQueryClient();
  const [expanded, setExpanded] = useState({});

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: () => adminOrdersApi.getAll().then((r) => r.data),
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["adminOrders"] });
    queryClient.invalidateQueries({ queryKey: ["adminStats"] });
  };

  const updateStatus = useMutation({
    mutationFn: ({ id, status }) => adminOrdersApi.updateStatus(id, status),
    onSuccess: () => {
      useNotificationStore.getState().addToast({
        type: "success",
        message: "تم تحديث الحالة",
      });
      invalidate();
    },
    onError: () =>
      useNotificationStore.getState().addToast({
        type: "error",
        message: "فشل التحديث",
      }),
  });

  const deleteOrder = useMutation({
    mutationFn: (id) => adminOrdersApi.delete(id),
    onSuccess: () => {
      useNotificationStore.getState().addToast({
        type: "success",
        message: "تم حذف الطلب",
      });
      invalidate();
    },
    onError: () =>
      useNotificationStore.getState().addToast({
        type: "error",
        message: "فشل الحذف",
      }),
  });

  const toggle = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const confirmDelete = (o) => {
    if (!window.confirm(`حذف الطلب #${o.id} نهائياً؟`)) return;
    deleteOrder.mutate(o.id);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">الطلبات</h1>
      </div>

      <div className="relative min-h-[220px]">
        {isLoading && <Pageloader variant="inline" />}
        {isLoading ? (
          <div className="min-h-[200px]" aria-hidden />
        ) : orders.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm">
            لا توجد طلبات
          </div>
        ) : (
        <div className="space-y-3">
          {orders.map((o) => {
            const open = expanded[o.id];
            const total = Number(o.total_amount ?? 0);
            const st = o.status || "pending";

            return (
              <div
                key={o.id}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm"
              >
                <div className="p-4 md:p-5">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-slate-900 font-bold">
                          #{o.id}
                        </span>
                        <span
                          className={`text-xs px-2.5 py-1 rounded-lg border ${statusColors[st] || statusColors.pending}`}
                        >
                          {statusLabels[st] || st}
                        </span>
                        <span className="text-slate-500 text-sm">
                          {formatDate(o.created_at)}
                        </span>
                      </div>
                      <p className="text-slate-900 font-medium truncate">
                        {o.customer_name}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
                        <span>هاتف: {o.phone}</span>
                        <span>
                          {o.region} — {o.street} — {o.house}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                      <div className="text-left sm:text-right">
                        <p className="text-xs text-slate-500">المبلغ</p>
                        <p className="text-xl font-bold text-brand tabular-nums">
                          {total.toLocaleString("ar-KW", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}{" "}
                          د.ك
                        </p>
                      </div>
                      <select
                        value={st}
                        onChange={(e) =>
                          updateStatus.mutate({
                            id: o.id,
                            status: e.target.value,
                          })
                        }
                        className="rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-sm text-slate-900 min-w-[140px]"
                      >
                        {Object.entries(statusLabels).map(([val, lab]) => (
                          <option key={val} value={val}>
                            {lab}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => confirmDelete(o)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 text-red-700 px-4 py-2 text-sm hover:bg-red-50"
                      >
                        <FiTrash2 className="w-4 h-4" />
                        حذف
                      </button>
                      <button
                        type="button"
                        onClick={() => toggle(o.id)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        {open ? (
                          <>
                            إخفاء التفاصيل <FiChevronUp className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            تفاصيل المنتجات{" "}
                            <FiChevronDown className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {open && (
                  <div className="border-t border-slate-200 bg-slate-50 px-4 py-4 md:px-5">
                    <p className="text-xs text-slate-600 mb-3">
                      القطع: {o.pieces_count ?? "—"} — الدفع:{" "}
                      {o.payment_method === "cod"
                        ? "عند الاستلام"
                        : o.payment_method}
                    </p>
                    {o.notes && (
                      <div className="mb-3 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
                        <span className="font-semibold">ملاحظات: </span>
                        {o.notes}
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(o.items || []).map((it) => (
                        <div
                          key={`${it.id}-${it.product_id}`}
                          className="flex gap-3 rounded-xl border border-slate-200 p-3 bg-white"
                        >
                          <img
                            src={IMG(it.product_image)}
                            alt=""
                            className="w-16 h-16 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                          <div className="flex-1 min-w-0 text-sm">
                            <p className="text-slate-900 font-medium truncate flex flex-wrap items-center gap-2">
                              {it.product_name}
                              {it.item_type === "package" && (
                                <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-md bg-violet-100 text-violet-800 border border-violet-200">
                                  بكج
                                </span>
                              )}
                            </p>
                            <p className="text-slate-600 mt-1">
                              {it.quantity} ×{" "}
                              {Number(it.unit_price).toLocaleString("ar-KW", {
                                minimumFractionDigits: 2,
                              })}{" "}
                              د.ك
                            </p>
                            <p className="text-brand font-semibold mt-1">
                              ={" "}
                              {Number(it.line_total).toLocaleString("ar-KW", {
                                minimumFractionDigits: 2,
                              })}{" "}
                              د.ك
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        )}
      </div>
    </div>
  );
}
