import React, { useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { EmptyCart } from './EmptyCart';
import { CartItem } from './CartItem';

export const CartSidebar: React.FC = () => {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    totalItems, 
    totalPrice,
    clearCart 
  } = useCart();

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const handleCheckout = () => {
    alert(`Checkout complete! Total: $${totalPrice.toFixed(2)}`);
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`cart-overlay ${isCartOpen ? 'open' : ''}`} 
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />
      
      {/* Sidebar */}
      <aside className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Your Cart ({totalItems})</h3>
          <button 
            className="btn-close"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="cart-content">
          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            cartItems.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="cart-total-row">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="cart-actions">
              <button className="btn-clear" onClick={clearCart}>
                Clear
              </button>
              <button className="btn-checkout" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};