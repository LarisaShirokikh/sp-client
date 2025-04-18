
import { Category } from "@/app/interface/topic";
import { API_CONFIG } from "@/lib/apiConfig";

export const ForumApiService = {
  async getCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/forum/categories/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', // Добавляем куки к запросу
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  // Если у вас есть другие методы, добавьте их по аналогии
  async getCategoryById(categoryId: number): Promise<Category> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/forum/categories/${categoryId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', // Добавляем куки к запросу
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching category #${categoryId}:`, error);
      throw error;
    }
  },
};