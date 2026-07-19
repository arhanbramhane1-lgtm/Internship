import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <div className="product-media">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-body">
        <h3>{product.name}</h3>
        <p className="product-tag">{product.tagline}</p>
        <div className="product-foot">
          <span className="product-price">${product.price}</span>
          {/* Dynamic route: /products/:id — TanStack uses `$id` as the param */}
          <Link
            to="/products/$id"
            params={{ id: String(product.id) }}
            className="btn btn-primary"
          >
            View Details →
          </Link>
        </div>
      </div>
    </article>
  );
}
