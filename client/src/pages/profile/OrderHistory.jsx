import React, { useState, useEffect } from "react";
import { ClockIcon } from "@heroicons/react/24/outline";
import { orderService } from "../../services/orderService";
import OrderCard from "../../components/profile/OrderCard/OrderCard";
import toast from "react-hot-toast";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await orderService.getUserOrders();
        setOrders(data.orders);
        setPagination(data.pagination);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load order history");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading order history...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <ClockIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No orders yet
        </h3>
        <p className="text-gray-600 mb-4">
          You haven't placed any orders. Start shopping to see your order
          history here.
        </p>
        <a
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors inline-block"
        >
          Start Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Order History
        </h2>
        <p className="text-sm text-gray-600">
          {pagination.totalOrders} order
          {pagination.totalOrders !== 1 ? "s" : ""} found
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>

      {/* TODO: Add pagination if needed */}
      {pagination.totalPages > 1 && (
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Showing page {pagination.currentPage} of {pagination.totalPages}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
