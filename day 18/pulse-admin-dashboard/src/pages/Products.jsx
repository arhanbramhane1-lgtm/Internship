import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import SearchBar from '../components/SearchBar';
import '../styles/products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Custom Filters & Sorting State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('default');
  
  // Link search state from Layout Outlet context
  const { searchValue, setSearchValue } = useOutletContext();

  const fetchProducts = () => {
    setLoading(true);
    setError(null);
    fetch('https://fakestoreapi.com/products')
      .then((res) => {
        if (!res.ok) throw new Error('API server returned a failed catalog response.');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Dynamically extract categories from products
  const categories = ['all', ...new Set(products.map((p) => p.category))];

  // Filtering Logic
  let filteredProducts = products.filter((product) => {
    const queryMatch = product.title.toLowerCase().includes(searchValue.toLowerCase()) || 
                       product.description?.toLowerCase().includes(searchValue.toLowerCase());
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    return queryMatch && categoryMatch;
  });

  // Sorting Logic
  if (selectedSort === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectedSort === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (selectedSort === 'rating') {
    filteredProducts.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
  }

  return (
    <div className="products-container animate-fade-in">
      <div className="products-header-actions">
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: '800' }}>
            Pulse Catalog
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
            View live pricing, client review counts, item categories, and inventory metrics.
          </p>
        </div>

        <div className="products-filter-wrapper">
          {/* Category Dropdown */}
          <select 
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          {/* Sort Dropdown */}
          <select
            className="filter-select"
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
          >
            <option value="default">Default Sorting</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Mobile view searchbar synchronization */}
      <div className="products-search-wrapper mobile-only-search">
        <SearchBar 
          value={searchValue} 
          onChange={setSearchValue} 
          placeholder="Filter catalog products..." 
        />
      </div>

      {loading ? (
        <Loading type="grid" />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchProducts} />
      ) : (
        <ProductGrid products={filteredProducts} />
      )}

      {/* Inject styling selectors to configure mobile layout */}
      <style>{`
        .mobile-only-search {
          display: none;
        }
        @media (max-width: 768px) {
          .mobile-only-search {
            display: block;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Products;
