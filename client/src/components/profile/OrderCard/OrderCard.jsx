import React from "react";
import { Link } from "react-router-dom";
import { CalendarIcon, TruckIcon } from "@heroicons/react/24/outline";

const OrderCard = ({ order }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      processing: "bg-purple-100 text-purple-800",
      shipped: "bg-indigo-100 text-indigo-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getProductImage = (item) => {
    if(item.product?.images?.[0]){
        return item.product.images[0];
    }
    return `https://via.placeholder.com/50x50/E5E7EB/9CA3AF?text=${encodeURIComponent("Product")}`;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      {/* Order Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">
            Order #{order.orderNumber}
          </h3>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <CalendarIcon className="h-4 w-4 mr-1" />
            {formatDate(order.createdAt)}
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            order.status
          )}`}
        >
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>

      {/* Order Items */}
      <div className="space-y-2 mb-4">
        {order.items.slice(0, 2).map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-12 h-12 flex-shrink-0">
              <img
                src={getProductImage(item)}
                // alt={getProductTitle(item)}
                className="w-full h-full object-cover rounded"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.target.src = `https://via.placeholder.com/50x50/E5E7EB/9CA3AF?text=Product`;
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {item.title}
              </p>
              <div className="flex items-center text-xs text-gray-600 space-x-2">
                <span>Size: {item.selectedSize}</span>
                <span>•</span>
                <span>Qty: {item.quantity}</span>
                {item.customization?.enabled && (
                  <>
                    <span>•</span>
                    <span>
                      Custom: {item.customization.playerName} #
                      {item.customization.playerNumber}
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="text-sm font-medium text-gray-900">
              {formatPrice(item.totalPrice)}
            </div>
          </div>
        ))}

        {order.items.length > 2 && (
          <p className="text-sm text-gray-600 pl-15">
            +{order.items.length - 2} more items
          </p>
        )}
      </div>

      {/* Order Summary */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div className="flex items-center text-sm text-gray-600">
          <TruckIcon className="h-4 w-4 mr-1" />
          {order.items.length} item{order.items.length !== 1 ? "s" : ""}
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">
            {formatPrice(order.pricing.total)}
          </p>
          <Link
            to={`/order-success/${order._id}`}
            className="text-sm text-neutral-900 hover:text-neutral-950"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
