import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products — Routely" },
      { name: "description", content: "Browse our catalog — each card links to a dynamic /products/:id detail page." },
      { property: "og:title", content: "Products — Routely" },
      { property: "og:description", content: "Explore a catalog powered by dynamic routes." },
    ],
  }),
  component: Products,
});

function Products() {
  return (
    <Layout>
      <section className="page-hero">
        <span className="hero-pill">Catalog</span>
        <h1>Featured <span className="grad-text">products</span></h1>
        <p>Each "View Details" opens a dynamic route: <code>/products/:id</code>.</p>
      </section>

      <section className="section">
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
