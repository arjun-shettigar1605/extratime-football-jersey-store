import api from "./api";

export const productService = {
  // Get all products with filtering
  getProducts: async (params = {}) => {
    try {
      const response = await api.get("/products", { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch products" };
    }
  },

  // Get products by category
  getProductsByCategory: async (categorySlug, params = {}) => {
    try {
      const response = await api.get(`/products/category/${categorySlug}`, {
        params,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch products" };
    }
  },

  // Get single product
  getProduct: async (productId) => {
    try {
      const response = await api.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch product" };
    }
  },
};
