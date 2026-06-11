/**
 * Spinner Component
 * 
 * Loading spinner with multiple sizes.
 * 
 * Props:
 * - size: xs, sm, md, lg (default: md)
 * - className: Additional Tailwind classes
 * 
 * Path: src/components/common/Spinner.jsx
 */

import React from 'react';
import clsx from 'clsx';

const Spinner = ({ size = 'md', className }) => {
  // Size classes
  const sizeClasses = {
    xs: 'w-3 h-3 border-2',
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
  };

  const spinnerClasses = clsx(
    'border-t-primary border-neutral-600 rounded-full animate-spin',
    sizeClasses[size],
    className
  );

  return (
    <div className={spinnerClasses} role="status" aria-label="Loading">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
