import api from "./api";

// Create a separate API instance for admin with different token handling
const adminApi = {
  get: (url, config = {}) => {
    const token = localStorage.getItem("adminToken");
    return api.get(url, {
      ...config,
      headers: {
        ...config.headers,
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
  },

  post: (url, data, config = {}) => {
    const token = localStorage.getItem("adminToken");
    return api.post(url, data, {
      ...config,
      headers: {
        ...config.headers,
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
  },

  put: (url, data, config = {}) => {
    const token = localStorage.getItem("adminToken");
    return api.put(url, data, {
      ...config,
      headers: {
        ...config.headers,
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
  },
};

export const adminService = {
  // Admin login
  login: async (credentials) => {
    try {
      const response = await api.post("/admin/login", credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
  },

  // Get all orders
  getAllOrders: async (params = {}) => {
    try {
      const response = await adminApi.get("/admin/orders", { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch orders" };
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await adminApi.put(`/admin/orders/${orderId}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Failed to update order status" }
      );
    }
  },

  // Get dashboard stats
  getDashboardStats: async () => {
    try {
      const response = await adminApi.get("/admin/stats");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch stats" };
    }
  },
};
