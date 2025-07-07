import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../../context/AuthContext";
import SearchBar from "./SearchBar";
import NavDropdown from "./NavDropdown";
import { useCart } from "../../../context/CartContext";

const Navbar = () => {
  const { user } = useAuth();
  const { totalItems } = useCart();
  const categoryItems = [
    { name: "2024-25 Jerseys", path: "/category/2024-25-jerseys" },
    { name: "Retro Jerseys", path: "/category/retro-jerseys" },
    { name: "Anthem Jackets", path: "/category/anthem-jackets" },
    { name: "Full Sleeves Jerseys", path: "/category/full-sleeves-jerseys" },
    { name: "Football Shoes", path: "/category/football-shoes" },
  ];

  const scrollToFooter = () => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-neutral-800 shadow-lg border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Navigation */}
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-lime-300 hover:text-black hover:bg-lime-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>

            <NavDropdown title="Categories" items={categoryItems} />

            <button
              onClick={scrollToFooter}
              className="text-lime-300 hover:text-black hover:bg-lime-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Contact Us
            </button>
          </div>

          {/* Center Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <div className="w-36 rounded-lg font-bold text-xl">
                <img
                  src="../../../src/assets/images/logos/logo.png"
                  alt="Football jerseys display"
                  className="inline justify-center items-center w-48 h-full object-cover"
                />
              </div>
            </Link>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-4">
            <SearchBar />

            <Link
              to="/profile"
              className="flex items-center text-lime-300 hover:text-black hover:bg-lime-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <UserIcon className="h-5 w-5 mr-1" />
              <span className="hidden sm:block">{user?.name || "Profile"}</span>
            </Link>

            <Link
              to="/cart"
              className="relative flex items-center text-lime-300 hover:text-black hover:bg-lime-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <ShoppingCartIcon className="h-5 w-5 mr-1" />
              <span className="hidden sm:block">Cart</span>
              {totalItems>0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
