// useNavigate allows programmatic navigation (used for "View Details" button)
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

/**
 * ProductCard Component
 * Renders a single product card with image, name, rating, price, and a
 * "View Details" button that uses useNavigate to go to /products/:id
 */
const ProductCard = ({ product }) => {
  // useNavigate hook — navigate programmatically on button click
  const navigate = useNavigate();

  const handleViewDetails = () => {
    // Navigate to the dynamic route /products/:id
    navigate(`/products/${product.id}`);
  };

  // Render filled/empty stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i}>{i < Math.floor(rating) ? "★" : "☆"}</span>
    ));
  };

  return (
    <article className="product-card" aria-label={product.name}>
      {/* Product Image */}
      <div className="product-card-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span
          className="product-card-badge"
          style={{ background: product.color }}
        >
          {product.badge}
        </span>
        <span className="product-card-category">{product.category}</span>
      </div>

      {/* Card Body */}
      <div className="product-card-body">
        <h3 className="product-card-name">{product.name}</h3>

        <div className="product-card-rating">
          <div className="stars" aria-label={`${product.rating} out of 5 stars`}>
            {renderStars(product.rating)}
          </div>
          <span className="rating-count">
            {product.rating} ({product.reviews.toLocaleString()} reviews)
          </span>
        </div>

        <div className="product-card-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          {/* useNavigate-powered button — dynamic route navigation */}
          <button
            className="product-card-btn"
            onClick={handleViewDetails}
            aria-label={`View details for ${product.name}`}
            id={`view-details-${product.id}`}
          >
            View Details →
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
