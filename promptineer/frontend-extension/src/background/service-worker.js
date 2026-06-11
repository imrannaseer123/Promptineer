/**
 * Chrome Extension Service Worker (Background Script)
 * 
 * Runs in the background and handles:
 * - Message passing between popup and content scripts
 * - Background tasks and timers
 * - Storage synchronization
 * - API requests
 * 
 * Path: src/background/service-worker.js
 */

import { setupBackgroundMessageListener, messagingService } from '@services/messaging';
import { authService } from '@services/auth';

/**
 * Service Worker initialization
 */
console.log('Promptineer Background Service Worker loaded');

/**
 * Set up message listeners
 */
setupBackgroundMessageListener();

/**
 * Install event - called when extension is first installed
 */
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Extension installed');
    // Open onboarding page
    chrome.tabs.create({ url: 'chrome://newtab' });
  } else if (details.reason === 'update') {
    console.log('Extension updated');
  }
});

/**
 * Listen for tab activation
 */
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    console.log('Tab activated:', tab.title);
  } catch (error) {
    console.error('Error handling tab activation:', error);
  }
});

/**
 * Listen for messages from popup and content scripts
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { action, data } = message;

  switch (action) {
    case 'LOGOUT':
      handleLogout(sendResponse);
      break;

    case 'GET_AUTH_STATUS':
      handleGetAuthStatus(sendResponse);
      break;

    case 'SYNC_DATA':
      handleSyncData(sendResponse);
      break;

    case 'EXECUTE_PROMPT':
      handleExecutePrompt(data, sendResponse);
      break;

    default:
      console.warn(`Unknown action: ${action}`);
      sendResponse({ error: `Unknown action: ${action}` });
  }

  // Return true to indicate async response
  return true;
});

/**
 * Handle logout action
 */
async function handleLogout(sendResponse) {
  try {
    await authService.clearToken();
    sendResponse({ success: true });
  } catch (error) {
    console.error('Error logging out:', error);
    sendResponse({ success: false, error: error.message });
  }
}

/**
 * Handle get auth status
 */
async function handleGetAuthStatus(sendResponse) {
  try {
    const token = await authService.getToken();
    const isExpired = await authService.isTokenExpired();
    const user = await authService.getUser();

    sendResponse({
      success: true,
      isAuthenticated: !!token && !isExpired,
      user,
      tokenExpiry: await authService.getTokenExpiry(),
    });
  } catch (error) {
    console.error('Error checking auth status:', error);
    sendResponse({ success: false, error: error.message });
  }
}

/**
 * Handle data sync
 */
async function handleSyncData(sendResponse) {
  try {
    // Implement data sync logic here
    sendResponse({ success: true, data: {} });
  } catch (error) {
    console.error('Error syncing data:', error);
    sendResponse({ success: false, error: error.message });
  }
}

/**
 * Handle prompt execution
 */
async function handleExecutePrompt(data, sendResponse) {
  try {
    const { promptId, variables } = data;
    console.log('Executing prompt:', promptId);

    // Implement prompt execution logic here
    sendResponse({ success: true, output: '', executionTime: 0 });
  } catch (error) {
    console.error('Error executing prompt:', error);
    sendResponse({ success: false, error: error.message });
  }
}

/**
 * Set alarm for periodic tasks
 * Called on extension startup
 */
function setupAlarms() {
  // Refresh auth token every 12 hours
  chrome.alarms.create('refreshToken', { periodInMinutes: 12 * 60 });

  // Sync data every hour
  chrome.alarms.create('syncData', { periodInMinutes: 60 });
}

/**
 * Handle alarms
 */
chrome.alarms.onAlarm.addListener((alarm) => {
  switch (alarm.name) {
    case 'refreshToken':
      console.log('Refreshing auth token');
      // Implement token refresh logic
      break;

    case 'syncData':
      console.log('Syncing data');
      // Implement data sync logic
      break;

    default:
      console.warn(`Unknown alarm: ${alarm.name}`);
  }
});

/**
 * Initialize on startup
 */
setupAlarms();
console.log('Background service worker initialized');
