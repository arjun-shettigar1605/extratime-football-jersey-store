import React from "react";
import { Link } from "react-router-dom";

const CategoryGrid = () => {
  const categories = [
    {
      id: 1,
      name: "2024-25 Jerseys",
      image:
        "/src/assets/images/home/2425category.png",
      link: "/category/2024-25-jerseys",
      description: "Season jerseys",
    },
    {
      id: 2,
      name: "Retro Jerseys",
      image:
        "/src/assets/images/home/retrocategory.png",
      link: "/category/retro-jerseys",
      description: "Classic vintage designs",
    },
    {
      id: 3,
      name: "Football Shoes",
      image:
        "/src/assets/images/home/shoescategory.png",
      link: "/category/football-shoes",
      description: "Professional boots & cleats",
    },
    {
      id: 4,
      name: "Anthem Jackets",
      image:
        "/src/assets/images/home/anthemcategory.png",
      link: "/category/anthem-jackets",
      description: "Official team jackets",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={category.link}
          className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <div className="h-48 relative"/>
          <div className="absolute inset-0"
            style={{
              backgroundImage: `url(${category.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
          <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl text-white font-bold mb-1">
                {category.name}
              </h3>
              <p className="text-sm opacity-90">{category.description}</p>
            </div>
            <div className="absolute top-4 right-4 bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-medium group-hover:bg-lime-300 group-hover:text-black transition-all">
              Shop →
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;
