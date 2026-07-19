import React from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { CartSidebar } from './components/CartSidebar';
import { ProductCard } from './components/ProductCard';
import { products } from './data/products';

function AppContent() {
  return (
    <>
      <Navbar />
      
      <main>
        <div className="page-header">
          <h2>Featured Products</h2>
          <p>Discover our premium selection of curated goods.</p>
        </div>
        
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      
      <footer>
        Created by Arhan Bramhane
      </footer>
      
      <CartSidebar />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;