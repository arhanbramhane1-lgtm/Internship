import React from 'react';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating-desc';

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const SortSelect: React.FC<SortSelectProps> = ({ value, onChange }) => {
  return (
    <select
      className="sort-select"
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
    >
      <option value="default">Default Sort</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="name-asc">Name: A-Z</option>
      <option value="name-desc">Name: Z-A</option>
      <option value="rating-desc">Highest Rated</option>
    </select>
  );
};

export default SortSelect;
