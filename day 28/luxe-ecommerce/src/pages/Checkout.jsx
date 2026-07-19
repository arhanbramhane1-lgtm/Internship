import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [form, setForm] = useState({
    name: "", address: "", city: "", zip: "", card: "",
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const placeOrder = (e) => {
    e.preventDefault();
    setPlacing(true);
    setTimeout(() => {
      clearCart();
      showToast("Order placed — thank you!");
      navigate("/");
    }, 1200);
  };

  if (items.length === 0 && !placing) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-28 text-center">
        <p className="font-display text-3xl mb-3">Nothing to check out</p>
        <Link to="/products" className="btn-gold inline-block mt-4">Browse the collection</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
      <p className="eyebrow mb-3">Almost there</p>
      <h1 className="font-display text-4xl mb-12">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-14">
        <form onSubmit={placeOrder} className="lg:col-span-2 space-y-8">
          <div>
            <p className="eyebrow mb-4">Shipping details</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required name="name" value={form.name} onChange={onChange} placeholder="Full name"
                className="bg-surface border border-line px-4 py-3 text-sm focus:border-gold outline-none sm:col-span-2" />
              <input required name="address" value={form.address} onChange={onChange} placeholder="Street address"
                className="bg-surface border border-line px-4 py-3 text-sm focus:border-gold outline-none sm:col-span-2" />
              <input required name="city" value={form.city} onChange={onChange} placeholder="City"
                className="bg-surface border border-line px-4 py-3 text-sm focus:border-gold outline-none" />
              <input required name="zip" value={form.zip} onChange={onChange} placeholder="ZIP code"
                className="bg-surface border border-line px-4 py-3 text-sm focus:border-gold outline-none" />
            </div>
          </div>
          <div>
            <p className="eyebrow mb-4">Payment</p>
            <input required name="card" value={form.card} onChange={onChange} placeholder="Card number"
              className="w-full bg-surface border border-line px-4 py-3 text-sm focus:border-gold outline-none" />
            <p className="text-xs text-muted mt-2">This is a demo checkout — no real payment is processed.</p>
          </div>
          <button type="submit" disabled={placing} className="btn-gold w-full sm:w-auto disabled:opacity-50">
            {placing ? "Placing order…" : "Place order"}
          </button>
        </form>

        <div className="card-surface p-8 h-fit">
          <h2 className="font-display text-2xl mb-6">Order Summary</h2>
          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto pr-1">
            {items.map((i) => (
              <div key={i.id} className="flex justify-between text-sm">
                <span className="text-muted line-clamp-1 pr-3">{i.title} × {i.qty}</span>
                <span>${(i.price * i.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="hairline my-4" />
          <div className="flex justify-between font-display text-xl">
            <span>Total</span>
            <span className="text-gold">${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
