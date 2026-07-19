import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-28 text-center">
        <p className="font-display text-3xl mb-3">Your wishlist is empty</p>
        <p className="text-muted mb-8">Save pieces you love to find them here later.</p>
        <Link to="/products" className="btn-gold inline-block">Explore the collection</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
      <p className="eyebrow mb-3">Saved for later</p>
      <h1 className="font-display text-4xl mb-12">Wishlist</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
