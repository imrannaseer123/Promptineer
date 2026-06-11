/**
 * Services Barrel Export
 * 
 * Central export for all service layer modules.
 * Simplifies imports throughout the application.
 * 
 * Usage:
 * import { apiService, authService, storageService } from '@services';
 * 
 * Path: src/services/index.js
 */

export { apiService, default as api } from './api';
export { authService } from './auth';
export { storageService } from './storage';
export { messagingService, sendToBackground, sendToContentScript, onMessage } from './messaging';
export { validators } from './validators';
