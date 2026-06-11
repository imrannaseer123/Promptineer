/**
 * Main Layout Component
 * 
 * Full-page layout with header and main content area.
 * Used for the options/settings page.
 * 
 * Props:
 * - children: Page content
 * 
 * Path: src/components/layout/MainLayout.jsx
 */

import React from 'react';
import Header from './Header';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-neutral-900">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
