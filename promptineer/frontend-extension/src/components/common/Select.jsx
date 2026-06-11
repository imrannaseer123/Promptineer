/**
 * Select Component
 * 
 * Dropdown select component.
 * 
 * Props:
 * - label: Label text (optional)
 * - value: Selected value
 * - onChange: Change handler
 * - options: Array of options [{value, label}]
 * - error: Error message (shows error state)
 * - disabled: Boolean
 * - required: Boolean
 * - placeholder: Placeholder text
 * - className: Additional Tailwind classes
 * 
 * Path: src/components/common/Select.jsx
 */

import React from 'react';
import clsx from 'clsx';

const Select = React.forwardRef(
  (
    {
      label,
      value,
      onChange,
      options = [],
      error,
      disabled = false,
      required = false,
      placeholder = 'Select an option',
      className,
      ...props
    },
    ref
  ) => {
    const selectClasses = clsx(
      'w-full px-3 py-2 rounded-lg',
      'bg-neutral-800 border border-neutral-600',
      'text-neutral-50',
      'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20',
      'disabled:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50',
      'appearance-none cursor-pointer',
      error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-500',
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
          <select
            ref={ref}
            className={selectClasses}
            value={value}
            onChange={onChange}
            disabled={disabled}
            {...props}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Custom dropdown arrow */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-neutral-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>

        {error && (
          <p className="text-sm text-danger-500 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
