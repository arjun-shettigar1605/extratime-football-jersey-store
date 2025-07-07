import React from "react";
import { useAuth } from "../context/AuthContext";
import HeroCarousel from "../components/home/HeroCarousel";
import CategoryGrid from "../components/home/CategoryGrid";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to Extra Time Store
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Discover authentic jerseys, retro classics, and the latest football
            gear
          </p>
        </div>

        {/* Hero Carousel */}
        <HeroCarousel />
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Shop by Category
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Find exactly what you're looking for
          </p>
        </div>

        <CategoryGrid />
      </section>

      {/* Additional Features Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                🚚
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Free Shipping
              </h3>
              <p className="text-gray-600">
                Free delivery on orders above ₹2,000
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                ✅
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Authentic Products
              </h3>
              <p className="text-gray-600">
                100% genuine jerseys and merchandise
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                🔄
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Easy Returns
              </h3>
              <p className="text-gray-600">30-day hassle-free return policy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
