import React, { useState } from "react";
import { TagIcon } from "@heroicons/react/24/outline";
import Button from "../../common/Button/Button";
import toast from "react-hot-toast";

const CouponInput = ({ onCouponApply, appliedCoupon, isLoading }) => {
  const [couponCode, setCouponCode] = useState("");

  // Sample coupons for demonstration
  const validCoupons = {
    WELCOME10: {
      discount: 10,
      type: "percentage",
      description: "10% off on your order",
    },
    SAVE500: {
      discount: 500,
      type: "fixed",
      description: "₹500 off on orders above ₹3000",
    },
    NEWUSER: {
      discount: 15,
      type: "percentage",
      description: "15% off for new users",
    },
    FREESHIP: {
      discount: 0,
      type: "free_shipping",
      description: "Free shipping on your order",
    },
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    const upperCaseCode = couponCode.trim().toUpperCase();

    if (validCoupons[upperCaseCode]) {
      onCouponApply({
        code: upperCaseCode,
        ...validCoupons[upperCaseCode],
      });
      toast.success(`Coupon "${upperCaseCode}" applied successfully! 🎉`);
    } else {
      toast.error("Invalid coupon code");
    }
  };

  const handleRemoveCoupon = () => {
    onCouponApply(null);
    setCouponCode("");
    toast.success("Coupon removed");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleApplyCoupon();
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 flex items-center">
        <TagIcon className="h-5 w-5 mr-2" />
        Apply Coupon
      </h3>

      {!appliedCoupon ? (
        <div className="flex space-x-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter coupon code"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
            disabled={isLoading}
          />
          <Button
            onClick={handleApplyCoupon}
            variant="outline"
            isLoading={isLoading}
            disabled={!couponCode.trim()}
          >
            Apply
          </Button>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-green-800">
                Coupon "{appliedCoupon.code}" Applied
              </p>
              <p className="text-sm text-green-600">
                {appliedCoupon.description}
              </p>
            </div>
            <button
              onClick={handleRemoveCoupon}
              className="text-green-600 hover:text-green-800 font-medium text-sm"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {/* Available Coupons Hint */}
      <div className="bg-blue-50 rounded-md p-3">
        <p className="text-sm text-blue-800 font-medium mb-2">
          Available Coupons:
        </p>
        <div className="space-y-1 text-xs text-blue-700">
          <p>
            • <code className="bg-blue-100 px-1 rounded">WELCOME10</code> - 10%
            off
          </p>
          <p>
            • <code className="bg-blue-100 px-1 rounded">SAVE500</code> - ₹500
            off on orders above ₹3000
          </p>
          <p>
            • <code className="bg-blue-100 px-1 rounded">NEWUSER</code> - 15%
            off for new users
          </p>
          <p>
            • <code className="bg-blue-100 px-1 rounded">FREESHIP</code> - Free
            shipping
          </p>
        </div>
      </div>
    </div>
  );
};

export default CouponInput;
