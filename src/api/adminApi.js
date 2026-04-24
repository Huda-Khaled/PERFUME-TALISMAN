import axios from "axios";

/** Session cookies for admin (PHP session). */
export const adminApi = axios.create({
  baseURL: "/backend",
  withCredentials: true,
});

export const adminAuthApi = {
  login: (data) => adminApi.post("/api/login", data),
  logout: () => adminApi.post("/api/logout"),
  checkAuth: () => adminApi.get("/api/check-auth"),
};

export const adminStatsApi = {
  get: () => adminApi.get("/api/admin/stats"),
};

export const adminProductsApi = {
  getAll: (params) => adminApi.get("/api/products", { params }),
  getOne: (id) => adminApi.get(`/api/products/${id}`),
  create: (formData) =>
    adminApi.post("/api/admin/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  updateJson: (id, data) => adminApi.put(`/api/admin/products/${id}`, data),
  updateWithFile: (id, formData) =>
    adminApi.post(`/api/admin/products/${id}/update`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => adminApi.delete(`/api/admin/products/${id}`),
};

export const adminOrdersApi = {
  getAll: (params) => adminApi.get("/api/admin/orders", { params }),
  updateStatus: (id, status) => adminApi.put(`/api/admin/orders/${id}`, { status }),
  delete: (id) => adminApi.delete(`/api/admin/orders/${id}`),
};

export const adminPackagesApi = {
  getAll: () => adminApi.get("/api/packages"),
  getOne: (id) => adminApi.get(`/api/packages/${id}`),
  create: (formData) =>
    adminApi.post("/api/admin/packages", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  updateJson: (id, data) => adminApi.put(`/api/admin/packages/${id}`, data),
  updateWithFile: (id, formData) =>
    adminApi.post(`/api/admin/packages/${id}/update`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => adminApi.delete(`/api/admin/packages/${id}`),
};
