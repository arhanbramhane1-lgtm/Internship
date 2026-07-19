import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import StarRating from "../components/StarRating";
import SkeletonCard from "../components/SkeletonCard";

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(`https://fakestoreapi.com/products/${id}`);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [qty, setQty] = useState(1);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-2 gap-14">
        <SkeletonCard />
        <div className="space-y-4">
          <div className="h-4 w-24 bg-surface2 animate-pulse" />
          <div className="h-10 w-3/4 bg-surface2 animate-pulse" />
          <div className="h-6 w-1/3 bg-surface2 animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 text-center">
        <p className="font-display text-2xl mb-3">This piece couldn't be found</p>
        <Link to="/products" className="gold-underline text-sm uppercase tracking-widest2">
          Back to collection
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
      <nav className="text-xs text-muted mb-10 tracking-wide">
        <Link to="/" className="hover:text-gold">Home</Link> /{" "}
        <Link to="/products" className="hover:text-gold">Products</Link> /{" "}
        <span className="text-ivory capitalize">{product.category}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-14">
        <div className="card-surface bg-white/95 flex items-center justify-center p-14 aspect-square">
          <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
        </div>

        <div>
          <p className="eyebrow mb-3 capitalize">{product.category}</p>
          <h1 className="font-display text-4xl leading-tight mb-4">{product.title}</h1>
          <StarRating rate={product.rating?.rate} count={product.rating?.count} />
          <p className="font-display text-3xl text-gold mt-6">${product.price?.toFixed(2)}</p>

          <div className="hairline my-8" />

          <p className="text-muted leading-relaxed">{product.description}</p>

          <div className="hairline my-8" />

          <div className="flex items-center gap-4 mb-8">
            <span className="eyebrow">Quantity</span>
            <div className="flex items-center border border-line">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-10 h-10 hover:text-gold"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-10 text-center">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-10 h-10 hover:text-gold"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => addToCart(product, qty)} className="btn-gold flex-1">
              Add to bag
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`btn-outline flex-1 ${wishlisted ? "border-gold text-gold" : ""}`}
            >
              {wishlisted ? "Saved ♥" : "Save to wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
