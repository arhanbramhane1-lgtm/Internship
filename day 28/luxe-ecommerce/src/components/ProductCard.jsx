import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import StarRating from "./StarRating";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="group card-surface transition-colors duration-300 hover:border-gold/60">
      <div className="relative aspect-[4/5] overflow-hidden bg-white/95">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        <button
          onClick={() => toggleWishlist(product)}
          aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
          aria-pressed={wishlisted}
          className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center border transition-colors duration-300 ${
            wishlisted
              ? "bg-gold border-gold text-obsidian"
              : "bg-obsidian/70 border-line text-ivory hover:border-gold hover:text-gold"
          }`}
        >
          {wishlisted ? "♥" : "♡"}
        </button>
      </div>
      <div className="p-4">
        <p className="eyebrow mb-1">{product.category}</p>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-display text-lg leading-snug line-clamp-2 hover:text-gold transition-colors">
            {product.title}
          </h3>
        </Link>
        <div className="mt-2">
          <StarRating rate={product.rating?.rate} count={product.rating?.count} />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-display text-xl text-gold">${product.price?.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="text-xs uppercase tracking-widest2 border border-line px-3 py-2 hover:border-gold hover:text-gold transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
