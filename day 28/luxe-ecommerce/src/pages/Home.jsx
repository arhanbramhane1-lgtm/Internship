import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";

const CATEGORY_LABELS = {
  "men's clothing": "Menswear",
  "women's clothing": "Womenswear",
  jewelery: "Jewelry",
  electronics: "Objects & Tech",
};

export default function Home() {
  const { data: products, loading } = useFetch("https://fakestoreapi.com/products");
  const featured = products ? [...products].sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 4) : [];
  const categories = ["men's clothing", "women's clothing", "jewelery", "electronics"];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-28 lg:py-36 grid lg:grid-cols-2 gap-14 items-center">
          <div className="animate-fadeUp">
            <p className="eyebrow mb-6">The Autumn Edit — 01</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] italic">
              Objects worth
              <br />
              <span className="not-italic text-gold">keeping.</span>
            </h1>
            <p className="mt-7 text-muted max-w-md leading-relaxed">
              A small, considered collection — chosen not for trend, but for how
              each piece earns its place in a life well lived.
            </p>
            <div className="mt-9 flex gap-4">
              <Link to="/products" className="btn-gold">Explore the collection</Link>
              <Link to="/products?sort=rating" className="btn-outline">Best rated</Link>
            </div>
          </div>
          <div className="relative h-[420px] hidden lg:block">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 rounded-full bg-gold/10 blur-3xl" />
            </div>
            {featured[0] && (
              <img
                src={featured[0].image}
                alt={featured[0].title}
                className="relative z-10 w-full h-full object-contain p-10 drop-shadow-2xl"
              />
            )}
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent animate-drawline" />
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <p className="eyebrow mb-3">Browse by category</p>
        <h2 className="font-display text-3xl mb-10">Shop the edit</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((c) => (
            <Link
              key={c}
              to={`/products?category=${encodeURIComponent(c)}`}
              className="group card-surface p-8 flex flex-col justify-between h-40 hover:border-gold/60 transition-colors"
            >
              <span className="text-3xl text-gold/70 group-hover:text-gold transition-colors">§</span>
              <span className="font-display text-xl">{CATEGORY_LABELS[c] || c}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 border-t border-line">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow mb-3">Highest rated</p>
            <h2 className="font-display text-3xl">Most loved pieces</h2>
          </div>
          <Link to="/products" className="gold-underline text-sm uppercase tracking-widest2 hidden sm:inline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Editorial band — signature element */}
      <section className="border-t border-line bg-surface">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-24 text-center">
          <p className="eyebrow mb-6">Our promise</p>
          <p className="font-display text-3xl lg:text-4xl italic leading-snug">
            "We'd rather sell you one thing you'll keep for ten years
            than ten things you'll keep for one."
          </p>
          <div className="w-16 h-px bg-gold mx-auto mt-8" />
        </div>
      </section>
    </div>
  );
}
