import React, { useEffect, useState } from 'react';
import { useCart } from '../hooks/useCart';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [isBouncing, setIsBouncing] = useState(false);

  // Trigger bounce animation when totalItems changes
  useEffect(() => {
    if (totalItems > 0) {
      setIsBouncing(true);
      const timer = setTimeout(() => setIsBouncing(false), 300);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <header className="navbar">
      <a href="/" className="navbar-brand">
        ShopContext
      </a>
      
      <div className="navbar-actions">
        <ThemeToggle />
        
        <button 
          className="cart-toggle" 
          onClick={() => setIsCartOpen(true)}
          aria-label="Open Cart"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          
          {totalItems > 0 && (
            <span className={`cart-badge ${isBouncing ? 'animate-bounce-subtle' : ''}`}>
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
