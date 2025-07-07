import React from "react";
import { NavLink } from "react-router-dom";
import {
  UserIcon,
  KeyIcon,
  ClockIcon,
  HeartIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../../context/AuthContext";

const ProfileSidebar = () => {
  const { user, logout } = useAuth();

  const menuItems = [
    {
      name: "Profile",
      href: "/profile",
      icon: UserIcon,
      end: true,
    },
    {
      name: "Change Password",
      href: "/profile/change-password",
      icon: KeyIcon,
    },
    {
      name: "Order History",
      href: "/profile/orders",
      icon: ClockIcon,
    },
    {
      name: "Wishlist",
      href: "/profile/wishlist",
      icon: HeartIcon,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* User Info */}
      <div className="text-center mb-6 pb-6 border-b border-gray-200">
        <div className="w-16 h-16 bg-lime-200 rounded-full flex items-center justify-center mx-auto mb-3">
          <UserIcon className="h-8 w-8 text-neutral-800" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{user?.name}</h3>
        <p className="text-sm text-gray-600">{user?.email}</p>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? "bg-lime-100 text-neutral-700 border-r-4 border-lime-300"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        ))}

        {/* Logout Button */}
        <button
          onClick={logout}
          className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors"
        >
          <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default ProfileSidebar;
