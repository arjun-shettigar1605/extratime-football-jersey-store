import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "2024-25 Jerseys",
      description: "Get the latest jerseys from top teams",
      image:
        "/images/2425.png",
      link: "/category/2024-25-jerseys",
    },
    {
      id: 2,
      title: "Retro Jerseys",
      description: "Classic designs from football history",
      image:
        "/images/retrocarousel.png",
      link: "/category/retro-jerseys",
    },
    {
      id: 3,
      title: "Clearance Sale",
      description: "Up to 50% off on selected items",
      image:
        "/images/clearancecarousel.png",
      link: "/category/clearance",
    },
    {
      id: 4,
      title: "Full Sleeves Jerseys",
      description: "Perfect for cooler weather",
      image:
        "/images/fullsleevescarousel.png",
      link: "/category/full-sleeves-jerseys",
    },
    {
      id: 5,
      title: "Anthem Jackets",
      description: "Official team anthem jackets",
      image:
        "/images/anthemjacketcarousel.png",
      link: "/category/anthem-jackets",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-96 bg-gray-200 overflow-hidden rounded-lg">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full h-full flex-shrink-0 relative"
          >
          <div  
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-black/40"/>
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl mb-6">{slide.description}</p>
                <a
                  href={slide.link}
                  className="bg-lime-300 hover:bg-lime-600 text-black px-6 py-3 rounded-lg text-lg font-medium transition-colors inline-block"
                >
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
