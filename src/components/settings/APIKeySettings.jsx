/**
 * API Key Settings Component
 * 
 * Manage API keys for programmatic access.
 * 
 * Path: src/components/settings/APIKeySettings.jsx
 */

import React from 'react';
import { Card, Button, Badge } from '@components/common';

const APIKeySettings = () => {
  return (
    <div className="max-w-2xl">
      <Card>
        <h3 className="text-xl font-semibold text-neutral-50 mb-6">
          API Keys
        </h3>

        <p className="text-neutral-400 mb-6">
          Create API keys to access Promptineer programmatically.
        </p>

        <div className="space-y-4">
          <Button variant="primary">
            Generate New Key
          </Button>

          {/* Placeholder for API keys list */}
          <div className="mt-6 p-4 border border-neutral-700 rounded-lg text-center">
            <p className="text-neutral-400">No API keys created yet</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default APIKeySettings;
