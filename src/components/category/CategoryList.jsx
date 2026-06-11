/**
 * Category List Component (Placeholder)
 * 
 * Path: src/components/category/CategoryList.jsx
 */

import React from 'react';
import { Card } from '@components/common';

const CategoryList = () => {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-neutral-50 mb-4">
        Categories
      </h3>
      <div className="space-y-2">
        <Card className="p-3">
          <p className="text-neutral-400">No categories yet</p>
        </Card>
      </div>
    </div>
  );
};

export default CategoryList;
