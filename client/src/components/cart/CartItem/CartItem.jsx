import React from "react";
import { Link } from "react-router-dom";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCart } from "../../../context/CartContext";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > 10) return; // Max quantity limit
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Link to={`/product/${item.product._id}`}>
            <img
              src={
                item.product.images[0] ||
                "https://via.placeholder.com/150x150/E5E7EB/9CA3AF?text=No+Image"
              }
              alt={item.product.title}
              className="w-20 h-20 object-cover rounded-md hover:opacity-75 transition-opacity"
            />
          </Link>
        </div>

        {/* Product Details */}
        <div className="flex-grow space-y-2">
          <Link
            to={`/product/${item.product._id}`}
            className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
          >
            {item.product.title}
          </Link>

          <div className="space-y-1 text-sm text-gray-600">
            <p>
              <span className="font-medium">Size:</span> {item.selectedSize}
            </p>
            {item.customization?.enabled && (
              <p>
                <span className="font-medium">Customization:</span>{" "}
                {item.customization.playerName} #
                {item.customization.playerNumber}
              </p>
            )}
            <p>
              <span className="font-medium">Unit Price:</span>{" "}
              {formatPrice(item.unitPrice)}
            </p>
          </div>

          {/* Customization Display */}
          {item.customization?.enabled && (
            <div className="bg-blue-50 rounded-md p-2 text-sm">
              <span className="text-blue-800 font-medium">Custom: </span>
              <span className="text-blue-700">
                {item.customization.playerName} #
                {item.customization.playerNumber}
              </span>
            </div>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
              className={`p-2 hover:bg-gray-50 transition-colors ${
                item.quantity <= 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700"
              }`}
            >
              <MinusIcon className="h-4 w-4" />
            </button>

            <span className="px-4 py-2 text-center min-w-[3rem] border-x border-gray-300">
              {item.quantity}
            </span>

            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={item.quantity >= 10}
              className={`p-2 hover:bg-gray-50 transition-colors ${
                item.quantity >= 10
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700"
              }`}
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={handleRemove}
            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
            title="Remove item"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Item Total */}
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">
            {formatPrice(item.totalPrice)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
