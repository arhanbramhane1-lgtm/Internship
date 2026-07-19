import React from 'react';
import { useCart } from '../hooks/useCart';
import { CartItemType } from '../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div className="cart-item animate-fade-in">
      <img 
        src={product.image} 
        alt={product.name} 
        className="cart-item-image" 
      />
      <div className="cart-item-details">
        <h4 className="cart-item-name" title={product.name}>
          {product.name}
        </h4>
        <div className="cart-item-price">
          ${product.price.toFixed(2)}
        </div>
        <div className="cart-item-actions">
          <div className="qty-controls">
            <button 
              className="qty-btn" 
              onClick={() => decreaseQuantity(product.id)}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="qty-value">{quantity}</span>
            <button 
              className="qty-btn" 
              onClick={() => increaseQuantity(product.id)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button 
            className="btn-remove"
            onClick={() => removeFromCart(product.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};