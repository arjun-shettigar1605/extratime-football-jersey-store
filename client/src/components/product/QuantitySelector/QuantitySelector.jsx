import React from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

const QuantitySelector = ({ quantity, onQuantityChange, max = 10 }) => {
  const decreaseQuantity = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= max) {
      onQuantityChange(value);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium text-gray-900">Quantity</h3>

      <div className="flex items-center space-x-3">
        <button
          onClick={decreaseQuantity}
          disabled={quantity <= 1}
          className={`p-2 rounded-md border transition-colors ${
            quantity <= 1
              ? "border-gray-200 text-gray-400 cursor-not-allowed"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          <MinusIcon className="h-4 w-4" />
        </button>

        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          min={1}
          max={max}
          className="w-16 text-center py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <button
          onClick={increaseQuantity}
          disabled={quantity >= max}
          className={`p-2 rounded-md border transition-colors ${
            quantity >= max
              ? "border-gray-200 text-gray-400 cursor-not-allowed"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          <PlusIcon className="h-4 w-4" />
        </button>

        <span className="text-sm text-gray-500">(Max: {max})</span>
      </div>
    </div>
  );
};

export default QuantitySelector;
