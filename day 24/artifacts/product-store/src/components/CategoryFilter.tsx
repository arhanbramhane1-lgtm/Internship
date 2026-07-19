import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onChange }) => {
  return (
    <select
      className="category-select"
      value={selectedCategory}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="all">All Categories</option>
      {categories.map(category => (
        <option key={category} value={category}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
