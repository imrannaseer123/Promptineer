/**
 * Chrome Storage Service
 * 
 * Wrapper around Chrome Storage API for storing/retrieving data.
 * Simplifies Chrome Storage operations and provides Promise-based API.
 * 
 * Path: src/services/storage.js
 */

/**
 * Storage service for Chrome Extension
 * Handles all chrome.storage operations
 */
export const storageService = {
  /**
   * Get value from Chrome Storage (sync)
   * @param {string} key - Storage key
   * @returns {Promise<any>} Value stored at key
   */
  get: async (key) => {
    try {
      const result = await chrome.storage.sync.get(key);
      return result[key] || null;
    } catch (error) {
      console.error(`Error getting ${key} from storage:`, error);
      return null;
    }
  },

  /**
   * Get multiple values from Chrome Storage
   * @param {string[]} keys - Array of keys
   * @returns {Promise<object>} Object with key-value pairs
   */
  getMultiple: async (keys) => {
    try {
      const result = await chrome.storage.sync.get(keys);
      return result || {};
    } catch (error) {
      console.error('Error getting multiple values from storage:', error);
      return {};
    }
  },

  /**
   * Get all values from Chrome Storage
   * @returns {Promise<object>} All stored values
   */
  getAll: async () => {
    try {
      const result = await chrome.storage.sync.get(null);
      return result || {};
    } catch (error) {
      console.error('Error getting all values from storage:', error);
      return {};
    }
  },

  /**
   * Set value in Chrome Storage (sync)
   * @param {string} key - Storage key
   * @param {any} value - Value to store
   * @returns {Promise<void>}
   */
  set: async (key, value) => {
    try {
      await chrome.storage.sync.set({ [key]: value });
    } catch (error) {
      console.error(`Error setting ${key} in storage:`, error);
    }
  },

  /**
   * Set multiple values in Chrome Storage
   * @param {object} items - Object with key-value pairs
   * @returns {Promise<void>}
   */
  setMultiple: async (items) => {
    try {
      await chrome.storage.sync.set(items);
    } catch (error) {
      console.error('Error setting multiple values in storage:', error);
    }
  },

  /**
   * Remove value from Chrome Storage
   * @param {string} key - Storage key
   * @returns {Promise<void>}
   */
  remove: async (key) => {
    try {
      await chrome.storage.sync.remove(key);
    } catch (error) {
      console.error(`Error removing ${key} from storage:`, error);
    }
  },

  /**
   * Remove multiple values from Chrome Storage
   * @param {string[]} keys - Array of keys to remove
   * @returns {Promise<void>}
   */
  removeMultiple: async (keys) => {
    try {
      await chrome.storage.sync.remove(keys);
    } catch (error) {
      console.error('Error removing multiple values from storage:', error);
    }
  },

  /**
   * Clear all Chrome Storage
   * @returns {Promise<void>}
   */
  clear: async () => {
    try {
      await chrome.storage.sync.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },

  /**
   * Local storage (for persistent data not synced)
   */
  local: {
    get: async (key) => {
      try {
        const result = await chrome.storage.local.get(key);
        return result[key] || null;
      } catch (error) {
        console.error(`Error getting ${key} from local storage:`, error);
        return null;
      }
    },

    set: async (key, value) => {
      try {
        await chrome.storage.local.set({ [key]: value });
      } catch (error) {
        console.error(`Error setting ${key} in local storage:`, error);
      }
    },

    remove: async (key) => {
      try {
        await chrome.storage.local.remove(key);
      } catch (error) {
        console.error(`Error removing ${key} from local storage:`, error);
      }
    },

    clear: async () => {
      try {
        await chrome.storage.local.clear();
      } catch (error) {
        console.error('Error clearing local storage:', error);
      }
    },
  },
};
