import React, { createContext, useContext, useReducer, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

// Initial state
const initialState = {
  admin: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
};

// Action types
const ADMIN_ACTIONS = {
  SET_LOADING: "SET_LOADING",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT: "LOGOUT",
};

// Reducer function
const adminReducer = (state, action) => {
  switch (action.type) {
    case ADMIN_ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ADMIN_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        admin: action.payload.admin,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case ADMIN_ACTIONS.LOGOUT:
      return {
        ...state,
        admin: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

// Create context
const AdminContext = createContext();

// Admin provider component
export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  // Check for existing admin token on app start
  useEffect(() => {
    const initAdmin = () => {
      const token = localStorage.getItem("adminToken");
      const admin = localStorage.getItem("adminData");

      if (token && admin) {
        try {
          const parsedAdmin = JSON.parse(admin);
          dispatch({
            type: ADMIN_ACTIONS.LOGIN_SUCCESS,
            payload: { admin: parsedAdmin, token },
          });
        } catch (error) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminData");
        }
      }

      dispatch({ type: ADMIN_ACTIONS.SET_LOADING, payload: false });
    };

    initAdmin();
  }, []);

  // Admin login function
  const adminLogin = async (credentials) => {
    try {
      dispatch({ type: ADMIN_ACTIONS.SET_LOADING, payload: true });

      const response = await api.post("/admin/login", credentials);
      const { token, admin } = response.data;

      // Store in localStorage
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminData", JSON.stringify(admin));

      dispatch({
        type: ADMIN_ACTIONS.LOGIN_SUCCESS,
        payload: { admin, token },
      });

      toast.success("Admin login successful!");
      return { success: true };
    } catch (error) {
      dispatch({ type: ADMIN_ACTIONS.SET_LOADING, payload: false });
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      return { success: false, message };
    }
  };

  // Admin logout function
  const adminLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    dispatch({ type: ADMIN_ACTIONS.LOGOUT });
    toast.success("Logged out successfully");
  };

  const value = {
    ...state,
    adminLogin,
    adminLogout,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

// Custom hook to use admin context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
