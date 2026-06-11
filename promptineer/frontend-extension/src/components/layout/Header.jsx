/**
 * Header Layout Component
 * 
 * Top navigation bar for the extension UI.
 * Displays branding, search, and user menu.
 * 
 * Path: src/components/layout/Header.jsx
 */

import React, { useState } from 'react';
import { useAuthStore, useUiStore } from '@store/useStore';
import Button from '@components/common/Button';

const Header = () => {
  const { user, logout } = useAuthStore();
  const { toggleTheme, theme } = useUiStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  return (
    <header className="bg-neutral-800 border-b border-neutral-700 px-4 py-3 flex items-center justify-between gap-4 sticky top-0 z-10">
      {/* Logo / Brand */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">P</span>
        </div>
        <h1 className="text-lg font-bold text-neutral-50 hidden sm:block">
          Promptineer
        </h1>
      </div>

      {/* Search Bar (Optional - can be added later) */}
      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </Button>

        {/* User Menu */}
        {user && (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-neutral-700 transition-colors"
              title="User menu"
            >
              <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                {user.first_name?.[0] || user.email?.[0] || 'U'}
              </span>
              <span className="text-sm text-neutral-300 hidden sm:inline truncate max-w-[100px]">
                {user.first_name || user.username || 'User'}
              </span>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-neutral-700 rounded-lg shadow-lg border border-neutral-600 overflow-hidden z-20">
                <div className="px-4 py-2 border-b border-neutral-600">
                  <p className="text-sm font-medium text-neutral-50">{user.first_name || 'User'}</p>
                  <p className="text-xs text-neutral-400">{user.email}</p>
                </div>

                <button
                  onClick={() => {
                    // Navigate to options/settings
                    chrome.runtime.openOptionsPage?.();
                    setShowUserMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-neutral-300 hover:bg-neutral-600 transition-colors"
                >
                  Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-danger-400 hover:bg-neutral-600 transition-colors border-t border-neutral-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
