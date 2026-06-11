/**
 * Modal Component
 * 
 * Reusable modal dialog component.
 * 
 * Props:
 * - isOpen: Boolean (controls modal visibility)
 * - title: Modal title
 * - children: Modal content
 * - onClose: Close handler
 * - size: sm, md, lg, xl (default: md)
 * - footer: Footer section with buttons (optional)
 * 
 * Path: src/components/common/Modal.jsx
 */

import React, { useEffect } from 'react';
import clsx from 'clsx';

const Modal = ({ isOpen, title, children, onClose, size = 'md', footer }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Size classes
  const sizeClasses = {
    sm: 'w-96',
    md: 'w-[500px]',
    lg: 'w-[600px]',
    xl: 'w-[800px]',
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
        role="presentation"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div
          className={clsx(
            'bg-neutral-800 rounded-lg shadow-2xl',
            'max-h-[90vh] overflow-y-auto',
            'pointer-events-auto',
            sizeClasses[size]
          )}
          role="dialog"
          aria-labelledby="modal-title"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-700 sticky top-0 bg-neutral-800">
            <h2 id="modal-title" className="text-lg font-semibold text-neutral-50">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-200 transition-colors text-xl"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6 text-neutral-100">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="p-6 border-t border-neutral-700 bg-neutral-750 flex gap-3 justify-end">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
