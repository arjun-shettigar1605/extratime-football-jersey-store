import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button/Button";

const CartSummary = ({ subtotal, appliedCoupon, shipping = 0, itemCount }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;

    if (appliedCoupon.type === "percentage") {
      return (subtotal * appliedCoupon.discount) / 100;
    } else if (appliedCoupon.type === "fixed") {
      return Math.min(appliedCoupon.discount, subtotal);
    }
    return 0;
  };

  const calculateShipping = () => {
    if (appliedCoupon?.type === "free_shipping") return 0;
    if (subtotal >= 2000) return 0; // Free shipping above ₹2000
    return shipping || 150; // Default shipping cost
  };

  const discount = calculateDiscount();
  const shippingCost = calculateShipping();
  const total = subtotal - discount + shippingCost;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-fit">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

      <div className="space-y-3">
        {/* Items Count */}
        <div className="flex justify-between text-sm text-gray-600">
          <span>Items ({itemCount})</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>
              Discount ({appliedCoupon.code})
              {appliedCoupon.type === "percentage" &&
                ` - ${appliedCoupon.discount}%`}
            </span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}

        {/* Shipping */}
        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping</span>
          <span>
            {shippingCost === 0 ? (
              <span className="text-green-600 font-medium">FREE</span>
            ) : (
              formatPrice(shippingCost)
            )}
          </span>
        </div>

        {/* Free Shipping Notice */}
        {subtotal < 2000 && shippingCost > 0 && (
          <div className="bg-blue-50 rounded-md p-2 text-xs text-blue-700">
            Add {formatPrice(2000 - subtotal)} more for free shipping!
          </div>
        )}

        <div className="border-t pt-3">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        onClick={handleCheckout}
        variant="primary"
        size="lg"
        className="w-full mt-6"
      >
        Proceed to Checkout
      </Button>

      {/* Security Notice */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>🔒 Secure checkout with end-to-end encryption</p>
        <p>30-day return policy • Free exchanges</p>
      </div>
    </div>
  );
};

export default CartSummary;
