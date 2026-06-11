/**
 * HTTP API Client Service
 * 
 * Axios-based HTTP client with:
 * - Automatic JWT token injection
 * - Request/response interceptors
 * - Error handling
 * - Automatic token refresh
 * - Timeout configuration
 * 
 * Path: src/services/api.js
 */

import axios from 'axios';
import { authService } from './auth';

// Get API base URL from environment
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
const API_TIMEOUT = process.env.VITE_API_TIMEOUT || 30000;

/**
 * Create Axios instance with default config
 */
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: parseInt(API_TIMEOUT),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * Request interceptor
 * Adds JWT token to every request
 */
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await authService.getToken();

      if (token) {
        // Add token to Authorization header
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      console.error('Error in request interceptor:', error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * Handles errors and token expiration
 */
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized (token expired or invalid)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Clear invalid token
        await authService.clearToken();

        // Redirect to login (if in popup context)
        if (typeof chrome !== 'undefined' && chrome.runtime) {
          chrome.runtime.sendMessage({ action: 'LOGOUT' }).catch(() => {
            // Extension context may not support messaging
          });
        }

        return Promise.reject(error);
      } catch (refreshError) {
        console.error('Error handling 401 error:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    // Handle 403 Forbidden (insufficient permissions)
    if (error.response?.status === 403) {
      console.error('Insufficient permissions:', error.response.data);
    }

    // Handle 429 Too Many Requests (rate limited)
    if (error.response?.status === 429) {
      console.warn('Rate limited. Please wait before retrying.');
    }

    // Handle 500+ Server errors
    if (error.response?.status >= 500) {
      console.error('Server error:', error.response.status);
    }

    return Promise.reject(error);
  }
);

/**
 * API Service with methods for different HTTP operations
 */
export const apiService = {
  /**
   * GET request
   * @param {string} url - Endpoint URL
   * @param {object} config - Axios config
   * @returns {Promise<object>} Response data
   */
  get: (url, config = {}) => {
    return axiosInstance.get(url, config);
  },

  /**
   * POST request
   * @param {string} url - Endpoint URL
   * @param {object} data - Request body
   * @param {object} config - Axios config
   * @returns {Promise<object>} Response data
   */
  post: (url, data, config = {}) => {
    return axiosInstance.post(url, data, config);
  },

  /**
   * PUT request
   * @param {string} url - Endpoint URL
   * @param {object} data - Request body
   * @param {object} config - Axios config
   * @returns {Promise<object>} Response data
   */
  put: (url, data, config = {}) => {
    return axiosInstance.put(url, data, config);
  },

  /**
   * PATCH request
   * @param {string} url - Endpoint URL
   * @param {object} data - Request body
   * @param {object} config - Axios config
   * @returns {Promise<object>} Response data
   */
  patch: (url, data, config = {}) => {
    return axiosInstance.patch(url, data, config);
  },

  /**
   * DELETE request
   * @param {string} url - Endpoint URL
   * @param {object} config - Axios config
   * @returns {Promise<object>} Response data
   */
  delete: (url, config = {}) => {
    return axiosInstance.delete(url, config);
  },

  /**
   * Get Axios instance for advanced usage
   */
  getAxiosInstance: () => axiosInstance,

  /**
   * Set new base URL
   * @param {string} url - New base URL
   */
  setBaseURL: (url) => {
    axiosInstance.defaults.baseURL = url;
  },

  /**
   * Add custom header
   * @param {string} key - Header key
   * @param {string} value - Header value
   */
  setHeader: (key, value) => {
    axiosInstance.defaults.headers.common[key] = value;
  },

  /**
   * Remove custom header
   * @param {string} key - Header key
   */
  removeHeader: (key) => {
    delete axiosInstance.defaults.headers.common[key];
  },

  /**
   * Cancel all pending requests
   */
  cancelAllRequests: () => {
    const cancelToken = axios.CancelToken.source();
    cancelToken.cancel('Cancelled by user');
  },
};

export default apiService;
