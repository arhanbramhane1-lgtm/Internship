import React from 'react';
import { useTheme } from './ThemeContext';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';
import '../styles/navbar.css';

const Navbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const { totalWishlistItems } = useWishlist();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">Lumina Store</div>
        <div className="navbar-actions">
          <button className="icon-button" onClick={toggleTheme} aria-label="Toggle theme">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button className="icon-button" aria-label="Wishlist">
            ♥
            {totalWishlistItems > 0 && <span className="badge">{totalWishlistItems}</span>}
          </button>
          <button className="icon-button" aria-label="Cart">
            🛒
            {totalItems > 0 && <span className="badge">{totalItems}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
