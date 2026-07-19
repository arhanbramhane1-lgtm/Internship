import { createContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import type { Product } from "@/data/products";

export type CartItem = Product & { quantity: number };

type CartContextValue = {
  items: CartItem[];
  wishlist: number[];
  addToCart: (p: Product) => void;
  removeFromCart: (id: number) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: number) => void;
  count: number;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  grandTotal: number;
  coupon: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export const CartContext = createContext<CartContextValue | null>(null);

const CART_KEY = "cart_items_v1";
const WISH_KEY = "wishlist_v1";
const COUPON_KEY = "cart_coupon_v1";
const THEME_KEY = "theme_v1";

const COUPONS: Record<string, number> = {
  SAVE10: 0.1,
  WELCOME20: 0.2,
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      if (c) setItems(JSON.parse(c));
      const w = localStorage.getItem(WISH_KEY);
      if (w) setWishlist(JSON.parse(w));
      const cp = localStorage.getItem(COUPON_KEY);
      if (cp) setCoupon(cp);
      const t = localStorage.getItem(THEME_KEY) as "light" | "dark" | null;
      if (t) setTheme(t);
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    if (coupon) localStorage.setItem(COUPON_KEY, coupon);
    else localStorage.removeItem(COUPON_KEY);
  }, [coupon, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme, hydrated]);

  const addToCart = (p: Product) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === p.id);
      if (found) return prev.map((i) => (i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i));
      return [...prev, { ...p, quantity: 1 }];
    });
    toast.success(`${p.title} added to cart`);
  };
  const removeFromCart = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast("Removed from cart");
  };
  const increase = (id: number) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)));
  const decrease = (id: number) =>
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    );
  const clearCart = () => {
    setItems([]);
    setCoupon(null);
    toast("Cart cleared");
  };
  const toggleWishlist = (id: number) => {
    setWishlist((prev) => {
      if (prev.includes(id)) {
        toast("Removed from wishlist");
        return prev.filter((x) => x !== id);
      }
      toast.success("Added to wishlist");
      return [...prev, id];
    });
  };

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.quantity, 0), [items]);
  const discount = coupon && COUPONS[coupon] ? subtotal * COUPONS[coupon] : 0;
  const afterDiscount = subtotal - discount;
  const shipping = afterDiscount > 0 ? (afterDiscount > 200 ? 0 : 15) : 0;
  const tax = +(afterDiscount * 0.08).toFixed(2);
  const grandTotal = +(afterDiscount + shipping + tax).toFixed(2);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  const applyCoupon = (code: string) => {
    const key = code.trim().toUpperCase();
    if (COUPONS[key]) {
      setCoupon(key);
      toast.success(`Coupon ${key} applied (${COUPONS[key] * 100}% off)`);
      return true;
    }
    toast.error("Invalid coupon code");
    return false;
  };
  const removeCoupon = () => {
    setCoupon(null);
    toast("Coupon removed");
  };
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <CartContext.Provider
      value={{
        items,
        wishlist,
        addToCart,
        removeFromCart,
        increase,
        decrease,
        clearCart,
        toggleWishlist,
        count,
        subtotal,
        shipping,
        tax,
        discount,
        grandTotal,
        coupon,
        applyCoupon,
        removeCoupon,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
