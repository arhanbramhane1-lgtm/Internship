import React, { useEffect } from 'react';
import { Product } from '../api/fakestore';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';
import '../styles/modal.css';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToCart = () => {
    addToCart(product.id);
  };

  const isWished = isInWishlist(product.id);

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ×
        </button>
        <div className="modal-body">
          <div className="modal-image-container">
            <img src={product.image} alt={product.title} className="modal-image" />
          </div>
          <div className="modal-details">
            <span className="modal-category">{product.category}</span>
            <h2 className="modal-title">{product.title}</h2>
            <div className="modal-rating">
              <span className="stars">
                {'★'.repeat(Math.round(product.rating.rate))}
                {'☆'.repeat(5 - Math.round(product.rating.rate))}
              </span>
              <span>{product.rating.rate} ({product.rating.count} reviews)</span>
            </div>
            <div className="modal-price">${product.price.toFixed(2)}</div>
            <p className="modal-description">{product.description}</p>
            <div className="modal-actions">
              <button className="btn-primary" onClick={handleAddToCart}>
                🛒 Add to Cart
              </button>
              <button 
                className={`btn-secondary ${isWished ? 'active' : ''}`} 
                onClick={() => toggleWishlist(product.id)}
                aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
              >
                {isWished ? '♥ Saved' : '♡ Wishlist'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
