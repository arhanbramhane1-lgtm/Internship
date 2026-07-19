import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, removeFromCart, updateQty, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-28 text-center">
        <p className="font-display text-3xl mb-3">Your bag is empty</p>
        <p className="text-muted mb-8">Pieces you add will appear here.</p>
        <Link to="/products" className="btn-gold inline-block">Explore the collection</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
      <p className="eyebrow mb-3">Your selections</p>
      <h1 className="font-display text-4xl mb-12">Shopping Bag</h1>

      <div className="grid lg:grid-cols-3 gap-14">
        <div className="lg:col-span-2 divide-y divide-line border-y border-line">
          {items.map((item) => (
            <div key={item.id} className="flex gap-6 py-6">
              <Link to={`/products/${item.id}`} className="w-24 h-24 bg-white/95 shrink-0 flex items-center justify-center">
                <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain p-2" />
              </Link>
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <Link to={`/products/${item.id}`} className="font-display text-lg hover:text-gold transition-colors line-clamp-1">
                    {item.title}
                  </Link>
                  <p className="text-xs text-muted capitalize mt-1">{item.category}</p>
                  <p className="text-gold mt-2">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center border border-line">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-8 h-8 hover:text-gold"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-8 h-8 hover:text-gold"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs uppercase tracking-widest2 text-muted hover:text-red-300 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card-surface p-8 h-fit sticky top-28">
          <h2 className="font-display text-2xl mb-6">Order Summary</h2>
          <div className="flex justify-between text-sm mb-3">
            <span className="text-muted">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-3">
            <span className="text-muted">Shipping</span>
            <span className="text-gold">Complimentary</span>
          </div>
          <div className="hairline my-4" />
          <div className="flex justify-between font-display text-xl mb-8">
            <span>Total</span>
            <span className="text-gold">${subtotal.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="btn-gold w-full text-center block">
            Proceed to checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
