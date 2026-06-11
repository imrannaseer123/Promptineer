/**
 * UI State Zustand Store
 * 
 * Manages UI state including:
 * - Modal visibility
 * - Notifications/Toasts
 * - Sidebar state
 * - Theme preferences
 * 
 * Path: src/store/uiStore.js
 */

import { create } from 'zustand';

/**
 * UI Store
 * 
 * State:
 * - sidebarOpen: Sidebar visibility (mainly for mobile)
 * - modalOpen: Currently open modal or null
 * - notifications: Array of toast notifications
 * - theme: Current theme (light/dark)
 * 
 * Actions:
 * - toggleSidebar: Toggle sidebar visibility
 * - openModal: Open a modal
 * - closeModal: Close modal
 * - addNotification: Add toast notification
 * - removeNotification: Remove notification
 * - clearNotifications: Clear all notifications
 * - setTheme: Set color theme
 * - toggleTheme: Toggle between light/dark theme
 */
export const useUiStore = create((set, get) => ({
  // State
  sidebarOpen: true,
  modalOpen: null,
  notifications: [],
  theme: 'dark',

  /**
   * Toggle sidebar visibility
   */
  toggleSidebar: () => {
    set((state) => ({
      sidebarOpen: !state.sidebarOpen,
    }));
  },

  /**
   * Open a modal
   * @param {string} modalName - Name/ID of modal to open
   * @param {object} data - Optional data to pass to modal
   */
  openModal: (modalName, data = null) => {
    set({
      modalOpen: {
        name: modalName,
        data,
      },
    });
  },

  /**
   * Close current modal
   */
  closeModal: () => {
    set({
      modalOpen: null,
    });
  },

  /**
   * Add toast notification
   * @param {object} notification - Notification object
   * @param {string} notification.type - Type (success, error, warning, info)
   * @param {string} notification.title - Title
   * @param {string} notification.message - Message
   * @param {number} notification.duration - Duration in ms (default 5000)
   */
  addNotification: (notification) => {
    const id = Date.now();
    const defaultDuration = 5000;

    const newNotification = {
      id,
      ...notification,
      duration: notification.duration || defaultDuration,
    };

    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // Auto-remove notification after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        get().removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  },

  /**
   * Remove notification by ID
   * @param {number} id - Notification ID
   */
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  /**
   * Clear all notifications
   */
  clearNotifications: () => {
    set({
      notifications: [],
    });
  },

  /**
   * Set theme
   * @param {string} theme - Theme name (light/dark)
   */
  setTheme: (theme) => {
    set({ theme });

    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Store in Chrome Storage
    chrome.storage.local.set({ theme });
  },

  /**
   * Toggle between light and dark theme
   */
  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark';
      get().setTheme(newTheme);
      return { theme: newTheme };
    });
  },

  /**
   * Load theme from Chrome Storage on app start
   */
  loadTheme: async () => {
    try {
      const { theme = 'dark' } = await chrome.storage.local.get('theme');
      get().setTheme(theme);
    } catch (error) {
      console.error('Failed to load theme:', error);
      get().setTheme('dark');
    }
  },
}));
