import React from 'react';
import { ThemeProvider } from './components/ThemeContext';
import { CartProvider } from './components/CartContext';
import { WishlistProvider } from './components/WishlistContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="app-container">
            <Navbar />
            <HomePage />
            <Footer />
          </div>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
