/**
 * Popup Page Component
 * 
 * Main component for the extension popup (400x600px).
 * Displays the quick prompt access UI.
 * 
 * Path: src/pages/Popup.jsx
 */

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@store/useStore';
import Header from '@components/layout/Header';
import PromptList from '@components/prompt/PromptList';
import LoginForm from '@components/auth/LoginForm';
import Spinner from '@components/common/Spinner';
import Alert from '@components/common/Alert';

/**
 * Popup Page Component
 * 
 * Renders:
 * - Header with navigation
 * - Login form if not authenticated
 * - Prompt list if authenticated
 * - Loading state during auth check
 */
function Popup() {
  // Get auth state
  const { isAuthenticated, isLoading, error, checkAuth } = useAuthStore();
  const [hasChecked, setHasChecked] = useState(false);

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
      <div className="flex items-center justify-center h-full">
        <Spinner size="lg" />
      </div>
    );
  }

  /**
   * Render error state
   */
  if (error) {
    return (
      <div className="flex flex-col h-full">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <Alert type="error" title="Error" message={error} />
        </div>
      </div>
    );
  }

  /**
   * Render login form if not authenticated
   */
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col h-full">
        <Header />
        <div className="flex-1 overflow-y-auto">
          <LoginForm />
        </div>
      </div>
    );
  }

  /**
   * Render prompt list if authenticated
   */
  return (
    <div className="flex flex-col h-full bg-neutral-900 text-neutral-50">
      <Header />
      <div className="flex-1 overflow-y-auto">
        <PromptList />
      </div>
    </div>
  );
}

export default Popup;
