/**
 * Authentication Zustand Store
 * 
 * Manages authentication state including:
 * - User authentication status
 * - JWT token management
 * - User profile information
 * - Login/logout operations
 * 
 * Path: src/store/authStore.js
 */

import { create } from 'zustand';
import { authService } from '@services/auth';

/**
 * Auth Store
 * 
 * State:
 * - user: Current user object or null
 * - token: JWT token or null
 * - isAuthenticated: Boolean flag
 * - isLoading: Loading state during auth operations
 * - error: Error message if auth fails
 * 
 * Actions:
 * - login: Authenticate with email/password
 * - register: Create new account
 * - logout: Clear auth state
 * - checkAuth: Verify existing token validity
 * - setError: Set error message
 * - clearError: Clear error state
 */
export const useAuthStore = create((set, get) => ({
  // State
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  /**
   * Login with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   */
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login(email, password);
      const { user, token } = response.data;

      // Store token in Chrome Storage
      await authService.saveToken(token);

      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.error?.message || 'Login failed. Please try again.';
      set({
        error: errorMessage,
        isLoading: false,
        isAuthenticated: false,
      });
      return { success: false, error: errorMessage };
    }
  },

  /**
   * Register new account
   * @param {object} userData - User data (email, password, name, etc.)
   */
  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.register(userData);
      const { user, token } = response.data;

      // Store token in Chrome Storage
      await authService.saveToken(token);

      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.error?.message || 'Registration failed. Please try again.';
      set({
        error: errorMessage,
        isLoading: false,
        isAuthenticated: false,
      });
      return { success: false, error: errorMessage };
    }
  },

  /**
   * Logout current user
   */
  logout: async () => {
    set({ isLoading: true });
    try {
      // Clear token from Chrome Storage
      await authService.clearToken();

      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });

      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      // Clear state anyway even if API fails
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
      return { success: true };
    }
  },

  /**
   * Check if user has valid authentication token
   * Called on app initialization
   */
  checkAuth: async () => {
    set({ isLoading: true });
    try {
      // Retrieve token from Chrome Storage
      const token = await authService.getToken();

      if (!token) {
        set({
          isAuthenticated: false,
          isLoading: false,
          user: null,
          token: null,
        });
        return;
      }

      // Verify token is valid
      const response = await authService.verifyToken(token);
      const user = response.data.user;

      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      // Token invalid or expired
      await authService.clearToken();
      set({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        token: null,
      });
    }
  },

  /**
   * Update user profile
   * @param {object} userData - Updated user data
   */
  updateProfile: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.updateProfile(userData);
      const updatedUser = response.data.user;

      set({
        user: updatedUser,
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.error?.message || 'Profile update failed.';
      set({
        error: errorMessage,
        isLoading: false,
      });
      return { success: false, error: errorMessage };
    }
  },

  /**
   * Set error message
   * @param {string} error - Error message
   */
  setError: (error) => set({ error }),

  /**
   * Clear error state
   */
  clearError: () => set({ error: null }),
}));
