import React from 'react';
import { Product } from '../api/fakestore';
import ProductCard from './ProductCard';
import '../styles/product-card.css';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick }) => {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <h3>No products found</h3>
        <p>Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onClick={onProductClick} />
      ))}
    </div>
  );
};

export default ProductGrid;
