import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useToast } from "./ToastContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage("lume_cart", []);
  const { showToast } = useToast();

  const addToCart = (product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...product, qty }];
    });
    showToast(`Added "${product.title.slice(0, 30)}${product.title.length > 30 ? "…" : ""}" to cart`);
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    showToast("Removed from cart", "error");
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQty, clearCart, subtotal, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
