/**
 * Placeholder Components
 * 
 * Stub components for future implementation.
 * These are referenced but not yet fully implemented.
 * 
 * Path: src/components/prompt/PromptCard.jsx
 */

import React from 'react';
import { Card } from '@components/common';

const PromptCard = ({ prompt, onSelect }) => {
  return (
    <Card hoverable onClick={() => onSelect?.(prompt)}>
      <h3 className="font-semibold text-neutral-50">{prompt.title}</h3>
      <p className="text-sm text-neutral-400">{prompt.description}</p>
    </Card>
  );
};

export default PromptCard;
