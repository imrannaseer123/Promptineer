/**
 * Categories Zustand Store
 * 
 * Manages category data and operations including:
 * - List of user categories
 * - CRUD operations on categories
 * - Category state
 * 
 * Path: src/store/categoryStore.js
 */

import { create } from 'zustand';
import { apiService } from '@services/api';

/**
 * Category Store
 * 
 * State:
 * - categories: Array of user categories
 * - isLoading: Loading state during operations
 * - error: Error message if operation fails
 * 
 * Actions:
 * - fetchCategories: Get categories from API
 * - createCategory: Create new category
 * - updateCategory: Update existing category
 * - deleteCategory: Delete category
 * - clearError: Clear error state
 */
export const useCategoryStore = create((set, get) => ({
  // State
  categories: [],
  isLoading: false,
  error: null,

  /**
   * Fetch all categories for current user
   */
  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.get('/categories');
      const categories = response.data.data;

      set({
        categories,
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.error?.message || 'Failed to fetch categories.';
      set({
        error: errorMessage,
        isLoading: false,
      });
      return { success: false, error: errorMessage };
    }
  },

  /**
   * Create new category
   * @param {object} categoryData - Category data (name, description, color, icon)
   */
  createCategory: async (categoryData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.post('/categories', { data: categoryData });
      const newCategory = response.data.data;

      // Add to categories list
      set((state) => ({
        categories: [...state.categories, newCategory],
        isLoading: false,
      }));

      return { success: true, category: newCategory };
    } catch (error) {
      const errorMessage =
        error.response?.data?.error?.message || 'Failed to create category.';
      set({
        error: errorMessage,
        isLoading: false,
      });
      return { success: false, error: errorMessage };
    }
  },

  /**
   * Update existing category
   * @param {string} categoryId - Category ID
   * @param {object} categoryData - Updated category data
   */
  updateCategory: async (categoryId, categoryData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.put(`/categories/${categoryId}`, {
        data: categoryData,
      });
      const updatedCategory = response.data.data;

      // Update in categories list
      set((state) => ({
        categories: state.categories.map((c) =>
          c._id === categoryId ? updatedCategory : c
        ),
        isLoading: false,
      }));

      return { success: true, category: updatedCategory };
    } catch (error) {
      const errorMessage =
        error.response?.data?.error?.message || 'Failed to update category.';
      set({
        error: errorMessage,
        isLoading: false,
      });
      return { success: false, error: errorMessage };
    }
  },

  /**
   * Delete category
   * @param {string} categoryId - Category ID to delete
   */
  deleteCategory: async (categoryId) => {
    set({ isLoading: true, error: null });
    try {
      await apiService.delete(`/categories/${categoryId}`);

      // Remove from categories list
      set((state) => ({
        categories: state.categories.filter((c) => c._id !== categoryId),
        isLoading: false,
      }));

      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.error?.message || 'Failed to delete category.';
      set({
        error: errorMessage,
        isLoading: false,
      });
      return { success: false, error: errorMessage };
    }
  },

  /**
   * Clear error state
   */
  clearError: () => set({ error: null }),
}));
