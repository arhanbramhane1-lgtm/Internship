import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ShoppingBag, CreditCard, Trash2, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "@/components/CartItem";
import { ConfirmModal } from "@/components/ConfirmModal";
import { toast } from "sonner";

export function CartPage() {
  const {
    items,
    subtotal,
    shipping,
    tax,
    grandTotal,
    discount,
    coupon,
    applyCoupon,
    removeCoupon,
    removeFromCart,
    clearCart,
  } = useCart();
  const [code, setCode] = useState("");
  const [pendingRemove, setPendingRemove] = useState<number | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  if (items.length === 0) {
    return (
      <div className="container">
        <div className="empty">
          <div className="empty-icon">
            <ShoppingBag size={38} />
          </div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const pendingItem = items.find((i) => i.id === pendingRemove);

  return (
    <div className="container">
      <header className="page-header">
        <div>
          <h1 className="page-title">Your Cart</h1>
          <p className="page-subtitle">
            {items.length} {items.length === 1 ? "item" : "items"} ready for checkout
          </p>
        </div>
        <Link to="/" className="btn btn-ghost">
          <ArrowLeft size={16} /> Continue Shopping
        </Link>
      </header>

      <div className="cart-layout">
        <div className="cart-list">
          {items.map((item) => (
            <CartItem key={item.id} item={item} onRequestRemove={() => setPendingRemove(item.id)} />
          ))}
          <button
            className="btn btn-danger"
            onClick={() => setConfirmClear(true)}
            style={{ alignSelf: "flex-start" }}
          >
            <Trash2 size={16} /> Clear Cart
          </button>
        </div>

        <aside className="summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="summary-row discount">
              <span>Discount ({coupon})</span>
              <span>−${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="summary-row">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          {coupon ? (
            <div className="coupon-applied">
              <span>✓ Coupon {coupon} applied</span>
              <button className="icon-btn" onClick={removeCoupon} aria-label="Remove coupon">
                <X size={14} />
              </button>
            </div>
          ) : (
            <div className="coupon">
              <input
                placeholder="Coupon code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button
                className="btn btn-ghost"
                onClick={() => {
                  if (applyCoupon(code)) setCode("");
                }}
              >
                Apply
              </button>
            </div>
          )}

          <div className="summary-row total">
            <span>Grand Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>

          <div className="summary-actions">
            <button
              className="btn btn-primary btn-block"
              onClick={() => toast.success("Checkout successful — thanks for shopping!")}
            >
              <CreditCard size={16} /> Checkout
            </button>
            <p style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center", margin: 0 }}>
              Try coupons <strong>SAVE10</strong> or <strong>WELCOME20</strong>
            </p>
          </div>
        </aside>
      </div>

      <ConfirmModal
        open={pendingRemove !== null}
        title="Remove item?"
        message={`Remove "${pendingItem?.title ?? ""}" from your cart?`}
        confirmLabel="Remove"
        onCancel={() => setPendingRemove(null)}
        onConfirm={() => {
          if (pendingRemove !== null) removeFromCart(pendingRemove);
          setPendingRemove(null);
        }}
      />
      <ConfirmModal
        open={confirmClear}
        title="Clear entire cart?"
        message="This will remove all items from your cart. This action cannot be undone."
        confirmLabel="Clear cart"
        onCancel={() => setConfirmClear(false)}
        onConfirm={() => {
          clearCart();
          setConfirmClear(false);
        }}
      />
    </div>
  );
}
