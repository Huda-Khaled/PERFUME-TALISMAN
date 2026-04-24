import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { packagesApi, productsApi } from "../../api";
import DashLayout from "./DashLayout";
import useNotificationStore from "../../store/NotificationStore";

const BASE_URL = "/backend/";
const emptyForm = {
  name: "",
  description: "",
  price: "",
  in_stock: 1,
  product_ids: [],
};

export default function DashPackages() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState(null);

  const { data: packages, isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: () => packagesApi.getAll().then((r) => r.data),
  });

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () => productsApi.getAll().then((r) => r.data),
  });

  const createMutation = useMutation({
    mutationFn: (data) => packagesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["packages"]);
      useNotificationStore.getState().addToast({
        type: "success",
        message: "تم إضافة الباقة ✅",
      });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => packagesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["packages"]);
      useNotificationStore.getState().addToast({
        type: "success",
        message: "تم التحديث ✅",
      });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => packagesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["packages"]);
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

  const openEdit = (pkg) => {
    setEditing(pkg);
    setForm({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      in_stock: pkg.in_stock,
      product_ids: pkg.products?.map((p) => p.id) || [],
    });
    setShowForm(true);
  };

  const toggleProduct = (id) => {
    setForm((f) => ({
      ...f,
      product_ids: f.product_ids.includes(id)
        ? f.product_ids.filter((i) => i !== id)
        : [...f.product_ids, id],
    }));
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
      updateMutation.mutate({ id: editing.id, data: { ...form } });
    } else {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("description", form.description);
      fd.append("price", form.price);
      fd.append("in_stock", form.in_stock);
      fd.append("product_ids", JSON.stringify(form.product_ids));
      if (image) fd.append("image", image);
      createMutation.mutate(fd);
    }
  };

  return (
    <DashLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif">الباقات</h1>
          <p className="text-white/30 text-sm mt-1">
            {packages?.length || 0} باقة
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <FiPlus /> إضافة باقة
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <p className="text-white/30 col-span-3 text-center py-12">
            جاري التحميل...
          </p>
        ) : (
          packages?.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-surface rounded-2xl border border-white/5 overflow-hidden"
            >
              <div className="aspect-video bg-surface2 relative">
                {pkg.image ? (
                  <img
                    src={BASE_URL + pkg.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl">
                    🎁
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-serif text-lg mb-1">{pkg.name}</h3>
                <p className="text-primary font-semibold mb-2">
                  {pkg.price} ج.م
                </p>
                <p className="text-white/30 text-xs mb-4">
                  {pkg.products?.length || 0} عطور
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(pkg)}
                    className="flex-1 btn-outline text-sm py-2 flex items-center justify-center gap-2"
                  >
                    <FiEdit2 className="text-xs" /> تعديل
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(pkg.id)}
                    className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-all"
                  >
                    <FiTrash2 className="text-xs" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
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
              className="bg-surface rounded-3xl p-8 w-full max-w-lg border border-white/10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif">
                  {editing ? "تعديل باقة" : "إضافة باقة"}
                </h2>
                <button onClick={resetForm}>
                  <FiX className="text-white/40 hover:text-white" />
                </button>
              </div>

              <div className="space-y-4">
                <input
                  placeholder="اسم الباقة *"
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
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 resize-none"
                />
                <input
                  type="number"
                  placeholder="السعر *"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50"
                />
                <div>
                  <p className="text-white/50 text-sm mb-3">
                    اختر المنتجات في الباقة:
                  </p>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {products?.map((p) => (
                      <label
                        key={p.id}
                        className="flex items-center gap-3 cursor-pointer hover:bg-white/5 px-3 py-2 rounded-xl"
                      >
                        <input
                          type="checkbox"
                          checked={form.product_ids.includes(p.id)}
                          onChange={() => toggleProduct(p.id)}
                          className="accent-primary"
                        />
                        <span className="text-sm">{p.name}</span>
                        <span className="text-white/30 text-xs mr-auto">
                          {p.price} ج.م
                        </span>
                      </label>
                    ))}
                  </div>
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
                  {editing ? "حفظ التعديلات" : "إضافة الباقة"}
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
