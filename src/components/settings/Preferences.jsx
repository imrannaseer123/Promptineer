/**
 * Preferences Component
 * 
 * User preferences and settings.
 * 
 * Path: src/components/settings/Preferences.jsx
 */

import React, { useState } from 'react';
import { useUiStore } from '@store/useStore';
import { Card, Button, Select } from '@components/common';

const Preferences = () => {
  const { theme, setTheme } = useUiStore();
  const [preferences, setPreferences] = useState({
    theme,
    notifications: true,
    language: 'en',
  });

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setPreferences((prev) => ({ ...prev, theme: newTheme }));
    setTheme(newTheme);
  };

  return (
    <div className="max-w-2xl">
      <Card>
        <h3 className="text-xl font-semibold text-neutral-50 mb-6">
          Preferences
        </h3>

        <div className="space-y-6">
          {/* Theme Selection */}
          <div>
            <Select
              label="Theme"
              value={preferences.theme}
              onChange={handleThemeChange}
              options={[
                { value: 'dark', label: 'Dark Mode' },
                { value: 'light', label: 'Light Mode' },
              ]}
            />
            <p className="text-sm text-neutral-400 mt-2">
              Choose your preferred color theme
            </p>
          </div>

          {/* Language Selection */}
          <div>
            <Select
              label="Language"
              value={preferences.language}
              onChange={(e) =>
                setPreferences((prev) => ({ ...prev, language: e.target.value }))
              }
              options={[
                { value: 'en', label: 'English' },
                { value: 'es', label: 'Spanish' },
                { value: 'fr', label: 'French' },
                { value: 'de', label: 'German' },
              ]}
            />
            <p className="text-sm text-neutral-400 mt-2">
              Select your preferred language
            </p>
          </div>

          {/* Save Button */}
          <Button variant="primary">
            Save Preferences
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Preferences;
