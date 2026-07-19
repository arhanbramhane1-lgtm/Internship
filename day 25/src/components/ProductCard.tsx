import { Heart, Plus, Star } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const wished = wishlist.includes(product.id);

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.title} loading="lazy" />
        <button
          className={`wish-btn ${wished ? "active" : ""}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label="Add to wishlist"
        >
          <Heart size={18} fill={wished ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="product-body">
        <span className="product-cat">{product.category}</span>
        <h3 className="product-title">{product.title}</h3>
        <div className="product-meta">
          <span className="price">${product.price.toFixed(2)}</span>
          <span className="rating">
            <Star size={14} fill="currentColor" />
            {product.rating}
          </span>
        </div>
        <button className="btn btn-primary add-btn" onClick={() => addToCart(product)}>
          <Plus size={16} />
          Add to Cart
        </button>
      </div>
    </article>
  );
}
