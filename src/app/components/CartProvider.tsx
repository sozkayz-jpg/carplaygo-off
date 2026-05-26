"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import type { CartItem, CartAction } from "../types/cart";

interface CartContextValue {
  items: CartItem[];
  addItem: (variantId: string) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  isHydrated: boolean;
}

export const CartContext = createContext<CartContextValue | null>(null);

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((i) => i.variantId === action.variantId);
      if (existing) {
        return state.map((i) =>
          i.variantId === action.variantId
            ? { ...i, quantity: Math.min(i.quantity + 1, 5) }
            : i
        );
      }
      return [...state, { variantId: action.variantId, quantity: 1 }];
    }
    case "REMOVE":
      return state.filter((i) => i.variantId !== action.variantId);
    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) {
        return state.filter((i) => i.variantId !== action.variantId);
      }
      return state.map((i) =>
        i.variantId === action.variantId
          ? { ...i, quantity: Math.min(action.quantity, 5) }
          : i
      );
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

const STORAGE_KEY = "carplaygo-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: CartItem[] = JSON.parse(raw);
        parsed.forEach((item) =>
          dispatch({ type: "UPDATE_QUANTITY", variantId: item.variantId, quantity: item.quantity })
        );
      }
    } catch {
      // ignore corrupt storage
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isHydrated]);

  const addItem = useCallback(
    (variantId: string) => dispatch({ type: "ADD", variantId }),
    []
  );
  const removeItem = useCallback(
    (variantId: string) => dispatch({ type: "REMOVE", variantId }),
    []
  );
  const updateQuantity = useCallback(
    (variantId: string, quantity: number) =>
      dispatch({ type: "UPDATE_QUANTITY", variantId, quantity }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      isHydrated,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, totalItems, isHydrated]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
