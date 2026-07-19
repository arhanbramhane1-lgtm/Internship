import React, { useState } from 'react';
import { Product } from '../data/products';
import { useCart } from '../hooks/useCart';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const cartItem = cartItems.find(item => item.product.id === product.id);
  const inCart = !!cartItem;
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
      </div>
      
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-rating">
          {/* Render 5 stars, filled based on rating (simplified for UI) */}
          {[1, 2, 3, 4, 5].map((star) => (
            <svg 
              key={star} 
              width="14" height="14" 
              viewBox="0 0 24 24" 
              fill={star <= Math.round(product.rating) ? "currentColor" : "none"} 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{ color: star <= Math.round(product.rating) ? '#fbbf24' : 'var(--color-border)' }}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          ))}
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginLeft: '4px' }}>
            {product.rating}
          </span>
        </div>
        
        <p className="product-description">{product.description}</p>
        
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          
          {inCart ? (
            <div className="qty-controls">
              <button 
                className="qty-btn" 
                onClick={() => decreaseQuantity(product.id)}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="qty-value animate-pulse">{quantity}</span>
              <button 
                className="qty-btn" 
                onClick={() => increaseQuantity(product.id)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          ) : (
            <button 
              className={`btn-add-cart ${justAdded ? 'added' : ''}`} 
              onClick={handleAddToCart}
            >
              {justAdded ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Added
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Add to Cart
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};