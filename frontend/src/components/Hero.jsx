// HeroSection.jsx
import React from "react";
import hero from "../assets/hero.png";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${hero})` }}
    >
      {/* Overlay (optional but looks professional) */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
          EchoSee Smart Glasses
        </h1>

        <p className="text-lg md:text-xl mb-6 text-gray-200 max-w-xl mx-auto">
          Experience the future of AR smart glasses with live subtitles and
          futuristic design.
        </p>

        <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
          Watch Demo
        </button>
      </div>
    </section>
  );
};

export default Hero;
