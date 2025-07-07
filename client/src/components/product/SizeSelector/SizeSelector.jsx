import React from "react";

const SizeSelector = ({
  sizes,
  selectedSize,
  onSizeChange,
  productType = "jersey",
}) => {
  const getSizeLabel = (size) => {
    if (productType === "shoes") {
      return `UK ${size}`;
    }
    return size;
  };

  const getSizeDescription = (size) => {
    if (productType === "shoes") {
      return `UK Size ${size}`;
    }

    const descriptions = {
      XS: "Extra Small",
      S: "Small",
      M: "Medium",
      L: "Large",
      XL: "Extra Large",
      XXL: "Double XL",
    };
    return descriptions[size] || size;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Size</h3>
        <button className="text-sm text-blue-600 hover:text-blue-500">
          Size Guide
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`relative p-3 text-center border rounded-lg transition-all ${
              selectedSize === size
                ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-200"
                : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
            }`}
          >
            <div className="font-medium">{getSizeLabel(size)}</div>
            <div className="text-xs text-gray-500 mt-1">
              {getSizeDescription(size)}
            </div>

            {selectedSize === size && (
              <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                ✓
              </div>
            )}
          </button>
        ))}
      </div>

      {!selectedSize && (
        <p className="text-sm text-red-600">Please select a size</p>
      )}
    </div>
  );
};

export default SizeSelector;
