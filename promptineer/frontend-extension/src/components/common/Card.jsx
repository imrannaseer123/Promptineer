/**
 * Card Component
 * 
 * Container component for content grouping and layout.
 * 
 * Props:
 * - children: Card content
 * - header: Header section (optional)
 * - footer: Footer section (optional)
 * - className: Additional Tailwind classes
 * - hoverable: Boolean (adds hover effect)
 * - bordered: Boolean (adds border)
 * 
 * Path: src/components/common/Card.jsx
 */

import React from 'react';
import clsx from 'clsx';

const Card = React.forwardRef(
  (
    {
      children,
      header,
      footer,
      className,
      hoverable = false,
      bordered = false,
    },
    ref
  ) => {
    const cardClasses = clsx(
      'bg-neutral-800 rounded-lg',
      bordered ? 'border border-neutral-700' : 'shadow-md',
      hoverable && 'hover:shadow-lg hover:bg-neutral-750 transition-all duration-200 cursor-pointer',
      'overflow-hidden',
      className
    );

    return (
      <div ref={ref} className={cardClasses}>
        {header && (
          <div className="px-4 py-3 border-b border-neutral-700">
            {header}
          </div>
        )}

        <div className="px-4 py-3">
          {children}
        </div>

        {footer && (
          <div className="px-4 py-3 border-t border-neutral-700 bg-neutral-750">
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
