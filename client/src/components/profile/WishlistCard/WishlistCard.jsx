import React from "react";
import { Link } from "react-router-dom";
import { TrashIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useWishlist } from "../../../context/WishlistContext";
import { useCart } from "../../../context/CartContext";
import toast from "react-hot-toast";

const WishlistCard = ({ product }) => {
  const { removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleRemove = () => {
    removeFromWishlist(product._id);
  };

  const handleAddToCart = () => {
    // For wishlist to cart, we'll use default size and no customization
    const defaultSize = product.sizes?.[0] || "M";
    addToCart(product, 1, defaultSize, { enabled: false });
    removeFromWishlist(product._id);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        {/* Product Image */}
        <Link to={`/product/${product._id}`} className="flex-shrink-0">
          <img
            src={product.images?.[0] || "https://via.placeholder.com/80x80"}
            alt={product.title}
            className="w-20 h-20 object-cover rounded-lg hover:opacity-75 transition-opacity"
          />
        </Link>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <Link
            to={`/product/${product._id}`}
            className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
          >
            {product.title}
          </Link>

          <div className="mt-2 flex items-center space-x-4">
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

          {/* Stock Status */}
          <div className="mt-2">
            {product.stock > 0 ? (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                In Stock
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Out of Stock
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-2">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              product.stock > 0
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <ShoppingCartIcon className="h-4 w-4 mr-1" />
            Add to Cart
          </button>

          <button
            onClick={handleRemove}
            className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
          >
            <TrashIcon className="h-4 w-4 mr-1" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
