import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiX } from "react-icons/fi";
import { adminPackagesApi } from "../../api/adminApi";
import Pageloader from "../../components/Pageloader/Pageloader";
import useNotificationStore from "../../store/NotificationStore";

const IMG = (path) => (path ? `/backend/${path}` : "");

const emptyForm = {
  name: "",
  description: "",
  price: "",
  in_stock: "1",
};

export default function DashboardPackages() {
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [previewPkg, setPreviewPkg] = useState(null);
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["adminPackages"],
    queryFn: () => adminPackagesApi.getAll().then((r) => r.data),
  });



  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["adminPackages"] });
    queryClient.invalidateQueries({ queryKey: ["adminStats"] });
  };

  const createMut = useMutation({
    mutationFn: (fd) => adminPackagesApi.create(fd),
    onSuccess: () => {
      useNotificationStore.getState().addToast({
        type: "success",
        message: "تم إضافة البكج",
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
    mutationFn: ({ id, fd, hasFile, json }) => {
      if (hasFile) return adminPackagesApi.updateWithFile(id, fd);
      return adminPackagesApi.updateJson(id, json);
    },
    onSuccess: () => {
      useNotificationStore.getState().addToast({
        type: "success",
        message: "تم تحديث البكج",
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
    mutationFn: (id) => adminPackagesApi.delete(id),
    onSuccess: () => {
      useNotificationStore.getState().addToast({
        type: "success",
        message: "تم حذف البكج",
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
    setPreviewPkg(null);
    setSelectedProductIds([]);
  };

  const openAdd = () => {
    setForm(emptyForm);
    setFile(null);
    setSelectedProductIds([]);
    setModal("add");
  };

  const openEdit = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name || "",
      description: p.description || "",
      price: String(p.price ?? ""),
      in_stock: String(p.in_stock ?? 1),
    });
    setFile(null);
    setSelectedProductIds((p.products || []).map((x) => x.id));
    setModal("edit");
  };


  // const toggleProduct = (id) => {
  //   setSelectedProductIds((prev) =>
  //     prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
  //   );
  // };

  const buildFormData = () => {
    const fd = new FormData();
    fd.append("name", form.name.trim());
    fd.append("description", form.description.trim());
    fd.append("price", form.price);
    fd.append("in_stock", form.in_stock);
    fd.append("product_ids", JSON.stringify(selectedProductIds));
    if (file) fd.append("image", file);
    return fd;
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    createMut.mutate(buildFormData());
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const hasFile = Boolean(file);
    const json = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: parseFloat(form.price),
      in_stock: parseInt(form.in_stock, 10),
      product_ids: selectedProductIds,
    };
    if (hasFile) {
      updateMut.mutate({ id: editingId, fd: buildFormData(), hasFile: true });
    } else {
      updateMut.mutate({ id: editingId, hasFile: false, json });
    }
  };

  const confirmDelete = (p) => {
    if (!window.confirm(`حذف البكج «${p.name}» نهائياً؟`)) return;
    deleteMut.mutate(p.id);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">البكجات</h1>
         
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand text-white font-bold px-5 py-3  transition shadow-sm"
        >
          <FiPlus className="w-5 h-5" />
          بكج جديد
        </button>
      </div>

      <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {isLoading && <Pageloader variant="inline" />}
        {isLoading ? (
          <div className="min-h-[280px]" aria-hidden />
        ) : packages.length === 0 ? (
          <div className="p-12 text-center text-slate-500">لا توجد بكجات</div>
        ) : (
          <div className="p-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {packages.map((p) => (
                <article
                  key={p.id}
                  className="flex flex-col rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow text-right"
                >
                  <div className="aspect-square bg-slate-100 border-b border-slate-100 flex items-center justify-center">
                    {p.image ? (
                      <img
                        src={IMG(p.image)}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm text-slate-500">—</span>
                    )}
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

      {(modal === "add" || modal === "edit") && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <h2 className="text-lg font-bold text-slate-900">
                {modal === "add" ? "بكج جديد" : "تعديل البكج"}
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
                <label className="block text-sm text-slate-700 mb-1">الاسم</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm text-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-1">الوصف</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm text-slate-900 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-700 mb-1">السعر</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-1">التوفر</label>
                  <select
                    value={form.in_stock}
                    onChange={(e) => setForm((f) => ({ ...f, in_stock: e.target.value }))}
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm text-slate-900"
                  >
                    <option value="1">متوفر</option>
                    <option value="0">غير متوفر</option>
                  </select>
                </div>
              </div>
              <div>
             
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-1">
                  صورة البكج {modal === "edit" && "(اختياري)"}
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

      {modal === "preview" && previewPkg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">معاينة البكج</h2>
              <button
                type="button"
                onClick={closeModal}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            {previewPkg.image && (
              <div className="aspect-[4/3] bg-slate-100">
                <img
                  src={IMG(previewPkg.image)}
                  alt={previewPkg.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4 space-y-3">
              <h3 className="text-xl font-bold text-slate-900">{previewPkg.name}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {previewPkg.description || "—"}
              </p>
              <p className="text-brand font-bold text-lg">{previewPkg.price} د.ك</p>
              <div>
                <p className="text-xs text-slate-500 mb-2">المنتجات المضمّنة</p>
                <ul className="text-sm text-slate-800 space-y-1">
                  {(previewPkg.products || []).map((x) => (
                    <li key={x.id}>• {x.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
