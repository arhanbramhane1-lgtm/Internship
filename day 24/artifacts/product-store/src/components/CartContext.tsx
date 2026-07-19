import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  toastMessage: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  }, []);

  const addToCart = useCallback((productId: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
    showToast('Added to cart!');
  }, [showToast]);

  const removeFromCart = useCallback((productId: number) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.productId === productId ? { ...item, quantity } : item))
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => setCart([]), []);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, toastMessage }}
    >
      {children}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast">{toastMessage}</div>
        </div>
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
