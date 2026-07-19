import { useState } from "react";

function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  const handleAddToCart = () => {
    if (!product.inStock) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className={`product-card ${!product.inStock ? "out-of-stock" : ""}`}>
      <div className="image-wrapper">
        <img src={product.image} alt={product.name} />
        {discount > 0 && <span className="badge">-{discount}%</span>}
        <button
          className={`like-btn ${liked ? "liked" : ""}`}
          onClick={() => setLiked(!liked)}
          aria-label="Add to wishlist"
        >
          ♥
        </button>
        {!product.inStock && <div className="stock-overlay">Out of Stock</div>}
      </div>

      <div className="card-body">
        <span className="category">{product.category}</span>
        <h3 className="name">{product.name}</h3>

        <div className="rating">
          {"★".repeat(Math.round(product.rating))}
          {"☆".repeat(5 - Math.round(product.rating))}
          <span className="rating-value">({product.rating})</span>
        </div>

        <div className="price-row">
          <span className="price">₹{product.price.toLocaleString()}</span>
          <span className="old-price">₹{product.oldPrice.toLocaleString()}</span>
        </div>

        <button
          className={`add-btn ${added ? "added" : ""}`}
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {!product.inStock ? "Unavailable" : added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;