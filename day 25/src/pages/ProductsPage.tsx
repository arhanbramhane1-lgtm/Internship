import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

export function ProductsPage() {
  return (
    <div className="container">
      <header className="page-header">
        <div>
          <h1 className="page-title">Curated Essentials</h1>
          <p className="page-subtitle">Premium picks, thoughtfully designed for everyday life.</p>
        </div>
      </header>
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
