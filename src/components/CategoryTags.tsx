import React from 'react';

interface CategoryTagsProps {
  categories: string[];
  categoryData: Array<{ id: string; name: string }>;
}

export function CategoryTags({ categories, categoryData }: CategoryTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(categoryId => {
        const category = categoryData.find(c => c.id === categoryId);
        return category ? (
          <span
            key={categoryId}
            className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 
              text-gray-600 dark:text-gray-300"
          >
            {category.name}
          </span>
        ) : null;
      })}
    </div>
  );
}