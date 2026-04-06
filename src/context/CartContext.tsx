import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem } from '../types/menu';

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    if (!savedCart) return [];

    try {
      const parsedCart = JSON.parse(savedCart);

      const hasInvalidIds = parsedCart.some((item: CartItem) =>
        !item.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)
      );

      if (hasInvalidIds) {
        console.log('Detected old cart format, clearing cart');
        localStorage.removeItem('cart');
        return [];
      }

      return parsedCart;
    } catch {
      localStorage.removeItem('cart');
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const parsePrice = (priceStr: string): number => {
    const cleanPrice = priceStr.replace(/сом/g, '').replace(/\s/g, '').split('/')[0];
    return parseFloat(cleanPrice) || 0;
  };

  const addItem = (item: MenuItem) => {
    setItems((prevItems) => {
      const itemId = item.id;
      const existingItem = prevItems.find((i) => i.id === itemId);

      if (existingItem) {
        return prevItems.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      const newItem: CartItem = {
        ...item,
        id: itemId,
        quantity: 1,
        numericPrice: parsePrice(item.price),
      };

      return [...prevItems, newItem];
    });
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.numericPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
