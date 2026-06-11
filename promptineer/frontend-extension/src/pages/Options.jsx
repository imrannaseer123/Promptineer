/**
 * Options Page Component
 * 
 * Full-page settings interface for user preferences and account management.
 * Opens in a new tab (not constrained size like popup).
 * 
 * Path: src/pages/Options.jsx
 */

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@store/useStore';
import MainLayout from '@components/layout/MainLayout';
import ProfileSettings from '@components/settings/ProfileSettings';
import APIKeySettings from '@components/settings/APIKeySettings';
import Preferences from '@components/settings/Preferences';
import LoginForm from '@components/auth/LoginForm';
import Spinner from '@components/common/Spinner';
import Alert from '@components/common/Alert';

/**
 * Options Page Component
 * 
 * Renders:
 * - MainLayout with sidebar navigation
 * - Different settings sections based on active tab
 * - Login form if not authenticated
 */
function Options() {
  // Get auth state
  const { isAuthenticated, isLoading, error, checkAuth } = useAuthStore();
  const [hasChecked, setHasChecked] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  /**
   * Check authentication status on mount
   */
  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setHasChecked(true);
    };

    verifyAuth();
  }, [checkAuth]);

  /**
   * Render loading state
   */
  if (isLoading || !hasChecked) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-900">
        <Spinner size="lg" />
      </div>
    );
  }

  /**
   * Render error state
   */
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-neutral-900 p-8">
        <Alert type="error" title="Error" message={error} />
      </div>
    );
  }

  /**
   * Render login form if not authenticated
   */
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-900">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    );
  }

  /**
   * Render settings interface with sidebar layout
   */
  return (
    <MainLayout>
      <div className="flex gap-8 p-8">
        {/* Sidebar Navigation */}
        <nav className="w-48 flex-shrink-0">
          <div className="space-y-2">
            {/* Profile Settings Tab */}
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full px-4 py-2 rounded-lg text-left transition-all ${
                activeTab === 'profile'
                  ? 'bg-primary text-white'
                  : 'text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              Profile Settings
            </button>

            {/* API Keys Tab */}
            <button
              onClick={() => setActiveTab('api-keys')}
              className={`w-full px-4 py-2 rounded-lg text-left transition-all ${
                activeTab === 'api-keys'
                  ? 'bg-primary text-white'
                  : 'text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              API Keys
            </button>

            {/* Preferences Tab */}
            <button
              onClick={() => setActiveTab('preferences')}
              className={`w-full px-4 py-2 rounded-lg text-left transition-all ${
                activeTab === 'preferences'
                  ? 'bg-primary text-white'
                  : 'text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              Preferences
            </button>
          </div>
        </nav>

        {/* Content Area */}
        <div className="flex-1">
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'api-keys' && <APIKeySettings />}
          {activeTab === 'preferences' && <Preferences />}
        </div>
      </div>
    </MainLayout>
  );
}

export default Options;
