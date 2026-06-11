/**
 * Input Validation Service
 * 
 * Provides validation functions for:
 * - Email, password, username
 * - Prompt data
 * - Form inputs
 * - Custom patterns
 * 
 * Path: src/services/validators.js
 */

/**
 * Validation service
 */
export const validators = {
  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} True if valid
   */
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {object} Validation result with feedback
   */
  validatePassword: (password) => {
    const result = {
      valid: true,
      errors: [],
      strength: 0, // 0-4 (weak, fair, good, strong, very strong)
    };

    if (!password) {
      result.valid = false;
      result.errors.push('Password is required');
      return result;
    }

    if (password.length < 8) {
      result.valid = false;
      result.errors.push('Password must be at least 8 characters');
    } else {
      result.strength = 1;
    }

    if (!/[A-Z]/.test(password)) {
      result.errors.push('Password must include uppercase letter');
    } else if (result.strength < 2) {
      result.strength = 2;
    }

    if (!/[a-z]/.test(password)) {
      result.errors.push('Password must include lowercase letter');
    }

    if (!/[0-9]/.test(password)) {
      result.errors.push('Password must include number');
    } else if (result.strength < 3) {
      result.strength = 3;
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      result.errors.push('Password must include special character');
    } else {
      result.strength = 4;
    }

    result.valid = result.errors.length === 0;
    return result;
  },

  /**
   * Validate username
   * @param {string} username - Username to validate
   * @returns {object} Validation result
   */
  validateUsername: (username) => {
    const result = { valid: true, errors: [] };

    if (!username || username.trim() === '') {
      result.valid = false;
      result.errors.push('Username is required');
      return result;
    }

    if (username.length < 3) {
      result.valid = false;
      result.errors.push('Username must be at least 3 characters');
    }

    if (username.length > 30) {
      result.valid = false;
      result.errors.push('Username must not exceed 30 characters');
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      result.valid = false;
      result.errors.push('Username can only contain letters, numbers, underscores, and hyphens');
    }

    return result;
  },

  /**
   * Validate prompt title
   * @param {string} title - Prompt title to validate
   * @returns {object} Validation result
   */
  validatePromptTitle: (title) => {
    const result = { valid: true, errors: [] };

    if (!title || title.trim() === '') {
      result.valid = false;
      result.errors.push('Title is required');
      return result;
    }

    if (title.length < 3) {
      result.valid = false;
      result.errors.push('Title must be at least 3 characters');
    }

    if (title.length > 100) {
      result.valid = false;
      result.errors.push('Title must not exceed 100 characters');
    }

    return result;
  },

  /**
   * Validate prompt content
   * @param {string} content - Prompt content to validate
   * @returns {object} Validation result
   */
  validatePromptContent: (content) => {
    const result = { valid: true, errors: [] };

    if (!content || content.trim() === '') {
      result.valid = false;
      result.errors.push('Content is required');
      return result;
    }

    if (content.length < 10) {
      result.valid = false;
      result.errors.push('Content must be at least 10 characters');
    }

    if (content.length > 50000) {
      result.valid = false;
      result.errors.push('Content must not exceed 50,000 characters');
    }

    return result;
  },

  /**
   * Validate category name
   * @param {string} name - Category name to validate
   * @returns {object} Validation result
   */
  validateCategoryName: (name) => {
    const result = { valid: true, errors: [] };

    if (!name || name.trim() === '') {
      result.valid = false;
      result.errors.push('Category name is required');
      return result;
    }

    if (name.length < 2) {
      result.valid = false;
      result.errors.push('Category name must be at least 2 characters');
    }

    if (name.length > 50) {
      result.valid = false;
      result.errors.push('Category name must not exceed 50 characters');
    }

    return result;
  },

  /**
   * Validate tags
   * @param {string[]} tags - Tags array to validate
   * @returns {object} Validation result
   */
  validateTags: (tags) => {
    const result = { valid: true, errors: [], cleaned: [] };

    if (!Array.isArray(tags)) {
      result.valid = false;
      result.errors.push('Tags must be an array');
      return result;
    }

    if (tags.length > 10) {
      result.valid = false;
      result.errors.push('Maximum 10 tags allowed');
    }

    result.cleaned = tags
      .filter((tag) => typeof tag === 'string' && tag.trim().length > 0)
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag, index, array) => array.indexOf(tag) === index); // Remove duplicates

    result.cleaned.forEach((tag) => {
      if (tag.length < 2) {
        result.errors.push(`Tag "${tag}" is too short (min 2 characters)`);
        result.valid = false;
      }
      if (tag.length > 20) {
        result.errors.push(`Tag "${tag}" is too long (max 20 characters)`);
        result.valid = false;
      }
    });

    return result;
  },

  /**
   * Validate URL
   * @param {string} url - URL to validate
   * @returns {boolean} True if valid
   */
  isValidURL: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Validate hex color
   * @param {string} color - Hex color to validate
   * @returns {boolean} True if valid
   */
  isValidHexColor: (color) => {
    return /^#[0-9A-F]{6}$/i.test(color);
  },

  /**
   * Sanitize string input (basic XSS prevention)
   * @param {string} input - Input to sanitize
   * @returns {string} Sanitized input
   */
  sanitizeInput: (input) => {
    if (typeof input !== 'string') return '';

    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  },

  /**
   * Trim whitespace from input
   * @param {string} input - Input to trim
   * @returns {string} Trimmed input
   */
  trim: (input) => {
    return typeof input === 'string' ? input.trim() : '';
  },

  /**
   * Validate entire form data
   * @param {object} formData - Form data to validate
   * @param {object} schema - Validation schema
   * @returns {object} Validation results
   */
  validateForm: (formData, schema) => {
    const errors = {};
    let isValid = true;

    for (const [field, rules] of Object.entries(schema)) {
      const value = formData[field];
      const fieldErrors = [];

      // Required validation
      if (rules.required && (!value || value.toString().trim() === '')) {
        fieldErrors.push(`${field} is required`);
        isValid = false;
      }

      // Custom validator function
      if (rules.custom && typeof rules.custom === 'function') {
        const customError = rules.custom(value);
        if (customError) {
          fieldErrors.push(customError);
          isValid = false;
        }
      }

      if (fieldErrors.length > 0) {
        errors[field] = fieldErrors;
      }
    }

    return { isValid, errors };
  },
};

export default validators;
