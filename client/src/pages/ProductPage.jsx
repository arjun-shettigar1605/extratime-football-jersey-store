import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeftIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { productService } from "../services/productService";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductGallery from "../components/product/ProductGallery/ProductGallery";
import SizeSelector from "../components/product/SizeSelector/SizeSelector";
import CustomizationForm from "../components/product/CustomizationForm/CustomizationForm";
import QuantitySelector from "../components/product/QuantitySelector/QuantitySelector";
import Button from "../components/common/Button/Button";
import toast from "react-hot-toast";

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState({
    enabled: false,
    playerName: "",
    playerNumber: "",
  });
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(error.message);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateTotalPrice = () => {
    let total = product.price;
    if (customization.enabled) {
      total += product.customizationPrice;
    }
    return total * quantity;
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    if (
      customization.enabled &&
      (!customization.playerName || !customization.playerNumber)
    ) {
      toast.error("Please complete customization details");
      return;
    }

    addToCart(product, quantity, selectedSize, customization);
  };

  const toggleWishlist = () => {
    if (!product) return;

    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const getProductType = () => {
    return product.category?.slug === "football-shoes" ? "shoes" : "jersey";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Product not found
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors inline-block"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            to={`/category/${product.category?.slug}`}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to {product.category?.name}
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Product Gallery */}
            <div>
              <ProductGallery product={product} />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {product.title}
                  </h1>
                  <button
                    onClick={toggleWishlist}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    {isInWishlist(product._id) ? (
                      <HeartSolidIcon className="h-6 w-6 text-red-500" />
                    ) : (
                      <HeartIcon className="h-6 w-6" />
                    )}
                  </button>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice &&
                    product.originalPrice > product.price && (
                      <>
                        <span className="text-lg text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-medium">
                          Save{" "}
                          {formatPrice(product.originalPrice - product.price)}
                        </span>
                      </>
                    )}
                </div>

                {/* Stock Status */}
                <div className="mb-4">
                  {product.stock > 0 ? (
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-green-700 font-medium">
                        In Stock
                      </span>
                      <span className="text-gray-500 ml-2">
                        ({product.stock} available)
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-red-700 font-medium">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Size Selection */}
              <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
                productType={getProductType()}
              />

              {/* Customization */}
              <CustomizationForm
                isCustomizable={product.customizable}
                customizationPrice={product.customizationPrice}
                onCustomizationChange={setCustomization}
              />

              {/* Quantity */}
              <QuantitySelector
                quantity={quantity}
                onQuantityChange={setQuantity}
                max={Math.min(10, product.stock)}
              />

              {/* Price Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Product Price:</span>
                    <span>{formatPrice(product.price)}</span>
                  </div>
                  {customization.enabled && (
                    <div className="flex justify-between">
                      <span>Customization:</span>
                      <span>+{formatPrice(product.customizationPrice)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span>×{quantity}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>{formatPrice(calculateTotalPrice())}</span>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                variant="primary"
                size="lg"
                className="w-full"
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>

              {/* Product Info */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">
                  Product Information
                </h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Category: {product.category?.name}</li>
                  <li>• Available Colors: {product.colors.join(", ")}</li>
                  {product.customizable && (
                    <li>
                      • Customization available (+
                      {formatPrice(product.customizationPrice)})
                    </li>
                  )}
                  <li>• Free shipping on orders above ₹2,000</li>
                  <li>• 30-day return policy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
