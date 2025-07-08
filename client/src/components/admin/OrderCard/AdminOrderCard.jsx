import React, { useState } from "react";
import { CalendarIcon, UserIcon } from "@heroicons/react/24/outline";
import { adminService } from "../../../services/adminService";
import toast from "react-hot-toast";

const AdminOrderCard = ({ order, onOrderUpdate }) => {
  const [updating, setUpdating] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(order.status);

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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      confirmed: "bg-blue-100 text-blue-800 border-blue-200",
      processing: "bg-purple-100 text-purple-800 border-purple-200",
      shipped: "bg-indigo-100 text-indigo-800 border-indigo-200",
      delivered: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const handleStatusChange = async (newStatus) => {
    if (newStatus === currentStatus) return;

    try {
      setUpdating(true);
      await adminService.updateOrderStatus(order._id, newStatus);
      setCurrentStatus(newStatus);
      toast.success("Order status updated successfully");

      // Notify parent component to refresh data
      if (onOrderUpdate) {
        onOrderUpdate();
      }
    } catch (error) {
      toast.error("Failed to update order status");
      console.error("Error updating order status:", error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Order Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Order #{order.orderNumber}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                currentStatus
              )}`}
            >
              {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2" />
              {formatDate(order.createdAt)}
            </div>
            <div className="flex items-center">
              <UserIcon className="h-4 w-4 mr-2" />
              {order.user?.name || "Unknown User"}
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Order Items:</h4>
        <div className="space-y-2">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={
                    item.product?.images?.[0] ||
                    "https://via.placeholder.com/40x40/E5E7EB/9CA3AF?text=Product"
                  }
                  alt={item.title}
                  className="w-10 h-10 object-cover rounded"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-600">
                    Size: {item.selectedSize} • Qty: {item.quantity}
                  </p>
                  {item.customization?.enabled && (
                    <p className="text-xs text-blue-600">
                      Custom: {item.customization.playerName} #
                      {item.customization.playerNumber}
                    </p>
                  )}
                </div>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {formatPrice(item.totalPrice)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary & Status Update */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div>
          <p className="text-lg font-bold text-gray-900">
            Total: {formatPrice(order.pricing.total)}
          </p>
          <p className="text-sm text-gray-600">
            Customer: {order.shippingAddress.fullName}
          </p>
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center space-x-3">
          <label className="text-sm font-medium text-gray-700">
            Update Status:
          </label>
          <select
            value={currentStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={updating}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          {updating && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderCard;
