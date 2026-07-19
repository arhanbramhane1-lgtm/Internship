import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Loader } from "@/components/Loader";
import { products } from "@/data/products";

/**
 * Dynamic route: /products/$id
 * Equivalent to React Router's /products/:id
 * Access the param with Route.useParams() (TanStack) — the analog of useParams().
 */
export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === Number(params.id));
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Routely` },
          { name: "description", content: loaderData.product.tagline },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:description", content: loaderData.product.tagline },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [{ title: "Product — Routely" }],
  }),
  pendingComponent: () => (
    <Layout><Loader label="Loading product" /></Layout>
  ),
  notFoundComponent: () => (
    <Layout>
      <div className="page-hero">
        <h1>Product not found</h1>
        <p>We couldn't find that product in the catalog.</p>
        <Link to="/products" className="btn btn-primary">Back to products</Link>
      </div>
    </Layout>
  ),
  component: ProductDetails,
});

function ProductDetails() {
  const { product } = Route.useLoaderData();
  // useNavigate: programmatic navigation (React Router's hook of the same name)
  const navigate = useNavigate();

  return (
    <Layout>
      <section className="section">
        <button className="btn btn-ghost" onClick={() => navigate({ to: "/products" })}>
          ← Back to products
        </button>

        <div className="detail-grid">
          <div className="detail-media glass-panel">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="detail-body">
            <span className="hero-pill">Product #{product.id}</span>
            <h1>{product.name}</h1>
            <p className="detail-tag">{product.tagline}</p>
            <div className="detail-price">${product.price}</div>
            <p>{product.description}</p>
            <ul className="feature-list">
              {product.features.map((f: string) => (
                <li key={f}>✓ {f}</li>
              ))}
            </ul>
            <div className="detail-actions">
              <button className="btn btn-primary btn-lg">Add to cart</button>
              <Link to="/contact" className="btn btn-ghost btn-lg">Ask a question</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
