/**
 * Application Constants
 * 
 * Global constants used throughout the application.
 * 
 * Path: src/utils/constants.js
 */

/**
 * API Configuration
 */
export const API_CONFIG = {
  BASE_URL: process.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  TIMEOUT: parseInt(process.env.VITE_API_TIMEOUT || '30000'),
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      REFRESH: '/auth/refresh',
      LOGOUT: '/auth/logout',
    },
    USERS: {
      PROFILE: '/users',
      UPDATE_PROFILE: '/users/{id}',
      SETTINGS: '/users/{id}/settings',
    },
    PROMPTS: {
      LIST: '/prompts',
      CREATE: '/prompts',
      GET: '/prompts/{id}',
      UPDATE: '/prompts/{id}',
      DELETE: '/prompts/{id}',
      EXECUTE: '/prompts/{id}/execute',
      SEARCH: '/prompts/search',
    },
    CATEGORIES: {
      LIST: '/categories',
      CREATE: '/categories',
      UPDATE: '/categories/{id}',
      DELETE: '/categories/{id}',
    },
    API_KEYS: {
      LIST: '/api-keys',
      CREATE: '/api-keys',
      DELETE: '/api-keys/{id}',
    },
  },
};

/**
 * Storage Keys
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  TOKEN_EXPIRY: 'token_expiry',
  THEME: 'theme',
  PREFERENCES: 'preferences',
  CACHED_PROMPTS: 'cached_prompts',
  CACHED_CATEGORIES: 'cached_categories',
  LAST_SYNC: 'last_sync',
};

/**
 * Theme Options
 */
export const THEME_OPTIONS = {
  DARK: 'dark',
  LIGHT: 'light',
};

/**
 * Notification Types
 */
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

/**
 * Notification Duration (ms)
 */
export const NOTIFICATION_DURATION = {
  SHORT: 3000,
  NORMAL: 5000,
  LONG: 8000,
  PERMANENT: 0,
};

/**
 * User Subscription Tiers
 */
export const SUBSCRIPTION_TIERS = {
  FREE: 'free',
  PRO: 'pro',
  ENTERPRISE: 'enterprise',
};

/**
 * Subscription Limits
 */
export const SUBSCRIPTION_LIMITS = {
  [SUBSCRIPTION_TIERS.FREE]: {
    maxPrompts: 100,
    maxCategories: 10,
    maxApiKeys: 1,
    maxExecutionsPerDay: 100,
  },
  [SUBSCRIPTION_TIERS.PRO]: {
    maxPrompts: 1000,
    maxCategories: 50,
    maxApiKeys: 5,
    maxExecutionsPerDay: 5000,
  },
  [SUBSCRIPTION_TIERS.ENTERPRISE]: {
    maxPrompts: null, // Unlimited
    maxCategories: null,
    maxApiKeys: null,
    maxExecutionsPerDay: null,
  },
};

/**
 * Prompt Visibility Options
 */
export const PROMPT_VISIBILITY = {
  PRIVATE: 'private',
  SHARED: 'shared',
  PUBLIC: 'public',
};

/**
 * Prompt Variable Types
 */
export const VARIABLE_TYPES = {
  TEXT: 'text',
  NUMBER: 'number',
  CHECKBOX: 'checkbox',
  SELECT: 'select',
  TEXTAREA: 'textarea',
};

/**
 * Error Codes
 */
export const ERROR_CODES = {
  // Authentication
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',

  // Validation
  INVALID_INPUT: 'INVALID_INPUT',
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  DUPLICATE_ENTRY: 'DUPLICATE_ENTRY',

  // Server
  SERVER_ERROR: 'SERVER_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',

  // Network
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT: 'TIMEOUT',

  // Resource
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  CONFLICT: 'CONFLICT',

  // Rate limiting
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
};

/**
 * HTTP Status Codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

/**
 * Regex Patterns
 */
export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  HEX_COLOR: /^#[0-9A-F]{6}$/i,
  USERNAME: /^[a-zA-Z0-9_-]{3,30}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

/**
 * Date/Time Constants
 */
export const TIME_CONSTANTS = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000,
};

/**
 * Cache Duration (ms)
 */
export const CACHE_DURATION = {
  SHORT: 5 * TIME_CONSTANTS.MINUTE,
  NORMAL: 30 * TIME_CONSTANTS.MINUTE,
  LONG: TIME_CONSTANTS.HOUR,
  VERY_LONG: 24 * TIME_CONSTANTS.HOUR,
};

/**
 * Environment
 */
export const ENVIRONMENT = process.env.VITE_ENV || 'development';

/**
 * Debug Mode
 */
export const DEBUG_MODE = process.env.VITE_DEBUG === 'true';

/**
 * App Info
 */
export const APP_INFO = {
  NAME: 'Promptineer',
  VERSION: '1.0.0',
  DESCRIPTION: 'Engineer Better Prompts',
  TAGLINE: 'Manage, organize, and execute AI prompts efficiently',
  AUTHOR: 'Promptineer Team',
};

/**
 * Feature Flags
 */
export const FEATURE_FLAGS = {
  ENABLE_ANALYTICS: process.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_NOTIFICATIONS: process.env.VITE_ENABLE_NOTIFICATIONS === 'true',
};

/**
 * Rate Limits
 */
export const RATE_LIMITS = {
  API_CALLS_PER_MINUTE: 60,
  PROMPT_EXECUTIONS_PER_MINUTE: 10,
  FAILED_LOGIN_ATTEMPTS: 5,
};

/**
 * Validation Rules
 */
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 30,
  PROMPT_TITLE_MIN_LENGTH: 3,
  PROMPT_TITLE_MAX_LENGTH: 100,
  PROMPT_CONTENT_MIN_LENGTH: 10,
  PROMPT_CONTENT_MAX_LENGTH: 50000,
  CATEGORY_NAME_MIN_LENGTH: 2,
  CATEGORY_NAME_MAX_LENGTH: 50,
  MAX_TAGS: 10,
  MAX_TAG_LENGTH: 20,
  MAX_CATEGORIES: 100,
};
