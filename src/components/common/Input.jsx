/**
 * Input Component
 * 
 * Reusable text input component with variants and error states.
 * 
 * Props:
 * - label: Label text (optional)
 * - placeholder: Placeholder text
 * - type: input type (text, email, password, etc.)
 * - value: Input value
 * - onChange: Change handler
 * - error: Error message (shows error state)
 * - disabled: Boolean
 * - required: Boolean (shows * in label)
 * - icon: Optional icon component or JSX
 * - className: Additional Tailwind classes
 * 
 * Path: src/components/common/Input.jsx
 */

import React from 'react';
import clsx from 'clsx';

const Input = React.forwardRef(
  (
    {
      label,
      placeholder,
      type = 'text',
      value,
      onChange,
      error,
      disabled = false,
      required = false,
      icon,
      className,
      ...props
    },
    ref
  ) => {
    const inputClasses = clsx(
      'w-full px-3 py-2 rounded-lg',
      'bg-neutral-800 border border-neutral-600',
      'text-neutral-50 placeholder-neutral-400',
      'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20',
      'disabled:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50',
      error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-500',
      icon && 'pl-10',
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            {label}
            {required && <span className="text-danger-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            type={type}
            className={inputClasses}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            {...props}
          />
        </div>

        {error && (
          <p className="text-sm text-danger-500 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
