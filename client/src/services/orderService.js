import api from "./api";

export const orderService = {
  // Create Razorpay payment order
  createPaymentOrder: async (amount) => {
    try {
      const cleanAmount = Math.round(parseFloat(amount));
      const response = await api.post("/orders/create-payment", { amount: cleanAmount });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Failed to create payment order" }
      );
    }
  },

  // Verify payment and create order
  verifyPaymentAndCreateOrder: async (paymentData) => {
    try {
      const response = await api.post("/orders/verify-payment", paymentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to verify payment" };
    }
  },

  // Get user orders
  getUserOrders: async (params = {}) => {
    try {
      const response = await api.get("/orders/my-orders", { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch orders" };
    }
  },

  // Get single order
  getOrder: async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch order" };
    }
  },
};
