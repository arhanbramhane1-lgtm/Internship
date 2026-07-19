// Link is used for in-app navigation without page reload
import { Link } from "react-router-dom";
import "./Home.css";

/**
 * Home Page
 * - Hero section with CTAs using Link for client-side navigation
 * - Navigation cards linking to About, Products, Contact
 * - Tech stack pills
 * - Floating decorative elements
 */
const Home = () => {
  const navCards = [
    {
      to: "/about",
      icon: "💡",
      title: "About",
      desc: "Learn about React Router concepts, client-side routing, and the architecture behind this dashboard.",
      gradient: "linear-gradient(135deg, #7c3aed, #4361ee)",
    },
    {
      to: "/products",
      icon: "🛍️",
      title: "Products",
      desc: "Explore our premium product catalog with dynamic routing — each product has its own detail page.",
      gradient: "linear-gradient(135deg, #f72585, #7209b7)",
    },
    {
      to: "/contact",
      icon: "✉️",
      title: "Contact",
      desc: "Get in touch using our modern, validated contact form with instant success feedback.",
      gradient: "linear-gradient(135deg, #4cc9f0, #4361ee)",
    },
  ];

  const techStack = [
    { icon: "⚛️", label: "React 18" },
    { icon: "🚦", label: "React Router DOM" },
    { icon: "⚡", label: "Vite" },
    { icon: "🎨", label: "Modern CSS" },
    { icon: "📱", label: "Responsive Design" },
    { icon: "🔀", label: "Dynamic Routes" },
    { icon: "🧩", label: "Component Architecture" },
    { icon: "🌙", label: "Dark/Light Mode" },
  ];

  return (
    <main className="page-enter">
      {/* ── Hero Section ── */}
      <section className="home-hero" aria-labelledby="hero-heading">
        {/* Decorative floating shapes */}
        <div className="hero-decoration hero-decoration-1" aria-hidden="true" />
        <div className="hero-decoration hero-decoration-2" aria-hidden="true" />
        <div className="hero-decoration hero-decoration-3" aria-hidden="true" />

        <div className="hero-content">
          <div className="hero-eyebrow">
            <span>🎓</span> Frontend Internship — Day 20 Project
          </div>

          <h1 className="hero-title" id="hero-heading">
            React Router
            <span className="line-2">Navigation Dashboard</span>
          </h1>

          <p className="hero-subtitle">
            A professional demonstration of React Router DOM — featuring client-side
            routing, dynamic routes, NavLink active states, and modern glassmorphism
            design.
          </p>

          <div className="hero-actions">
            {/* Link navigates client-side — no full page reload */}
            <Link to="/products" className="btn-primary" id="hero-cta-products">
              🛍️ Explore Products
            </Link>
            <Link to="/about" className="btn-ghost" id="hero-cta-about">
              Learn More →
            </Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">6+</div>
              <div className="hero-stat-label">Pages / Routes</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">6</div>
              <div className="hero-stat-label">Products</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">100%</div>
              <div className="hero-stat-label">Client-Side</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">∞</div>
              <div className="hero-stat-label">Dynamic Routes</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Navigation Cards Section ── */}
      <section className="home-nav-cards" aria-label="Navigate to pages">
        <div className="section-container">
          <div className="section-label">🗺️ Explore</div>
          <h2 className="section-title">
            Where do you want to <span className="gradient-text">go?</span>
          </h2>
          <p className="section-subtitle">
            Navigate between pages seamlessly — all powered by React Router's
            client-side routing. Zero page reloads.
          </p>

          <div className="nav-cards-grid">
            {navCards.map(({ to, icon, title, desc, gradient }) => (
              <Link
                key={to}
                to={to}
                className="nav-card"
                style={{ "--card-gradient": gradient }}
                aria-label={`Go to ${title} page`}
              >
                <div className="nav-card-icon">{icon}</div>
                <h3 className="nav-card-title">{title}</h3>
                <p className="nav-card-desc">{desc}</p>
                <span className="nav-card-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="home-tech" aria-label="Tech stack">
        <div className="section-label">🛠️ Built With</div>
        <h2 className="section-title">
          The <span className="gradient-text">Tech Stack</span>
        </h2>
        <p className="section-subtitle">
          Modern tools chosen for performance, developer experience, and
          production quality.
        </p>
        <div className="tech-pills">
          {techStack.map(({ icon, label }) => (
            <div key={label} className="tech-pill">
              <span>{icon}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
