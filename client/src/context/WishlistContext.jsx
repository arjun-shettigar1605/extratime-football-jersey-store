import React, { createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";

// Initial state
const initialState = {
  items: [],
  totalItems: 0,
};

// Action types
const WISHLIST_ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  CLEAR_WISHLIST: "CLEAR_WISHLIST",
  SET_WISHLIST: "SET_WISHLIST",
};

// Reducer function
const wishlistReducer = (state, action) => {
  switch (action.type) {
    case WISHLIST_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        toast.error("Item already in wishlist");
        return state;
      }

      const newItems = [...state.items, action.payload];
      return {
        ...state,
        items: newItems,
        totalItems: newItems.length,
      };
    }

    case WISHLIST_ACTIONS.REMOVE_ITEM: {
      const newItems = state.items.filter(
        (item) => item._id !== action.payload
      );
      return {
        ...state,
        items: newItems,
        totalItems: newItems.length,
      };
    }

    case WISHLIST_ACTIONS.CLEAR_WISHLIST:
      return initialState;

    case WISHLIST_ACTIONS.SET_WISHLIST:
      return {
        ...state,
        items: action.payload,
        totalItems: action.payload.length,
      };

    default:
      return state;
  }
};

// Create context
const WishlistContext = createContext();

// Wishlist provider component
export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Add item to wishlist
  const addToWishlist = (product) => {
    dispatch({
      type: WISHLIST_ACTIONS.ADD_ITEM,
      payload: product,
    });
    toast.success("Added to wishlist! ❤️");
  };

  // Remove item from wishlist
  const removeFromWishlist = (productId) => {
    dispatch({
      type: WISHLIST_ACTIONS.REMOVE_ITEM,
      payload: productId,
    });
    toast.success("Removed from wishlist");
  };

  // Check if item is in wishlist
  const isInWishlist = (productId) => {
    return state.items.some((item) => item._id === productId);
  };

  // Clear wishlist
  const clearWishlist = () => {
    dispatch({ type: WISHLIST_ACTIONS.CLEAR_WISHLIST });
    toast.success("Wishlist cleared");
  };

  const value = {
    ...state,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
