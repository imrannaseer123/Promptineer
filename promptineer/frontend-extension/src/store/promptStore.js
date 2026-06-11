/**
 * Prompts Zustand Store
 * 
 * Manages prompt data and operations including:
 * - List of user prompts
 * - Prompt filtering and search
 * - CRUD operations on prompts
 * - Selected prompt state
 * 
 * Path: src/store/promptStore.js
 */

import { create } from 'zustand';
import { apiService } from '@services/api';

/**
 * Prompt Store
 * 
 * State:
 * - prompts: Array of user prompts
 * - selectedPrompt: Currently selected prompt or null
 * - isLoading: Loading state during operations
 * - error: Error message if operation fails
 * - filters: Current filter criteria (category, tags, search)
 * - pagination: Pagination state (page, limit, total)
 * 
 * Actions:
 * - fetchPrompts: Get prompts from API
 * - selectPrompt: Set selected prompt
 * - createPrompt: Create new prompt
 * - updatePrompt: Update existing prompt
 * - deletePrompt: Delete prompt
 * - executePrompt: Execute a prompt
 * - setFilter: Update filter criteria
 * - setPagination: Update pagination
 * - clearError: Clear error state
 */
export const usePromptStore = create((set, get) => ({
  // State
  prompts: [],
  selectedPrompt: null,
  isLoading: false,
  error: null,
  filters: {
    category: null,
    tags: [],
    search: '',
  },
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  },

  /**
   * Fetch prompts from API with current filters and pagination
   */
  fetchPrompts: async () => {
    set({ isLoading: true, error: null });
    try {
      const { filters, pagination } = get();

      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...(filters.search && { search: filters.search }),
        ...(filters.category && { category_id: filters.category }),
        ...(filters.tags.length > 0 && { tags: filters.tags.join(',') }),
      };

      const response = await apiService.get('/prompts', { params });
      const { data, pagination: newPagination } = response.data;

      set({
        prompts: data,
        pagination: newPagination,
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.error?.message || 'Failed to fetch prompts.';
      set({
        error: errorMessage,
        isLoading: false,
      });
      return { success: false, error: errorMessage };
    }
  },

  /**
   * Select a prompt
   * @param {object} prompt - Prompt to select
   */
  selectPrompt: (prompt) => {
    set({ selectedPrompt: prompt });
  },

  /**
   * Deselect current prompt
   */
  deselectPrompt: () => {
    set({ selectedPrompt: null });
  },

  /**
   * Create new prompt
   * @param {object} promptData - Prompt data
   */
  createPrompt: async (promptData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.post('/prompts', { data: promptData });
      const newPrompt = response.data.data;

      // Add to prompts list
      set((state) => ({
        prompts: [newPrompt, ...state.prompts],
        selectedPrompt: newPrompt,
        isLoading: false,
      }));

      return { success: true, prompt: newPrompt };
    } catch (error) {
      const errorMessage =
        error.response?.data?.error?.message || 'Failed to create prompt.';
      set({
        error: errorMessage,
        isLoading: false,
      });
      return { success: false, error: errorMessage };
    }
  },

  /**
   * Update existing prompt
   * @param {string} promptId - Prompt ID
   * @param {object} promptData - Updated prompt data
   */
  updatePrompt: async (promptId, promptData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.put(`/prompts/${promptId}`, { data: promptData });
      const updatedPrompt = response.data.data;

      // Update in prompts list
      set((state) => ({
        prompts: state.prompts.map((p) => (p._id === promptId ? updatedPrompt : p)),
        selectedPrompt: state.selectedPrompt?._id === promptId ? updatedPrompt : state.selectedPrompt,
        isLoading: false,
      }));

      return { success: true, prompt: updatedPrompt };
    } catch (error) {
      const errorMessage =
        error.response?.data?.error?.message || 'Failed to update prompt.';
      set({
        error: errorMessage,
        isLoading: false,
      });
      return { success: false, error: errorMessage };
    }
  },

  /**
   * Delete prompt
   * @param {string} promptId - Prompt ID to delete
   */
  deletePrompt: async (promptId) => {
    set({ isLoading: true, error: null });
    try {
      await apiService.delete(`/prompts/${promptId}`);

      // Remove from prompts list
      set((state) => ({
        prompts: state.prompts.filter((p) => p._id !== promptId),
        selectedPrompt: state.selectedPrompt?._id === promptId ? null : state.selectedPrompt,
        isLoading: false,
      }));

      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.error?.message || 'Failed to delete prompt.';
      set({
        error: errorMessage,
        isLoading: false,
      });
      return { success: false, error: errorMessage };
    }
  },

  /**
   * Execute a prompt with variables
   * @param {string} promptId - Prompt ID
   * @param {object} variables - Input variables for execution
   */
  executePrompt: async (promptId, variables) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.post(`/prompts/${promptId}/execute`, {
        data: { variables },
      });

      const { output, executionTime } = response.data.data;

      // Update execution metadata in selected prompt
      set((state) => ({
        selectedPrompt: state.selectedPrompt
          ? {
              ...state.selectedPrompt,
              last_executed: new Date().toISOString(),
              execution_count: (state.selectedPrompt.execution_count || 0) + 1,
            }
          : state.selectedPrompt,
        isLoading: false,
      }));

      return { success: true, output, executionTime };
    } catch (error) {
      const errorMessage =
        error.response?.data?.error?.message || 'Failed to execute prompt.';
      set({
        error: errorMessage,
        isLoading: false,
      });
      return { success: false, error: errorMessage };
    }
  },

  /**
   * Set filter criteria
   * @param {object} filters - Filter object
   */
  setFilter: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
      pagination: { ...state.pagination, page: 1 }, // Reset to page 1
    }));
  },

  /**
   * Set pagination
   * @param {object} pagination - Pagination object
   */
  setPagination: (pagination) => {
    set((state) => ({
      pagination: { ...state.pagination, ...pagination },
    }));
  },

  /**
   * Clear error state
   */
  clearError: () => set({ error: null }),
}));
