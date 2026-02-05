// HeroSection.jsx
import React from "react";
import hero from "../assets/hero.png";
import { motion } from "framer-motion";

const Hero = () => {
  const text =
    "Experience real-time subtitles and futuristic AR smart glasses.";

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
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold mb-6"
        >
          EchoSee Smart Glasses
        </motion.h1>

        <div className="flex flex-wrap gap-2">
          {text.split(" ").map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="text-lg text-gray-200"
            >
              {word}
            </motion.span>
          ))}
        </div>

        <button className="mt-5 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
          Watch Demo
        </button>
      </div>
    </section>
  );
};

export default Hero;
