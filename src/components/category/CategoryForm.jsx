/**
 * Category Form Component (Placeholder)
 * 
 * Path: src/components/category/CategoryForm.jsx
 */

import React from 'react';
import { Card, Button, Input } from '@components/common';

const CategoryForm = () => {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-neutral-50 mb-4">
        Create Category
      </h3>
      <div className="space-y-3">
        <Input label="Category Name" placeholder="e.g., AI Prompts" />
        <Button>Create</Button>
      </div>
    </Card>
  );
};

export default CategoryForm;
