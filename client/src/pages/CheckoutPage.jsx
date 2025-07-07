import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { orderService } from "../services/orderService";
import ShippingForm from "../components/checkout/ShippingForm/ShippingForm";
import Button from "../components/common/Button/Button";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, totalItems, totalPrice, appliedCoupon, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [shippingData, setShippingData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart");
      toast.error("Your cart is empty");
    }
  }, [items.length, navigate]);

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
      return (totalPrice * appliedCoupon.discount) / 100;
    } else if (appliedCoupon.type === "fixed") {
      return Math.min(appliedCoupon.discount, totalPrice);
    }
    return 0;
  };

  const calculateShipping = () => {
    if (appliedCoupon?.type === "free_shipping") return 0;
    if (totalPrice >= 2000) return 0;
    return 150;
  };

  const discount = calculateDiscount();
  const shipping = calculateShipping();
  const finalTotal = totalPrice - discount + shipping;

  const validateShippingForm = () => {
    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "pincode",
    ];
    const emptyFields = requiredFields.filter((field) => !shippingData[field]);

    if (emptyFields.length > 0) {
      toast.error("Please fill all required fields");
      return false;
    }

    // Email validation
    if (!/\S+@\S+\.\S+/.test(shippingData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    // Phone validation
    if (!/^[6-9]\d{9}$/.test(shippingData.phone)) {
      toast.error("Please enter a valid phone number");
      return false;
    }

    // Pincode validation
    if (!/^\d{6}$/.test(shippingData.pincode)) {
      toast.error("Please enter a valid 6-digit pincode");
      return false;
    }

    return true;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!validateShippingForm()) return;

    try {
      setLoading(true);

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Failed to load payment gateway");
        return;
      }

      const cleanAmount = Math.round(finalTotal);
      console.log('Sending amount to backend:', cleanAmount);
      // Create Razorpay order
      const paymentOrderData = await orderService.createPaymentOrder(cleanAmount);

      const options = {
        key: paymentOrderData.key,
        amount: paymentOrderData.amount,
        currency: paymentOrderData.currency,
        name: "Extra Time Store",
        description: "Order Payment",
        order_id: paymentOrderData.orderId,
        handler: async (response) => {
          try {
            // Prepare order data
            const orderData = {
              items: items.map((item) => ({
                product: item.product._id,
                title: item.product.title,
                price: item.product.price,
                quantity: item.quantity,
                selectedSize: item.selectedSize,
                customization: item.customization,
                unitPrice: item.unitPrice,
                totalPrice: item.totalPrice,
              })),
              shippingAddress: shippingData,
              pricing: {
                subtotal: totalPrice,
                discount,
                shipping,
                total: cleanAmount,
              },
              appliedCoupon: appliedCoupon || null,
            };

            // Verify payment and create order
            const verifyData = await orderService.verifyPaymentAndCreateOrder({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              orderData,
            });

            // Clear cart and redirect to success page
            clearCart();
            toast.success("Order placed successfully! 🎉");
            navigate(`/order-success/${verifyData.order._id}`);
          } catch (error) {
            console.error("Order creation error:", error);
            toast.error("Failed to create order. Please contact support.");
          }
        },
        prefill: {
          name: shippingData.fullName,
          email: shippingData.email,
          contact: shippingData.phone,
        },
        theme: {
          color: "#2563eb",
        },
        modal: {
          ondismiss: () => {
            toast.error("Payment cancelled");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to initiate payment");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/cart"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>

          <div className="flex items-center">
            <LockClosedIcon className="h-5 w-5 text-green-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">
              Secure Checkout
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Shipping Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <ShippingForm
              shippingData={shippingData}
              onShippingChange={setShippingData}
            />
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Order Summary
            </h2>

            {/* Order Items */}
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 text-sm"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 line-clamp-1">
                      {item.product.title}
                    </p>
                    <p className="text-gray-600">
                      Size: {item.selectedSize} • Qty: {item.quantity}
                    </p>
                    {item.customization?.enabled && (
                      <p className="text-blue-600 text-xs">
                        Custom: {item.customization.playerName} #
                        {item.customization.playerNumber}
                      </p>
                    )}
                  </div>
                  <span className="font-medium">
                    {formatPrice(item.totalPrice)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              {/* Pricing Breakdown */}
              <div className="flex justify-between text-sm">
                <span>Subtotal ({totalItems} items):</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount ({appliedCoupon.code}):</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span>Shipping:</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-green-600 font-medium">FREE</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>

              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Payment Button */}
            <Button
              onClick={handlePayment}
              isLoading={loading}
              variant="primary"
              size="lg"
              className="w-full mt-6"
            >
              Pay {formatPrice(finalTotal)}
            </Button>

            {/* Security Notice */}
            <div className="mt-4 text-xs text-gray-500 text-center">
              <p>🔒 Payments secured by Razorpay</p>
              <p>Your payment information is encrypted and secure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
