/**
 * Badge Component
 * 
 * Small label component for tags, status indicators, etc.
 * 
 * Props:
 * - children: Badge text
 * - variant: primary, accent, success, warning, danger, info, gray (default: primary)
 * - size: sm, md, lg (default: md)
 * - className: Additional Tailwind classes
 * 
 * Path: src/components/common/Badge.jsx
 */

import React from 'react';
import clsx from 'clsx';

const Badge = ({ children, variant = 'primary', size = 'md', className }) => {
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary-900 text-primary-200',
    accent: 'bg-accent-900 text-accent-200',
    success: 'bg-success-900 text-success-200',
    warning: 'bg-warning-900 text-warning-200',
    danger: 'bg-danger-900 text-danger-200',
    info: 'bg-info-900 text-info-200',
    gray: 'bg-neutral-700 text-neutral-200',
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs font-medium',
    md: 'px-2.5 py-1 text-sm font-medium',
    lg: 'px-3 py-1.5 text-base font-medium',
  };

  const badgeClasses = clsx(
    'inline-block rounded-full',
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  return <span className={badgeClasses}>{children}</span>;
};

export default Badge;
