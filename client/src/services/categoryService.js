import api from "./api";

export const categoryService = {
  // Get all categories
  getCategories: async () => {
    try {
      const response = await api.get("/categories");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch categories" };
    }
  },

  // Get category by slug
  getCategoryBySlug: async (slug) => {
    try {
      const response = await api.get(`/categories/${slug}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch category" };
    }
  },
};
