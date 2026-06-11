/**
 * Alert Component
 * 
 * Status alert component with different types.
 * 
 * Props:
 * - type: success, error, warning, info (default: info)
 * - title: Alert title
 * - message: Alert message/description
 * - icon: Optional custom icon
 * - onClose: Close handler (shows close button)
 * - className: Additional Tailwind classes
 * 
 * Path: src/components/common/Alert.jsx
 */

import React from 'react';
import clsx from 'clsx';

const Alert = ({ type = 'info', title, message, icon, onClose, className }) => {
  // Type configuration
  const typeConfig = {
    success: {
      bg: 'bg-success-900 border-success-700',
      text: 'text-success-100',
      title: 'text-success-50',
      icon: '✓',
    },
    error: {
      bg: 'bg-danger-900 border-danger-700',
      text: 'text-danger-100',
      title: 'text-danger-50',
      icon: '✕',
    },
    warning: {
      bg: 'bg-warning-900 border-warning-700',
      text: 'text-warning-100',
      title: 'text-warning-50',
      icon: '⚠',
    },
    info: {
      bg: 'bg-info-900 border-info-700',
      text: 'text-info-100',
      title: 'text-info-50',
      icon: 'ℹ',
    },
  };

  const config = typeConfig[type];

  const alertClasses = clsx(
    'p-4 rounded-lg border',
    config.bg,
    className
  );

  return (
    <div className={alertClasses} role="alert">
      <div className="flex gap-3">
        {/* Icon */}
        <div className={clsx('flex-shrink-0 text-lg font-bold', config.text)}>
          {icon || config.icon}
        </div>

        {/* Content */}
        <div className="flex-1">
          {title && (
            <h3 className={clsx('font-semibold', config.title)}>
              {title}
            </h3>
          )}
          {message && (
            <p className={clsx('text-sm', config.text, title && 'mt-1')}>
              {message}
            </p>
          )}
        </div>

        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className={clsx(
              'flex-shrink-0 text-lg opacity-60 hover:opacity-100',
              'transition-opacity',
              config.text
            )}
            aria-label="Close alert"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
