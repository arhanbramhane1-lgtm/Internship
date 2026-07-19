import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Routely" },
      { name: "description", content: "About Routely: a demonstration of client-side routing, dynamic routes, and component-based architecture in React." },
      { property: "og:title", content: "About — Routely" },
      { property: "og:description", content: "Learn the routing concepts powering this navigation dashboard." },
    ],
  }),
  component: About,
});

function About() {
  const concepts = [
    {
      icon: "⚡",
      title: "Client-side routing",
      body: "Navigation happens in the browser — no full-page reloads. The router swaps views instantly while the shell stays mounted.",
    },
    {
      icon: "🧭",
      title: "Dynamic routes",
      body: "Routes like /products/:id capture URL params so a single component can render any product from your data source.",
    },
    {
      icon: "🧱",
      title: "Component architecture",
      body: "Pages are composed from small, reusable components — Navbar, ProductCard, Footer — each with one clear job.",
    },
  ];

  return (
    <Layout>
      <section className="page-hero">
        <span className="hero-pill">About the project</span>
        <h1>Built to make routing feel <span className="grad-text">effortless</span>.</h1>
        <p>
          Routely is a Day 20 internship task turned into a portfolio-worthy demo.
          It showcases how a modern React app organizes navigation, dynamic
          content, and UI polish into a coherent experience.
        </p>
      </section>

      <section className="section">
        <div className="concept-grid">
          {concepts.map((c) => (
            <div key={c.title} className="concept-card">
              <div className="concept-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="glass-panel">
          <h2>The stack</h2>
          <ul className="stack-list">
            <li><strong>React 19</strong> — component model</li>
            <li><strong>TanStack Router</strong> — file-based, type-safe routing (React Router equivalent)</li>
            <li><strong>Vite 7</strong> — instant dev server & builds</li>
            <li><strong>Modern CSS</strong> — custom tokens, glassmorphism, gradients</li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}
