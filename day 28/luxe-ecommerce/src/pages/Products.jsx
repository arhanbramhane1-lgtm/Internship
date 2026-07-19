import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 8;

const CATEGORY_LABELS = {
  "men's clothing": "Menswear",
  "women's clothing": "Womenswear",
  jewelery: "Jewelry",
  electronics: "Objects & Tech",
};

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: products, loading, error } = useFetch("https://fakestoreapi.com/products");
  const { data: categories } = useFetch("https://fakestoreapi.com/products/categories");

  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== "page") next.delete("page");
    setSearchParams(next);
  };

  const filtered = useMemo(() => {
    if (!products) return [];
    let result = [...products];
    if (category) result = result.filter((p) => p.category === category);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q));
    }
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating.rate - a.rating.rate);
    return result;
  }, [products, category, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
      <p className="eyebrow mb-3">The full collection</p>
      <h1 className="font-display text-4xl mb-10">
        {category ? CATEGORY_LABELS[category] || category : "All Products"}
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Filters sidebar */}
        <aside className="lg:w-56 shrink-0 space-y-8">
          <div>
            <p className="eyebrow mb-4">Category</p>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => updateParam("category", "")}
                  className={`gold-underline ${!category ? "text-gold active" : "text-muted"}`}
                >
                  All
                </button>
              </li>
              {categories?.map((c) => (
                <li key={c}>
                  <button
                    onClick={() => updateParam("category", c)}
                    className={`gold-underline capitalize ${category === c ? "text-gold active" : "text-muted"}`}
                  >
                    {CATEGORY_LABELS[c] || c}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">Sort by</p>
            <select
              value={sort}
              onChange={(e) => updateParam("sort", e.target.value)}
              className="w-full bg-surface border border-line text-sm px-3 py-2 focus:border-gold outline-none"
            >
              <option value="">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
          {search && (
            <div>
              <p className="eyebrow mb-2">Search</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted truncate">"{search}"</span>
                <button onClick={() => updateParam("search", "")} className="text-gold ml-2">✕</button>
              </div>
            </div>
          )}
        </aside>

        {/* Grid */}
        <div className="flex-1">
          {error && <p className="text-red-300 text-sm">Couldn't load products. Please try again.</p>}

          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="font-display text-2xl mb-2">No pieces found</p>
              <p className="text-muted text-sm">Try a different category or search term.</p>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
              : pageItems.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>

          {!loading && (
            <Pagination page={page} totalPages={totalPages} onChange={(p) => updateParam("page", p)} />
          )}
        </div>
      </div>
    </div>
  );
}
