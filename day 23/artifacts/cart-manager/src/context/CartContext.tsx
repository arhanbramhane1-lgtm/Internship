import React, { createContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { Product } from '../data/products';

export interface CartItemType {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItemType[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  totalItems: number;
  totalPrice: number;
  clearCart: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'cart_items';
const THEME_STORAGE_KEY = 'theme_preference';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }

      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (storedTheme) {
        const isDark = JSON.parse(storedTheme);
        setIsDarkMode(isDark);
        if (isDark) document.body.classList.add('dark');
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setIsDarkMode(true);
        document.body.classList.add('dark');
      }
    } catch (e) {
      console.error("Failed to parse local storage", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage when cart changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  // Save theme to localStorage when it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(isDarkMode));
      if (isDarkMode) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }
  }, [isDarkMode, isInitialized]);

  const addToCart = useCallback((product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const increaseQuantity = useCallback((productId: string) => {
    setCartItems(prev => prev.map(item =>
      item.product.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  }, []);

  const decreaseQuantity = useCallback((productId: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === productId);
      if (existing?.quantity === 1) {
        return prev.filter(item => item.product.id !== productId);
      }
      return prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const totalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalItems,
    totalPrice,
    clearCart,
    isDarkMode,
    toggleTheme,
    isCartOpen,
    setIsCartOpen
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};