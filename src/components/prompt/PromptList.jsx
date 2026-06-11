/**
 * Prompt List Component
 * 
 * Displays list of user prompts with search and filtering.
 * 
 * Path: src/components/prompt/PromptList.jsx
 */

import React, { useEffect } from 'react';
import { usePromptStore } from '@store/useStore';
import { Spinner, Card } from '@components/common';

const PromptList = () => {
  const { prompts, isLoading, error, fetchPrompts } = usePromptStore();

  useEffect(() => {
    fetchPrompts();
  }, [fetchPrompts]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-danger-900 border border-danger-700 text-danger-100 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (prompts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="text-4xl mb-3">📝</div>
        <h3 className="text-lg font-semibold text-neutral-50 mb-2">
          No Prompts Yet
        </h3>
        <p className="text-neutral-400">
          Create your first prompt to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      {prompts.map((prompt) => (
        <Card
          key={prompt._id}
          hoverable
          className="cursor-pointer transition-all"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="font-semibold text-neutral-50">
                {prompt.title}
              </h3>
              <p className="text-sm text-neutral-400 line-clamp-2">
                {prompt.description}
              </p>
              {prompt.tags && prompt.tags.length > 0 && (
                <div className="flex gap-1 mt-2 flex-wrap">
                  {prompt.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-neutral-700 text-neutral-300 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {prompt.tags.length > 2 && (
                    <span className="text-xs text-neutral-400">
                      +{prompt.tags.length - 2}
                    </span>
                  )}
                </div>
              )}
            </div>
            <button className="flex-shrink-0 px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary-dark transition-colors">
              Use
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PromptList;
