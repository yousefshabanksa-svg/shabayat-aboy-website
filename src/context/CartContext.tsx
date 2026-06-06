"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

/* ─── Types ─── */
export interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (name: string, price: number, quantity: number) => void;
  updateQuantity: (name: string, quantity: number) => void;
  removeItem: (name: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "shabyat-cart";

/* ─── Provider ─── */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  /* Load from localStorage on mount */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  /* Persist to localStorage on change */
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addItem = useCallback((name: string, price: number, quantity: number) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.name === name);
      if (existing) {
        return prev.map((item) =>
          item.name === name
            ? { ...item, quantity: Math.min(99, item.quantity + quantity) }
            : item
        );
      }
      return [...prev, { name, price, quantity }];
    });
  }, []);

  const updateQuantity = useCallback((name: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.name !== name));
    } else {
      setItems((prev) =>
        prev.map((item) =>
          item.name === name ? { ...item, quantity: Math.min(99, quantity) } : item
        )
      );
    }
  }, []);

  const removeItem = useCallback((name: string) => {
    setItems((prev) => prev.filter((item) => item.name !== name));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        totalItems,
        subtotal,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* ─── Hook ─── */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
