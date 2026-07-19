import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingCart, Sun, Moon, Store } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export function Navbar() {
  const { count, theme, toggleTheme } = useCart();
  const { location } = useRouterState();
  const path = location.pathname;

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <span className="brand-mark" />
        <span>Lumière</span>
      </Link>
      <div className="nav-actions">
        <Link to="/" className={`nav-link ${path === "/" ? "active" : ""}`}>
          <Store size={16} style={{ verticalAlign: "-3px", marginRight: 6 }} />
          Shop
        </Link>
        <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <Link to="/cart" className="icon-btn" aria-label="Cart">
          <ShoppingCart size={20} />
          {count > 0 && <span className="cart-badge">{count}</span>}
        </Link>
      </div>
    </nav>
  );
}
