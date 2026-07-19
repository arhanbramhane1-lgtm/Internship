import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
];

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { items: wishItems } = useWishlist();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(query)}`);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-obsidian/90 backdrop-blur border-b border-line">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-6">
        <NavLink to="/" className="font-display text-2xl tracking-widest2 text-ivory shrink-0">
          LUM<span className="text-gold">É</span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `gold-underline text-sm uppercase tracking-widest2 ${isActive ? "active text-gold" : "text-ivory"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-xs">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the collection…"
            className="w-full bg-transparent border-b border-line focus:border-gold outline-none text-sm py-2 placeholder:text-muted transition-colors"
          />
        </form>

        <div className="flex items-center gap-5 text-sm">
          <NavLink to="/wishlist" className="relative gold-underline" aria-label="Wishlist">
            ♡
            {wishItems.length > 0 && (
              <span className="absolute -top-2 -right-3 text-[10px] bg-gold text-obsidian w-4 h-4 rounded-full flex items-center justify-center">
                {wishItems.length}
              </span>
            )}
          </NavLink>
          <NavLink to="/cart" className="relative gold-underline" aria-label="Cart">
            Bag
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-3 text-[10px] bg-gold text-obsidian w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </NavLink>

          {currentUser ? (
            <div className="hidden md:flex items-center gap-3">
              <span className="text-muted text-xs">Hi, {currentUser.name.split(" ")[0]}</span>
              <button onClick={logout} className="gold-underline uppercase tracking-widest2 text-xs">
                Log out
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="hidden md:inline gold-underline uppercase tracking-widest2 text-xs">
              Login
            </NavLink>
          )}

          <button
            className="md:hidden text-xl"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-line px-6 py-5 flex flex-col gap-4 bg-obsidian">
          <form onSubmit={handleSearch}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the collection…"
              className="w-full bg-transparent border-b border-line focus:border-gold outline-none text-sm py-2"
            />
          </form>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setMenuOpen(false)} className="text-sm uppercase tracking-widest2">
              {l.label}
            </NavLink>
          ))}
          {currentUser ? (
            <button onClick={() => { logout(); setMenuOpen(false); }} className="text-sm uppercase tracking-widest2 text-left">
              Log out
            </button>
          ) : (
            <NavLink to="/login" onClick={() => setMenuOpen(false)} className="text-sm uppercase tracking-widest2">
              Login
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
}
