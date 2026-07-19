import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import '../styles/products.css';

const ProductGrid = ({ products }) => {
  
  // Render stars based on rating rate out of 5
  const renderStars = (rate = 0) => {
    const stars = [];
    const roundedRate = Math.round(rate);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i} 
          style={{ 
            color: i <= roundedRate ? 'var(--warning-color)' : 'rgba(255, 255, 255, 0.15)',
            fontSize: '15px',
            marginRight: '2px'
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  if (products.length === 0) {
    return (
      <div 
        className="card" 
        style={{ 
          textAlign: 'center', 
          padding: '60px 24px', 
          color: 'var(--text-secondary)' 
        }}
      >
        <span style={{ fontSize: '15px' }}>
          No matching products discovered. Adjust your filters or search terms.
        </span>
      </div>
    );
  }

  return (
    <div className="products-grid animate-fade-in">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <div className="product-img-wrapper">
            <img 
              src={product.image} 
              alt={product.title} 
              className="product-img"
              loading="lazy"
            />
            <span className="product-category-tag">
              {product.category}
            </span>
          </div>

          <div className="product-card-body">
            <h3 className="product-title" title={product.title}>
              {product.title}
            </h3>

            <div className="product-rating-row">
              <div className="product-stars">
                {renderStars(product.rating?.rate)}
              </div>
              <span className="product-rating-text">
                {product.rating?.rate || 0} 
                <span className="product-rating-count">
                  ({product.rating?.count || 0})
                </span>
              </span>
            </div>

            <div className="product-footer">
              <span className="product-price">
                ${product.price.toFixed(2)}
              </span>
              <button 
                className="product-buy-btn"
                onClick={() => alert(`Purchased ${product.title} for $${product.price}`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <FiShoppingCart />
                <span>Buy</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
