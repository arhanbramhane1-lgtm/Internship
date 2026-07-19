import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import type { CartItem as CartItemType } from "@/context/CartContext";

export function CartItem({
  item,
  onRequestRemove,
}: {
  item: CartItemType;
  onRequestRemove: () => void;
}) {
  const { increase, decrease } = useCart();
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} />
      <div className="cart-item-info">
        <span className="cart-item-cat">{item.category}</span>
        <h4 className="cart-item-title">{item.title}</h4>
        <div className="cart-item-actions">
          <div className="qty-box">
            <button className="qty-btn" onClick={() => decrease(item.id)} aria-label="Decrease">
              <Minus size={14} />
            </button>
            <span className="qty-val">{item.quantity}</span>
            <button className="qty-btn" onClick={() => increase(item.id)} aria-label="Increase">
              <Plus size={14} />
            </button>
          </div>
          <button className="remove-btn" onClick={onRequestRemove} aria-label="Remove">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="cart-item-right">
        <span className="price">${(item.price * item.quantity).toFixed(2)}</span>
        <span className="rating" style={{ fontSize: 12 }}>
          ${item.price.toFixed(2)} ea
        </span>
      </div>
    </div>
  );
}
