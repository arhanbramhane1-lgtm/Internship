import React from 'react';
import { Product } from '../api/fakestore';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';
import '../styles/product-card.css';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product.id);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const isWished = isInWishlist(product.id);

  return (
    <div className="product-card" onClick={() => onClick(product)}>
      <button 
        className={`wishlist-button ${isWished ? 'active' : ''}`}
        onClick={handleToggleWishlist}
        aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
      >
        {isWished ? '♥' : '♡'}
      </button>
      <div className="product-card-image-container">
        <img src={product.image} alt={product.title} className="product-card-image" loading="lazy" />
      </div>
      <div className="product-card-content">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.title}</h3>
        <div className="product-rating">
          <span className="stars">
            {'★'.repeat(Math.round(product.rating.rate))}
            {'☆'.repeat(5 - Math.round(product.rating.rate))}
          </span>
          <span>({product.rating.count})</span>
        </div>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button 
            className="add-to-cart-btn" 
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
