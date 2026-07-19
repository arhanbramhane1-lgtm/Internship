import { useState, useEffect, useCallback } from "react";
// NavLink highlights the active route automatically
// Link is used for programmatic/logo navigation
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

/**
 * Navbar Component
 * - Uses NavLink for automatic active-class detection on each route
 * - Contains dark/light theme toggle with localStorage persistence
 * - Shows live clock using setInterval
 * - Responsive: hamburger menu collapses on mobile
 */
const Navbar = ({ theme, onToggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [clock, setClock] = useState("");

  // Update clock every second
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClock(
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

  // Detect scroll to add shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const navItems = [
    { to: "/", label: "Home", icon: "🏠", end: true },
    { to: "/about", label: "About", icon: "💡" },
    { to: "/products", label: "Products", icon: "🛍️" },
    { to: "/contact", label: "Contact", icon: "✉️" },
  ];

  const navLinkClass = ({ isActive }) => (isActive ? "active" : "");

  return (
    <header>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-inner">
          {/* Logo — uses Link for plain navigation without active-state logic */}
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <div className="logo-icon">⚡</div>
            <div className="logo-text">
              <span>Route</span>Dash
            </div>
          </Link>

          {/* Desktop Nav — NavLink auto-applies `active` className */}
          <ul className="nav-links" role="navigation" aria-label="Main navigation">
            {navItems.map(({ to, label, icon, end }) => (
              <li key={to}>
                <NavLink to={to} className={navLinkClass} end={end}>
                  <span>{icon}</span> {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="navbar-right">
            <div className="navbar-clock" aria-label="Current time">
              🕐 {clock}
            </div>

            <button
              className="theme-toggle"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            {/* Hamburger — mobile only */}
            <button
              className={`hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle mobile menu"
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`} role="navigation" aria-label="Mobile navigation">
          {navItems.map(({ to, label, icon, end }) => (
            <NavLink key={to} to={to} className={navLinkClass} end={end} onClick={closeMenu}>
              <span>{icon}</span> {label}
            </NavLink>
          ))}
          <div className="mobile-clock">🕐 {clock}</div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
