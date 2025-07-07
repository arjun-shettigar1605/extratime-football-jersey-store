import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import {
  UserIcon,
  ShoppingCartIcon,
  HeartIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const ProfileOverview = () => {
  const { user } = useAuth();
  const { totalItems: cartItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();

  const stats = [
    {
      name: "Cart Items",
      value: cartItems,
      icon: ShoppingCartIcon,
      color: "blue",
      link: "/cart",
    },
    {
      name: "Wishlist Items",
      value: wishlistItems,
      icon: HeartIcon,
      color: "red",
      link: "/profile/wishlist",
    },
    {
      name: "Total Orders",
      value: "0", // We'll update this later
      icon: ClockIcon,
      color: "green",
      link: "/profile/orders",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-lime-200 rounded-full flex items-center justify-center mr-4">
            <UserIcon className="h-8 w-8 text-neutral-800" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name}!
            </h2>
            <p className="text-gray-600">
              Manage your account settings and view your activity
            </p>
          </div>
        </div>
      </div>

      {/* User Details */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Account Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <p className="mt-1 text-sm text-gray-900">{user?.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Account Type
            </label>
            <p className="mt-1 text-sm text-gray-900 capitalize">
              {user?.role}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Member Since
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            to={stat.link}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div
                className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center mr-4`}
              >
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/profile/change-password"
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <h4 className="font-medium text-gray-900">Change Password</h4>
            <p className="text-sm text-gray-600">
              Update your account password
            </p>
          </Link>
          <Link
            to="/profile/orders"
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <h4 className="font-medium text-gray-900">View Orders</h4>
            <p className="text-sm text-gray-600">Check your order history</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
