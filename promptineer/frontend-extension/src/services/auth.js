/**
 * Authentication Service
 * 
 * Manages JWT tokens, authentication state, and user credentials.
 * Handles token storage, retrieval, validation, and refresh logic.
 * 
 * Path: src/services/auth.js
 */

import { storageService } from './storage';

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user_data';
const TOKEN_EXPIRY_KEY = 'token_expiry';

/**
 * Authentication service
 */
export const authService = {
  /**
   * Save JWT token to Chrome Storage
   * @param {string} token - JWT token
   * @param {string} refreshToken - Refresh token (optional)
   * @returns {Promise<void>}
   */
  saveToken: async (token, refreshToken = null) => {
    try {
      const payload = parseJwt(token);
      const expiryTime = payload.exp ? payload.exp * 1000 : Date.now() + 24 * 60 * 60 * 1000;

      await storageService.setMultiple({
        [TOKEN_KEY]: token,
        [REFRESH_TOKEN_KEY]: refreshToken || token,
        [TOKEN_EXPIRY_KEY]: expiryTime,
      });
    } catch (error) {
      console.error('Error saving token:', error);
    }
  },

  /**
   * Get stored JWT token
   * @returns {Promise<string|null>} Token or null
   */
  getToken: async () => {
    try {
      const token = await storageService.get(TOKEN_KEY);
      return token || null;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  /**
   * Get refresh token
   * @returns {Promise<string|null>} Refresh token or null
   */
  getRefreshToken: async () => {
    try {
      const token = await storageService.get(REFRESH_TOKEN_KEY);
      return token || null;
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  },

  /**
   * Check if token is expired
   * @returns {Promise<boolean>} True if expired
   */
  isTokenExpired: async () => {
    try {
      const expiry = await storageService.get(TOKEN_EXPIRY_KEY);
      if (!expiry) return true;
      return Date.now() >= expiry;
    } catch (error) {
      console.error('Error checking token expiry:', error);
      return true;
    }
  },

  /**
   * Get token expiry time
   * @returns {Promise<number|null>} Expiry time in ms or null
   */
  getTokenExpiry: async () => {
    try {
      return await storageService.get(TOKEN_EXPIRY_KEY);
    } catch (error) {
      console.error('Error getting token expiry:', error);
      return null;
    }
  },

  /**
   * Clear all auth tokens
   * @returns {Promise<void>}
   */
  clearToken: async () => {
    try {
      await storageService.removeMultiple([
        TOKEN_KEY,
        REFRESH_TOKEN_KEY,
        USER_KEY,
        TOKEN_EXPIRY_KEY,
      ]);
    } catch (error) {
      console.error('Error clearing token:', error);
    }
  },

  /**
   * Save user data
   * @param {object} user - User object
   * @returns {Promise<void>}
   */
  saveUser: async (user) => {
    try {
      await storageService.set(USER_KEY, user);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  },

  /**
   * Get saved user data
   * @returns {Promise<object|null>} User object or null
   */
  getUser: async () => {
    try {
      return await storageService.get(USER_KEY);
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  /**
   * Verify token validity with backend
   * This would be called from authStore.checkAuth()
   * @param {string} token - Token to verify
   * @returns {Promise<object>} API response
   */
  verifyToken: async (token) => {
    // This is called from authStore
    // The actual implementation depends on your backend
    // For now, we just return a placeholder
    return {
      data: {
        user: await authService.getUser(),
      },
    };
  },

  /**
   * Login user with credentials
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<object>} API response (handled by authStore)
   */
  login: async (email, password) => {
    // This is handled by the API service
    // authService just manages the tokens
  },

  /**
   * Register new user
   * @param {object} userData - User data
   * @returns {Promise<object>} API response (handled by authStore)
   */
  register: async (userData) => {
    // This is handled by the API service
    // authService just manages the tokens
  },

  /**
   * Update user profile
   * @param {object} userData - Updated user data
   * @returns {Promise<object>} API response (handled by authStore)
   */
  updateProfile: async (userData) => {
    // This is handled by the API service
    // authService just manages the tokens
  },
};

/**
 * Parse JWT token payload (without verification)
 * @param {string} token - JWT token
 * @returns {object} Decoded payload
 */
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return {};
  }
}

export { parseJwt };
