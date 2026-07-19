import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useToast } from "./ToastContext";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useLocalStorage("lume_wishlist", []);
  const { showToast } = useToast();

  const isWishlisted = (id) => items.some((i) => i.id === id);

  const toggleWishlist = (product) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.id === product.id);
      if (exists) {
        showToast("Removed from wishlist", "error");
        return prev.filter((i) => i.id !== product.id);
      }
      showToast("Saved to wishlist");
      return [...prev, product];
    });
  };

  return (
    <WishlistContext.Provider value={{ items, isWishlisted, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
