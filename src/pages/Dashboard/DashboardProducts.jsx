import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiX } from "react-icons/fi";
import { adminProductsApi } from "../../api/adminApi";
import Pageloader from "../../components/Pageloader/Pageloader";
import useNotificationStore from "../../store/NotificationStore";

const IMG = (path) => (path ? `/backend/${path}` : "");

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  in_stock: "1",
};

export default function DashboardProducts() {
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(null); // 'add' | 'edit' | 'preview' | null
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [previewProduct, setPreviewProduct] = useState(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["adminProducts"],
    queryFn: () => adminProductsApi.getAll().then((r) => r.data),
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
    queryClient.invalidateQueries({ queryKey: ["adminStats"] });
  };

  const createMut = useMutation({
    mutationFn: (fd) => adminProductsApi.create(fd),
    onSuccess: () => {
      useNotificationStore.getState().addToast({
        type: "success",
        message: "تم إضافة المنتج",
      });
      invalidate();
      closeModal();
    },
    onError: (e) =>
      useNotificationStore.getState().addToast({
        type: "error",
        message: e?.response?.data?.error || "فشل الإضافة",
      }),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, fd, hasFile }) =>
      hasFile
        ? adminProductsApi.updateWithFile(id, fd)
        : adminProductsApi.updateJson(id, {
            name: form.name,
            description: form.description,
            price: parseFloat(form.price),
            category: form.category,
            in_stock: parseInt(form.in_stock, 10),
          }),
    onSuccess: () => {
      useNotificationStore.getState().addToast({
        type: "success",
        message: "تم تحديث المنتج",
      });
      invalidate();
      closeModal();
    },
    onError: (e) =>
      useNotificationStore.getState().addToast({
        type: "error",
        message: e?.response?.data?.error || "فشل التحديث",
      }),
  });

  const deleteMut = useMutation({
    mutationFn: (id) => adminProductsApi.delete(id),
    onSuccess: () => {
      useNotificationStore.getState().addToast({
        type: "success",
        message: "تم حذف المنتج",
      });
      invalidate();
    },
    onError: () =>
      useNotificationStore.getState().addToast({
        type: "error",
        message: "فشل الحذف",
      }),
  });

  const closeModal = () => {
    setModal(null);
    setEditingId(null);
    setForm(emptyForm);
    setFile(null);
    setPreviewProduct(null);
  };

  const openAdd = () => {
    setForm(emptyForm);
    setFile(null);
    setModal("add");
  };

  const openEdit = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name || "",
      description: p.description || "",
      price: String(p.price ?? ""),
      category: p.category || "",
      in_stock: String(p.in_stock ?? 1),
    });
    setFile(null);
    setModal("edit");
  };



  const buildFormData = () => {
    const fd = new FormData();
    fd.append("name", form.name.trim());
    fd.append("description", form.description.trim());
    fd.append("price", form.price);
    fd.append("category", form.category.trim());
    fd.append("in_stock", form.in_stock);
    if (file) fd.append("image", file);
    return fd;
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    if (!file) {
      useNotificationStore.getState().addToast({
        type: "error",
        message: "الصورة مطلوبة",
      });
      return;
    }
    createMut.mutate(buildFormData());
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const hasFile = Boolean(file);
    const fd = buildFormData();
    updateMut.mutate({ id: editingId, fd, hasFile });
  };

  const confirmDelete = (p) => {
    if (!window.confirm(`حذف «${p.name}» نهائياً؟`)) return;
    deleteMut.mutate(p.id);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">المنتجات</h1>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand text-white font-bold px-5 py-3 hover:bg-primary/90 transition shadow-sm"
        >
          <FiPlus className="w-5 h-5" />
          منتج جديد
        </button>
      </div>

      <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {isLoading && <Pageloader variant="inline" />}
        {isLoading ? (
          <div className="min-h-[280px]" aria-hidden />
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-slate-500">لا توجد منتجات</div>
        ) : (
          <div className="p-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((p) => (
                <article
                  key={p.id}
                  className="flex flex-col rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow text-right"
                >
                  <div className="aspect-square bg-slate-100 border-b border-slate-100">
                    <img
                      src={IMG(p.image)}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 flex flex-col flex-1 gap-2 min-h-0">
                    <h3 className="text-sm font-medium text-slate-900 line-clamp-2">
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {p.description?.trim() ? p.description : "—"}
                    </p>
                    <p className="text-brand font-semibold tabular-nums text-sm">
                      {p.price}
                    </p>
                    <span
                      className={`inline-flex self-start px-2 py-1 rounded-lg text-xs font-medium ${
                        p.in_stock
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {p.in_stock ? "متوفر" : "غير متوفر"}
                    </span>
                    <div className="flex items-center gap-1 flex-wrap justify-end mt-auto pt-1">
                      <button
                        type="button"
                        onClick={() => openEdit(p)}
                        className="p-2 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10"
                        title="تعديل"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => confirmDelete(p)}
                        className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50"
                        title="حذف"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal: add / edit */}
      {(modal === "add" || modal === "edit") && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <h2 className="text-lg font-bold text-slate-900">
                {modal === "add" ? "منتج جديد" : "تعديل المنتج"}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={modal === "add" ? handleSubmitAdd : handleSubmitEdit}
              className="p-4 space-y-4"
            >
              <div>
                <label className="block text-sm text-slate-700 mb-1">
                  الاسم
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm text-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-1">
                  الوصف
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm text-slate-900 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-700 mb-1">
                    السعر
                  </label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.price}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, price: e.target.value }))
                    }
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-1">
                    التوفر
                  </label>
                  <select
                    value={form.in_stock}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, in_stock: e.target.value }))
                    }
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm text-slate-900"
                  >
                    <option value="1">متوفر</option>
                    <option value="0">غير متوفر</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-1">
                  الصورة {modal === "edit" && "(اختياري — لتحديث الصورة)"}
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full text-sm text-slate-600 file:mr-2 file:rounded-lg file:border-0 file:bg-primary/20 file:px-3 file:py-1.5 file:text-slate-900"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={createMut.isPending || updateMut.isPending}
                  className="flex-1 rounded-xl bg-primary text-slate-900 font-bold py-3 disabled:opacity-50"
                >
                  {modal === "add" ? "إضافة" : "حفظ"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview */}
      {modal === "preview" && previewProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">
                معاينة المنتج
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-[4/5] bg-slate-100">
              <img
                src={IMG(previewProduct.image)}
                alt={previewProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-bold text-slate-900">
                {previewProduct.name}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {previewProduct.description || "—"}
              </p>
              <p className="text-brand font-bold text-lg">
                {previewProduct.price} د.ك
              </p>
              <p className="text-xs text-slate-500">
                المخزون: {previewProduct.in_stock ? "متوفر" : "غير متوفر"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
