/**
 * Button Component
 * 
 * Reusable button component with multiple variants and sizes.
 * 
 * Props:
 * - children: Button text/content
 * - variant: primary, secondary, danger, ghost (default: primary)
 * - size: sm, md, lg (default: md)
 * - disabled: Boolean
 * - loading: Boolean (shows spinner)
 * - onClick: Click handler
 * - className: Additional Tailwind classes
 * 
 * Path: src/components/common/Button.jsx
 */

import React from 'react';
import clsx from 'clsx';
import Spinner from './Spinner';

const Button = React.forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      onClick,
      className,
      ...props
    },
    ref
  ) => {
    // Size classes
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    // Variant classes
    const variantClasses = {
      primary:
        'bg-primary hover:bg-primary-dark text-white disabled:bg-neutral-500',
      secondary:
        'bg-neutral-800 hover:bg-neutral-700 text-neutral-50 border border-neutral-600 disabled:bg-neutral-600',
      danger:
        'bg-danger-600 hover:bg-danger-700 text-white disabled:bg-neutral-500',
      ghost:
        'text-primary hover:bg-neutral-800 disabled:text-neutral-500',
    };

    const buttonClasses = clsx(
      'inline-flex items-center justify-center gap-2',
      'rounded-lg font-medium transition-all duration-200',
      'focus-visible:outline-offset-2 focus-visible:outline-primary',
      'disabled:cursor-not-allowed',
      sizeClasses[size],
      variantClasses[variant],
      className
    );

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
        onClick={onClick}
        {...props}
      >
        {loading && <Spinner size="sm" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
