import React from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useWishlist } from "../../context/WishlistContext";
import WishlistCard from "../../components/profile/WishlistCard/WishlistCard";
import Button from "../../components/common/Button/Button";

const Wishlist = () => {
  const { items, totalItems, clearWishlist } = useWishlist();

  const handleClearWishlist = () => {
    if (
      window.confirm("Are you sure you want to clear your entire wishlist?")
    ) {
      clearWishlist();
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <HeartIcon className="mx-auto h-12 w-12 text-lime-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Your wishlist is empty
        </h3>
        <p className="text-gray-600 mb-4">
          Save items you love to your wishlist and shop them later.
        </p>
        <a
          href="/"
          className="bg-lime-300 hover:bg-lime-500 text-neutral-800 px-6 py-3 rounded-lg transition-colors inline-block"
        >
          Start Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">My Wishlist</h2>
            <p className="text-sm text-gray-600 mt-1">
              {totalItems} item{totalItems !== 1 ? "s" : ""} saved
            </p>
          </div>

          <Button
            onClick={handleClearWishlist}
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            Clear Wishlist
          </Button>
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="space-y-4">
        {items.map((product) => (
          <WishlistCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
