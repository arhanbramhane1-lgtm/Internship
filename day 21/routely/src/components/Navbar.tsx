import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

/**
 * Responsive navbar with active-link highlighting.
 * TanStack Router's <Link> exposes an activeProps API equivalent to
 * React Router's NavLink — we use it to style the current route.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [now, setNow] = useState(new Date());

  // Live clock in the navbar
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Dark/light mode toggle — toggles the `.dark` class on <html>
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (stored === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/products", label: "Products" },
    { to: "/contact", label: "Contact" },
  ] as const;

  return (
    <header className="nav-shell">
      <div className="nav-inner">
        <Link to="/" className="nav-logo" onClick={() => setOpen(false)}>
          <span className="nav-logo-mark">◆</span>
          <span>Routely</span>
        </Link>

        <nav className={`nav-links ${open ? "is-open" : ""}`}>
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="nav-link"
              activeProps={{ className: "nav-link is-active" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <span className="nav-clock" aria-label="current time">
            {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
          <button className="nav-theme" onClick={toggleTheme} aria-label="Toggle theme">
            {dark ? "☀︎" : "☾"}
          </button>
          <button
            className={`nav-burger ${open ? "is-open" : ""}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
