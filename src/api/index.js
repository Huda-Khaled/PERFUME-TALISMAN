import axios from "axios";

const api = axios.create({
  baseURL: "/backend",
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
});

export const productsApi = {
  getAll: (params) => api.get("/api/products", { params }),
  getOne: (id) => api.get(`/api/products/${id}`),
  create: (data) => api.post("/api/admin/products", data),
  update: (id, data) => api.put(`/api/admin/products/${id}`, data),
  delete: (id) => api.delete(`/api/admin/products/${id}`),
};

export const packagesApi = {
  getAll: () => api.get("/api/packages"),
  getOne: (id) => api.get(`/api/packages/${id}`),
  create: (data) => api.post("/api/admin/packages", data),
  update: (id, data) => api.put(`/api/admin/packages/${id}`, data),
  delete: (id) => api.delete(`/api/admin/packages/${id}`),
};

export const ordersApi = {
  create: (data) => api.post("/api/orders", data),
  getAll: (params) => api.get("/api/admin/orders", { params }),
  updateStatus: (id, status) => api.put(`/api/admin/orders/${id}`, { status }),
};

export const authApi = {
  login: (data) => api.post("/api/login", data),
  logout: () => api.post("/api/logout"),
  checkAuth: () => api.get("/api/check-auth"),
};

export default api;
