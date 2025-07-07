import React from "react";
import { Link } from "react-router-dom";



const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateDiscount = () => {
    if (product.originalPrice && product.originalPrice > product.price) {
      return Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      );
    }
    return 0;
  };

  const discount = calculateDiscount();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <Link to={`/product/${product._id}`}>
        <div className="relative overflow-hidden">
          {/* Product Image */}
          <img
            src={
              product.images[0] ||
              "https://via.placeholder.com/400x400/E5E7EB/9CA3AF?text=No+Image"
            }
            alt={product.title}
            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
              -{discount}%
            </div>
          )}

          {/* Stock Status */}
          {product.stock === 0 && (
            <div className="absolute top-3 right-3 bg-gray-800 text-white px-2 py-1 rounded-md text-sm font-medium">
              Out of Stock
            </div>
          )}

          {/* Featured Badge */}
          {product.isFeatured && (
            <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium">
              Featured
            </div>
          )}
        </div>

        <div className="p-4">
          {/* Product Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 transition-colors min-h-[3.5rem]">
            {product.title}
          </h3>

          {/* Price Section */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
            </div>
          </div>

          {/* Customization Info */}
          {product.customizable && (
            <div className="mb-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ✨ Customizable
              </span>
            </div>
          )}

          {/* Stock Info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center text-sm">
              {product.stock > 0 ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-green-700">
                    In Stock ({product.stock})
                  </span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-red-700">Out of Stock</span>
                </>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
              product.stock > 0
                ? "bg-neutral-800 hover:bg-neutral-700 text-lime-300 transform hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? "View Details" : "Out of Stock"}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
