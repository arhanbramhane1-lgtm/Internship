import React, { useState, useEffect, useMemo } from 'react';
import { Product, fetchProducts } from '../api/fakestore';
import ProductGrid from '../components/ProductGrid';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import SortSelect, { SortOption } from '../components/SortSelect';
import SkeletonCard from '../components/SkeletonCard';
import ErrorMessage from '../components/ErrorMessage';
import Pagination from '../components/Pagination';
import ProductModal from '../components/ProductModal';

const ITEMS_PER_PAGE = 12;

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters and Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortOption]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map(p => p.category));
    return Array.from(uniqueCategories);
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(query));
    }

    // Sort
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'default':
      default:
        // Keep original order
        break;
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortOption]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
  
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedProducts, currentPage]);

  return (
    <main className="main-content">
      <div className="controls-container">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <div className="filters-row">
          <CategoryFilter 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onChange={setSelectedCategory} 
          />
          <SortSelect value={sortOption} onChange={setSortOption} />
        </div>
      </div>

      {error ? (
        <ErrorMessage message={error} onRetry={loadProducts} />
      ) : loading ? (
        <div className="product-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <>
          <ProductGrid products={currentProducts} onProductClick={setSelectedProduct} />
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        </>
      )}

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </main>
  );
};

export default HomePage;
