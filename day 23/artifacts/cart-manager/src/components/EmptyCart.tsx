import React from 'react';
import { useCart } from '../hooks/useCart';

export const EmptyCart: React.FC = () => {
  const { setIsCartOpen } = useCart();

  return (
    <div className="empty-cart">
      <div className="empty-cart-illustration">
        🛒
      </div>
      <p>Your cart is empty.</p>
      <button 
        className="btn-start-shopping"
        onClick={() => setIsCartOpen(false)}
      >
        Start Shopping
      </button>
    </div>
  );
};