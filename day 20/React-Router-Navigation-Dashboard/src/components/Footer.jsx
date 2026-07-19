import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

/**
 * Footer Component
 * - Shared footer rendered on all pages via App.jsx layout
 * - Displays live date/time
 * - Contains quick navigation links using Link
 */
const Footer = () => {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setDateTime(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        }) +
          " · " +
          now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/products", label: "Products" },
    { to: "/contact", label: "Contact" },
  ];

  const routerLinks = [
    { label: "BrowserRouter", href: "https://reactrouter.com/en/main" },
    { label: "Routes & Route", href: "https://reactrouter.com/en/main" },
    { label: "NavLink", href: "https://reactrouter.com/en/main" },
    { label: "useNavigate", href: "https://reactrouter.com/en/main" },
    { label: "useParams", href: "https://reactrouter.com/en/main" },
  ];

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        {/* Brand */}
        <div>
          <div className="footer-brand">
            <div className="footer-logo-icon">⚡</div>
            <span>RouteDash</span>
          </div>
          <p className="footer-brand-desc">
            A professional React Router DOM demonstration built for a Frontend
            Developer Internship Day 20 project. Showcasing modern SPA routing
            patterns.
          </p>
        </div>

        {/* Pages */}
        <div>
          <div className="footer-col-title">Pages</div>
          <ul className="footer-links">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link to={to}>→ {label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Router Concepts */}
        <div>
          <div className="footer-col-title">Router Concepts</div>
          <ul className="footer-links">
            {routerLinks.map(({ label, href }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  → {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © {new Date().getFullYear()} RouteDash · Built with ⚛️ React + React Router DOM
        </p>
        <p className="footer-time">🕐 {dateTime}</p>
      </div>
    </footer>
  );
};

export default Footer;
