/**
 * Chrome Messaging Service
 * 
 * Handles message passing between:
 * - Content scripts
 * - Background service worker
 * - Popup/Options pages
 * 
 * Path: src/services/messaging.js
 */

/**
 * Send message to background script
 * @param {object} message - Message object
 * @param {string} message.action - Action type
 * @param {any} message.data - Message data
 * @returns {Promise<object>} Response from background
 */
export const sendToBackground = (message) => {
  return new Promise((resolve, reject) => {
    try {
      chrome.runtime.sendMessage(message, (response) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve(response);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Send message to content script on active tab
 * @param {object} message - Message object
 * @returns {Promise<object>} Response from content script
 */
export const sendToContentScript = async (message) => {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
          reject(new Error('No active tab found'));
          return;
        }

        const tabId = tabs[0].id;

        chrome.tabs.sendMessage(tabId, message, (response) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve(response);
          }
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Send message to specific tab
 * @param {number} tabId - Tab ID
 * @param {object} message - Message object
 * @returns {Promise<object>} Response from tab
 */
export const sendToTab = (tabId, message) => {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.sendMessage(tabId, message, (response) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve(response);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Listen for messages
 * Use in background.js or content scripts
 * @param {Function} callback - Message handler
 */
export const onMessage = (callback) => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Call callback with message, sender, and send response
    callback(message, sender, sendResponse);
    // Return true to indicate async response
    return true;
  });
};

/**
 * Message Service with common actions
 */
export const messagingService = {
  /**
   * Execute prompt action
   * @param {string} promptId - Prompt ID
   * @param {object} variables - Input variables
   * @returns {Promise<object>} Execution result
   */
  executePrompt: (promptId, variables) => {
    return sendToBackground({
      action: 'EXECUTE_PROMPT',
      data: { promptId, variables },
    });
  },

  /**
   * Get current tab info
   * @returns {Promise<object>} Tab info
   */
  getCurrentTab: () => {
    return sendToBackground({
      action: 'GET_CURRENT_TAB',
      data: {},
    });
  },

  /**
   * Inject prompt into page
   * @param {string} promptId - Prompt ID
   * @returns {Promise<object>} Result
   */
  injectPrompt: (promptId) => {
    return sendToBackground({
      action: 'INJECT_PROMPT',
      data: { promptId },
    });
  },

  /**
   * Log user action
   * @param {string} action - Action name
   * @param {object} data - Action data
   * @returns {Promise<void>}
   */
  logAction: (action, data = {}) => {
    return sendToBackground({
      action: 'LOG_ACTION',
      data: { action, ...data },
    });
  },

  /**
   * Sync data from background
   * @returns {Promise<object>} Synced data
   */
  syncData: () => {
    return sendToBackground({
      action: 'SYNC_DATA',
      data: {},
    });
  },

  /**
   * Show notification
   * @param {object} options - Notification options
   * @returns {Promise<void>}
   */
  showNotification: (options) => {
    return sendToBackground({
      action: 'SHOW_NOTIFICATION',
      data: options,
    });
  },

  /**
   * Handle logout in background
   * @returns {Promise<void>}
   */
  logout: () => {
    return sendToBackground({
      action: 'LOGOUT',
      data: {},
    });
  },
};

/**
 * Background Script Message Handler Setup
 * Call this in service-worker.js to set up listeners
 * 
 * Example:
 * setupBackgroundMessageListener();
 */
export const setupBackgroundMessageListener = () => {
  onMessage((message, sender, sendResponse) => {
    const { action, data } = message;

    switch (action) {
      case 'EXECUTE_PROMPT':
        handleExecutePrompt(data, sendResponse);
        break;

      case 'GET_CURRENT_TAB':
        handleGetCurrentTab(sendResponse);
        break;

      case 'INJECT_PROMPT':
        handleInjectPrompt(data, sendResponse);
        break;

      case 'LOG_ACTION':
        handleLogAction(data);
        sendResponse({ success: true });
        break;

      case 'SYNC_DATA':
        handleSyncData(sendResponse);
        break;

      case 'SHOW_NOTIFICATION':
        handleShowNotification(data);
        sendResponse({ success: true });
        break;

      case 'LOGOUT':
        handleLogout(sendResponse);
        break;

      default:
        console.warn(`Unknown action: ${action}`);
        sendResponse({ error: `Unknown action: ${action}` });
    }
  });
};

/**
 * Message Handlers (called from background script)
 * These are placeholder implementations
 */

const handleExecutePrompt = (data, sendResponse) => {
  // Implementation in background script
  sendResponse({ success: true, message: 'Prompt executed' });
};

const handleGetCurrentTab = (sendResponse) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    sendResponse({ success: true, tab: tabs[0] || null });
  });
};

const handleInjectPrompt = (data, sendResponse) => {
  // Implementation in background script
  sendResponse({ success: true, message: 'Prompt injected' });
};

const handleLogAction = (data) => {
  console.log('Action logged:', data);
};

const handleSyncData = (sendResponse) => {
  // Implementation in background script
  sendResponse({ success: true, data: {} });
};

const handleShowNotification = (data) => {
  // Implementation in background script
  console.log('Show notification:', data);
};

const handleLogout = (sendResponse) => {
  // Implementation in background script
  sendResponse({ success: true });
};
