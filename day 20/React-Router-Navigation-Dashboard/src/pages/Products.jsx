import { useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import "./Products.css";

/**
 * Products Page
 * - Displays all products in a responsive grid using ProductCard component
 * - Category filter bar to filter by product type
 * - ProductCard uses useNavigate internally to go to /products/:id
 */
const Products = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  // Extract unique categories from products data
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filter products based on active category
  const filteredProducts =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <main className="page-enter">
      <div className="products-page">
        {/* Header */}
        <header className="products-header">
          <div className="section-label">🛍️ Our Catalog</div>
          <h1 className="section-title" id="products-heading">
            Premium <span className="gradient-text">Products</span>
          </h1>
          <p className="section-subtitle">
            Browse our curated collection. Each product links to a dynamic route
            at <code style={{ color: "var(--accent-purple)" }}>/products/:id</code>
          </p>

          {/* Category Filters */}
          <nav className="products-filters" aria-label="Product category filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
                onClick={() => setActiveFilter(cat)}
                aria-pressed={activeFilter === cat}
                id={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </header>

        <p className="products-count">
          Showing <strong>{filteredProducts.length}</strong> product
          {filteredProducts.length !== 1 ? "s" : ""}
          {activeFilter !== "All" ? ` in "${activeFilter}"` : ""}
        </p>

        {/* Products Grid — each ProductCard navigates to /products/:id */}
        <div className="products-grid" role="list" aria-label="Product list">
          {filteredProducts.map((product) => (
            <div key={product.id} role="listitem">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Products;
