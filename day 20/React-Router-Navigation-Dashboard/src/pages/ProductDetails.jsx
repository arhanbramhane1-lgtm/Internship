// useParams reads the :id from /products/:id
// useNavigate allows going back programmatically
import { useParams, useNavigate, Link } from "react-router-dom";
import { products } from "../data/products";
import "./ProductDetails.css";

/**
 * ProductDetails Page — Dynamic Route: /products/:id
 *
 * Key React Router concepts demonstrated:
 * - useParams() extracts the :id segment from the URL
 * - useNavigate() enables the "Back" button
 * - Link renders breadcrumb navigation
 */
const ProductDetails = () => {
  // useParams — reads URL params from the matched route (/products/:id)
  const { id } = useParams();

  // useNavigate — returns a navigate function for programmatic routing
  const navigate = useNavigate();

  // Find the product by matching the URL id with product data
  const product = products.find((p) => p.id === parseInt(id, 10));

  // Render stars helper
  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i}>{i < Math.floor(rating) ? "★" : "☆"}</span>
    ));

  // Handle product not found
  if (!product) {
    return (
      <main className="page-enter">
        <div className="product-details-page">
          <div className="product-not-found">
            <div className="product-not-found-emoji">🔍</div>
            <h1>Product Not Found</h1>
            <p style={{ color: "var(--text-secondary)" }}>
              No product found with ID: <strong>{id}</strong>
            </p>
            <button
              className="btn-primary"
              onClick={() => navigate("/products")}
              id="not-found-back"
            >
              ← Back to Products
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page-enter">
      <div className="product-details-page">
        {/* Breadcrumb — Link for client-side navigation */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <Link to="/products" className="breadcrumb-link">Products</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        <div className="product-details-grid">
          {/* Product Image */}
          <div className="product-details-image">
            <img src={product.image} alt={product.name} />
          </div>

          {/* Product Info */}
          <div className="product-details-info">
            {/* Badges */}
            <div className="product-details-badges">
              <span
                className="badge"
                style={{ background: product.color, color: "#fff" }}
              >
                {product.badge}
              </span>
              <span
                className="badge"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--glass-border)",
                  color: "var(--text-secondary)",
                }}
              >
                {product.category}
              </span>
            </div>

            {/* Name */}
            <h1 className="product-details-name">{product.name}</h1>

            {/* Rating */}
            <div className="product-details-rating">
              <div className="product-details-stars" aria-label={`${product.rating} stars`}>
                {renderStars(product.rating)}
              </div>
              <span className="product-details-rating-text">{product.rating}</span>
              <span className="product-details-reviews">
                ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="product-details-price">${product.price.toFixed(2)}</div>

            {/* Description */}
            <p className="product-details-desc">{product.description}</p>

            {/* Features */}
            <div className="product-features">
              <div className="product-features-title">Key Features</div>
              {product.features.map((feat) => (
                <div key={feat} className="product-feature-item">
                  <div className="feature-check">✓</div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="product-actions">
              <button
                className="btn-primary"
                id={`add-to-cart-${product.id}`}
                onClick={() => alert(`Added "${product.name}" to cart!`)}
              >
                🛒 Add to Cart
              </button>
              {/* useNavigate to go back to products list */}
              <button
                className="btn-ghost"
                id={`back-to-products-${product.id}`}
                onClick={() => navigate("/products")}
              >
                ← Back
              </button>
            </div>

            {/* URL Info — educational note */}
            <div
              style={{
                padding: "12px 16px",
                background: "rgba(124, 58, 237, 0.06)",
                border: "1px solid rgba(124, 58, 237, 0.2)",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.8rem",
                color: "var(--text-secondary)",
                fontFamily: "monospace",
              }}
            >
              🚦 <strong>Dynamic Route:</strong>{" "}
              <code style={{ color: "var(--accent-purple)" }}>
                /products/{id}
              </code>{" "}
              — ID extracted with <code style={{ color: "var(--accent-purple)" }}>useParams()</code>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
