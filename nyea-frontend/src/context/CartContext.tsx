import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { CartItem, CartState, CartContextType, SessionType, CartItemOptions } from '../types/cart';
import type { Program } from '../types/program';

// Constants
const CART_STORAGE_KEY = 'nyea_cart';

// Default cart state
const defaultCartState: CartState = {
  items: [],
  lastUpdated: Date.now(),
  version: 1,
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartState, setCartState, { error, loading }] = useLocalStorage<CartState>(
    CART_STORAGE_KEY,
    defaultCartState
  );

  // Utility function to update cart state
  const updateCartState = useCallback((updater: (prev: CartState) => CartState) => {
    setCartState(prev => ({
      ...updater(prev),
      lastUpdated: Date.now(),
    }));
  }, [setCartState]);

  // Add item to cart
  const addToCart = useCallback((
    program: Program,
    quantity: number = 1,
    session?: SessionType,
    options?: CartItemOptions
  ) => {
    if (quantity <= 0) return;

    updateCartState(prev => {
      // For sessions, treat each session as a unique item
      const existingItemIndex = session 
        ? prev.items.findIndex(item => 
            item.program.id === program.id && 
            item.selectedSession?.id === session.id
          )
        : prev.items.findIndex(item => 
            item.program.id === program.id && 
            !item.selectedSession
          );
      
      if (existingItemIndex >= 0) {
        // Update existing item
        const newItems = [...prev.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity,
          paymentPlan: options?.paymentPlan ?? newItems[existingItemIndex].paymentPlan,
        };
        return { ...prev, items: newItems };
      } else {
        // Add new item
        const newItem: CartItem = {
          program,
          quantity,
          addedAt: Date.now(),
          selectedSession: session,
          paymentPlan: options?.paymentPlan,
        };
        return { ...prev, items: [...prev.items, newItem] };
      }
    });
  }, [updateCartState]);

  // Add multiple sessions to cart at once
  const addMultipleToCart = useCallback((
    program: Program,
    sessions: SessionType[],
    quantity: number = 1,
    options?: CartItemOptions
  ) => {
    if (quantity <= 0 || sessions.length === 0) return;

    console.log('addMultipleToCart called with:', {
      programId: program.id,
      sessionCount: sessions.length,
      sessionIds: sessions.map(s => s.id)
    });

    updateCartState(prev => {
      let newItems = [...prev.items];
      console.log('Current cart items before adding:', newItems.length);
      
      sessions.forEach(session => {
        // Check if this session is already in cart
        const existingItemIndex = newItems.findIndex(item => 
          item.program.id === program.id && 
          item.selectedSession?.id === session.id
        );
        
        if (existingItemIndex >= 0) {
          console.log('Updating existing session:', session.id);
          // Update existing item
          newItems[existingItemIndex] = {
            ...newItems[existingItemIndex],
            quantity: newItems[existingItemIndex].quantity + quantity,
            paymentPlan: options?.paymentPlan ?? newItems[existingItemIndex].paymentPlan,
          };
        } else {
          console.log('Adding new session:', session.id, session.location);
          // Add new item
          const newItem: CartItem = {
            program,
            quantity,
            addedAt: Date.now(),
            selectedSession: session,
            paymentPlan: options?.paymentPlan,
          };
          newItems.push(newItem);
        }
      });
      
      console.log('Cart items after adding:', newItems.length);
      return { ...prev, items: newItems };
    });
  }, [updateCartState]);

  // Remove item from cart
  const removeFromCart = useCallback((programId: number, sessionId?: string) => {
    updateCartState(prev => ({
      ...prev,
      items: prev.items.filter(item => {
        if (sessionId) {
          // Remove specific session
          return !(item.program.id === programId && item.selectedSession?.id === sessionId);
        } else {
          // Remove program (for non-session items)
          return !(item.program.id === programId && !item.selectedSession);
        }
      }),
    }));
  }, [updateCartState]);

  // Update item quantity
  const updateQuantity = useCallback((programId: number, quantity: number, sessionId?: string) => {
    if (quantity <= 0) {
      removeFromCart(programId, sessionId);
      return;
    }

    updateCartState(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (sessionId) {
          // Update specific session
          return (item.program.id === programId && item.selectedSession?.id === sessionId) 
            ? { ...item, quantity } 
            : item;
        } else {
          // Update program (for non-session items)
          return (item.program.id === programId && !item.selectedSession) 
            ? { ...item, quantity } 
            : item;
        }
      }),
    }));
  }, [updateCartState, removeFromCart]);

  // Clear entire cart
  const clearCart = useCallback(() => {
    updateCartState(prev => ({ ...prev, items: [] }));
  }, [updateCartState]);

  // Get total price
  const getTotalPrice = useCallback((): number => {
    return cartState.items.reduce((total, item) => {
      const price =
        item.paymentPlan?.depositAmount ??
        item.selectedSession?.price ??
        item.program.price;
      return total + (price * item.quantity);
    }, 0);
  }, [cartState.items]);

  // Get total number of items
  const getTotalItems = useCallback((): number => {
    return cartState.items.reduce((total, item) => total + item.quantity, 0);
  }, [cartState.items]);

  // Get quantity of specific item
  const getItemCount = useCallback((programId: number, sessionId?: string): number => {
    const item = cartState.items.find(item => {
      if (sessionId) {
        return item.program.id === programId && item.selectedSession?.id === sessionId;
      } else {
        return item.program.id === programId && !item.selectedSession;
      }
    });
    return item ? item.quantity : 0;
  }, [cartState.items]);

  // Check if item is in cart
  const isInCart = useCallback((programId: number): boolean => {
    return cartState.items.some(item => item.program.id === programId);
  }, [cartState.items]);

  const value: CartContextType = {
    // State
    items: cartState.items,
    loading,
    error,
    
    // Actions
    addToCart,
    addMultipleToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    
    // Computed values
    getTotalPrice,
    getTotalItems,
    getItemCount,
    isInCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};