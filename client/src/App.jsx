import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

//Profile Page
import { WishlistProvider } from "./context/WishlistContext";
import ProfileLayout from "./layouts/ProfileLayout";
import ProfileOverview from "./pages/profile/ProfileOverview";
import ChangePassword from "./pages/profile/ChangePassword";
import OrderHistory from "./pages/profile/OrderHistory";
import Wishlist from "./pages/profile/Wishlist";


// Auth Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// Main Pages
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccess from "./pages/OrderSuccess";

//Product Pages
import { CartProvider } from "./context/CartContext";
import ProductPage from "./pages/ProductPage";


//Admin Pages
import { AdminProvider } from "./context/AdminContext";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";


import "./index.css";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <AdminProvider>
            <Router>
              <div className="App">
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: "#363636",
                      color: "#fff",
                    },
                    success: {
                      duration: 3000,
                      theme: {
                        primary: "green",
                        secondary: "black",
                      },
                    },
                  }}
                />

                <Routes>
                  {/* Public routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />

                  {/* Protected routes */}
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <MainLayout>
                          <Home />
                        </MainLayout>
                      </ProtectedRoute>
                    }
                  />

                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route
                    path="/admin/dashboard"
                    element={
                      <AdminProtectedRoute>
                        <AdminLayout title="Order Management">
                          <AdminDashboard />
                        </AdminLayout>
                      </AdminProtectedRoute>
                    }
                  />

                  <Route
                    path="/category/:category"
                    element={
                      <ProtectedRoute>
                        <MainLayout>
                          <CategoryPage />
                        </MainLayout>
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfileLayout title="Profile">
                          <ProfileOverview />
                        </ProfileLayout>
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/profile/change-password"
                    element={
                      <ProtectedRoute>
                        <ProfileLayout title="Change Password">
                          <ChangePassword />
                        </ProfileLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile/orders"
                    element={
                      <ProtectedRoute>
                        <ProfileLayout title="Order History">
                          <OrderHistory />
                        </ProfileLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile/wishlist"
                    element={
                      <ProtectedRoute>
                        <ProfileLayout title="My Wishlist">
                          <Wishlist />
                        </ProfileLayout>
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/product/:id"
                    element={
                      <ProtectedRoute>
                        <MainLayout>
                          <ProductPage />
                        </MainLayout>
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute>
                        <MainLayout>
                          <Cart />
                        </MainLayout>
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <MainLayout>
                          <CheckoutPage />
                        </MainLayout>
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/order-success/:orderId"
                    element={
                      <ProtectedRoute>
                        <MainLayout>
                          <OrderSuccess />
                        </MainLayout>
                      </ProtectedRoute>
                    }
                  />

                  {/* Redirect any unknown routes to home */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                  <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />}/>

                </Routes>
              </div>
            </Router>
          </AdminProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
