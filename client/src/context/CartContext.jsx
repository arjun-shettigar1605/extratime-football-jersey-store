import React, { createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";

// Initial state
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  appliedCoupon: null,
};

// Action types
const CART_ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
  APPLY_COUPON: "APPLY_COUPON",
  REMOVE_COUPON: "REMOVE_COUPON",
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity, selectedSize, customization } = action.payload;

      // Create unique item ID based on product, size, and customization
      const itemId = `${product._id}-${selectedSize}-${
        customization?.enabled
          ? `${customization.playerName}-${customization.playerNumber}`
          : "no-custom"
      }`;

      const existingItemIndex = state.items.findIndex(
        (item) => item.id === itemId
      );

      let newItems;
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        const basePrice = product.price;
        const customPrice = customization?.enabled
          ? product.customizationPrice
          : 0;
        const totalPrice = basePrice + customPrice;

        const newItem = {
          id: itemId,
          product,
          quantity,
          selectedSize,
          customization,
          unitPrice: totalPrice,
          totalPrice: totalPrice * quantity,
        };
        newItems = [...state.items, newItem];
      }

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      };
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const newItems = state.items.filter((item) => item.id !== action.payload);
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { itemId, quantity } = action.payload;
      const newItems = state.items.map((item) =>
        item.id === itemId
          ? { ...item, quantity, totalPrice: item.unitPrice * quantity }
          : item
      );

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return initialState;

    case CART_ACTIONS.APPLY_COUPON:
      return {
        ...state,
        appliedCoupon: action.payload
      } 
    
    case CART_ACTIONS.REMOVE_COUPON:
      return {
        ...state,
        appliedCoupon: null
      }
      
    default:
      return state;
  }
};

// Create context
const CartContext = createContext();

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Add item to cart
  const addToCart = (product, quantity, selectedSize, customization) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product, quantity, selectedSize, customization },
    });

    const itemName = customization?.enabled
      ? `${product.title} (${customization.playerName} #${customization.playerNumber})`
      : product.title;

    toast.success(`${itemName} added to cart!`, {
      icon: "🛒",
      duration: 3000,
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: itemId,
    });

    toast.success("Item removed from cart");
  };

  // Update item quantity
  const updateQuantity = (itemId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { itemId, quantity },
    });
  };

  // Clear cart
  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
    toast.success("Cart cleared");
  };

  // Coupon 
  const applyCoupon = (coupon) => {
    dispatch({
      type: CART_ACTIONS.APPLY_COUPON,
      payload: coupon
    })
  }
  const removeCoupon = () => {
    dispatch({ type: CART_ACTIONS.REMOVE_COUPON});
  }

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
