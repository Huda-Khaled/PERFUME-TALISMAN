import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { productsApi } from "../../api";
import DashLayout from "./DashLayout";
import useNotificationStore from "../../store/NotificationStore";

const BASE_URL = "/backend/";
const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "رجالي",
  in_stock: 1,
};

export default function DashProducts() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState(null);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => productsApi.getAll().then((r) => r.data),
  });

  const createMutation = useMutation({
    mutationFn: (data) => productsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      useNotificationStore.getState().addToast({
        type: "success",
        message: "تم إضافة المنتج ✅",
      });
      resetForm();
    },
    onError: () =>
      useNotificationStore.getState().addToast({
        type: "error",
        message: "حدث خطأ",
      }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => productsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      useNotificationStore.getState().addToast({
        type: "success",
        message: "تم التحديث ✅",
      });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => productsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      useNotificationStore.getState().addToast({
        type: "success",
        message: "تم الحذف",
      });
    },
  });

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(null);
    setImage(null);
    setShowForm(false);
  };

  const openEdit = (product) => {
    setEditing(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      in_stock: product.in_stock,
    });
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!form.name || !form.price) {
      useNotificationStore.getState().addToast({
        type: "error",
        message: "الاسم والسعر مطلوبان",
      });
      return;
    }
    if (editing) {
      updateMutation.mutate({ id: editing.id, data: form });
    } else {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (image) fd.append("image", image);
      createMutation.mutate(fd);
    }
  };

  return (
    <DashLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif">المنتجات</h1>
          <p className="text-white/30 text-sm mt-1">
            {products?.length || 0} منتج
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <FiPlus /> إضافة منتج
        </button>
      </div>

      <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-right px-6 py-4 text-white/40 text-sm font-normal">
                المنتج
              </th>
              <th className="text-right px-6 py-4 text-white/40 text-sm font-normal">
                السعر
              </th>
              <th className="text-right px-6 py-4 text-white/40 text-sm font-normal">
                الفئة
              </th>
              <th className="text-right px-6 py-4 text-white/40 text-sm font-normal">
                الحالة
              </th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-white/20">
                  جاري التحميل...
                </td>
              </tr>
            ) : (
              products?.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-white/5 hover:bg-white/2 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface2 overflow-hidden flex-shrink-0">
                        {product.image ? (
                          <img
                            src={BASE_URL + product.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-lg">
                            🧴
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-white/30 text-xs line-clamp-1">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-primary font-medium">
                    {product.price} ج.م
                  </td>
                  <td className="px-6 py-4 text-white/50 text-sm">
                    {product.category}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        product.in_stock
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {product.in_stock ? "متوفر" : "نفذ"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => openEdit(product)}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-all"
                      >
                        <FiEdit2 className="text-xs" />
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(product.id)}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-400 flex items-center justify-center transition-all"
                      >
                        <FiTrash2 className="text-xs" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={(e) => e.target === e.currentTarget && resetForm()}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-surface rounded-3xl p-8 w-full max-w-lg border border-white/10"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif">
                  {editing ? "تعديل منتج" : "إضافة منتج"}
                </h2>
                <button onClick={resetForm}>
                  <FiX className="text-white/40 hover:text-white" />
                </button>
              </div>

              <div className="space-y-4">
                <input
                  placeholder="اسم المنتج *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50"
                />
                <textarea
                  placeholder="الوصف"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 resize-none"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="السعر *"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50"
                  />
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50"
                  >
                    <option value="رجالي">رجالي</option>
                    <option value="نسائي">نسائي</option>
                    <option value="يونيسكس">يونيسكس</option>
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="in_stock"
                    checked={form.in_stock}
                    onChange={(e) =>
                      setForm({ ...form, in_stock: e.target.checked ? 1 : 0 })
                    }
                    className="accent-primary"
                  />
                  <label htmlFor="in_stock" className="text-sm text-white/60">
                    متوفر في المخزون
                  </label>
                </div>
                {!editing && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full text-sm text-white/40 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary/10 file:text-primary"
                  />
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSubmit}
                  className="btn-primary flex-1 justify-center flex"
                >
                  {editing ? "حفظ التعديلات" : "إضافة المنتج"}
                </button>
                <button onClick={resetForm} className="btn-outline px-6">
                  إلغاء
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashLayout>
  );
}
