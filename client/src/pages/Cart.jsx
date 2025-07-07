import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";
import CartItem from "../components/cart/CartItem/CartItem";
import CouponInput from "../components/cart/CouponInput/CouponInput";
import CartSummary from "../components/cart/CartSummary/CartSummary";
import Button from "../components/common/Button/Button";

const Cart = () => {
  const {
    items,
    totalItems,
    totalPrice,
    appliedCoupon,
    applyCoupon,
    clearCart,
  } = useCart();
  const [couponLoading, setCouponLoading] = useState(false);

  const handleCouponApply = async (coupon) => {
    setCouponLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (coupon) {
        applyCoupon(coupon);
      } else {
        applyCoupon(null);
      }
      setCouponLoading(false);
    }, 500);
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart();
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </div>

          {/* Empty Cart */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <ShoppingBagIcon className="mx-auto h-24 w-24 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/">
              <Button variant="primary" size="lg">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-2"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              Shopping Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
            </h1>
          </div>

          <Button
            onClick={handleClearCart}
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - Left Side */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Coupon Section */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <CouponInput
                onCouponApply={handleCouponApply}
                appliedCoupon={appliedCoupon}
                isLoading={couponLoading}
              />
            </div>
          </div>

          {/* Cart Summary - Right Side */}
          <div className="lg:col-span-1">
            <CartSummary
              subtotal={totalPrice}
              appliedCoupon={appliedCoupon}
              itemCount={totalItems}
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Shopping Benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>Free shipping on orders above ₹2,000</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span>30-day return policy</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              <span>Secure payment options</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
