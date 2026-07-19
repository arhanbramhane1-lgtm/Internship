export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <p className="font-display text-2xl tracking-widest2 mb-3">
            LUM<span className="text-gold">É</span>
          </p>
          <p className="text-sm text-muted max-w-xs">
            A considered collection of everyday objects, chosen for the way they wear over time.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-4">Shop</p>
          <ul className="space-y-2 text-sm text-muted">
            <li>All products</li>
            <li>New arrivals</li>
            <li>Best rated</li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Account</p>
          <ul className="space-y-2 text-sm text-muted">
            <li>Your bag</li>
            <li>Wishlist</li>
            <li>Sign in</li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Studio</p>
          <ul className="space-y-2 text-sm text-muted">
            <li>Our approach</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className="hairline" />
      <p className="text-center text-xs text-muted py-6 tracking-widest2 uppercase">
        © {new Date().getFullYear()} Lumé — Capstone Project
      </p>
    </footer>
  );
}
