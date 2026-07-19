import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Routely — React Router Navigation Dashboard" },
      { name: "description", content: "A premium React Router demo: dynamic routes, active navigation, product details, and glassmorphism UI." },
      { property: "og:title", content: "Routely — React Router Navigation Dashboard" },
      { property: "og:description", content: "Premium routing demo with dynamic pages, dark mode, and modern UI." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <Layout>
      <section className="hero">
        <img src={heroImg} alt="" className="hero-bg" width={1600} height={900} />
        <div className="hero-veil" />
        <div className="hero-inner">
          <span className="hero-pill">✦ Day 20 · React Router Task</span>
          <h1 className="hero-title">
            Navigate with <span className="grad-text">intention</span>.
            <br />Ship with confidence.
          </h1>
          <p className="hero-sub">
            A polished navigation dashboard demonstrating client-side routing,
            dynamic routes, and component-driven architecture — wrapped in a
            glassmorphism UI you'd be proud to show at a review.
          </p>
          <div className="hero-cta">
            <Link to="/products" className="btn btn-primary btn-lg">Explore Products</Link>
            <Link to="/about" className="btn btn-ghost btn-lg">Learn more</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Where do you want to go?</h2>
          <p>Every card is a route. Every route is instant.</p>
        </div>
        <div className="nav-grid">
          {[
            { to: "/about", title: "About", desc: "The story behind Routely & the routing concepts inside.", icon: "◐" },
            { to: "/products", title: "Products", desc: "Browse a catalog powered by dynamic `/products/:id` routes.", icon: "◆" },
            { to: "/contact", title: "Contact", desc: "Say hello with a validated, animated contact form.", icon: "✎" },
          ].map((c) => (
            <Link key={c.to} to={c.to} className="nav-card">
              <span className="nav-card-icon">{c.icon}</span>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <span className="nav-card-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
