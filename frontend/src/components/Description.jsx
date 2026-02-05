import React from "react";
import product from "../assets/product.webp";
import video from "../assets/productVideoOptimized.mp4";
import { motion } from "framer-motion";

const Description = () => {
  return (
    <>
      <section className="w-full px-20 py-16 bg-[#0f2027] text-white">
        <div className="flex gap-12 items-start">
          {/* Product Image with 360 rotation */}
          <div className="w-1/2 flex justify-center [perspective:1000px]">
            <motion.img
              src={product}
              alt="EchoSee Smart Glasses"
              className="w-full rounded-xl "
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "linear",
              }}
            />
          </div>

          {/* Product Description */}
          <div className="w-1/2">
            <h1 className="text-3xl font-bold mb-6">
              EchoSee AI Smart Glasses
            </h1>

            <p className="text-gray-200 mb-6">
              AI Smart Glasses with 1080P HD Camera, Real-Time AI Translation,
              Bluetooth Audio and Hands-Free Video Recording — designed for
              travel, sports and everyday smart living.
            </p>

            {/* Specs Table */}
            <table className="w-full border border-gray-500 border-collapse">
              <tbody>
                <tr className="border-b border-gray-600">
                  <td className="p-3 font-semibold w-1/3">Camera</td>
                  <td className="p-3">1080P HD Built-in Camera</td>
                </tr>

                <tr className="border-b border-gray-600">
                  <td className="p-3 font-semibold">AI Translation</td>
                  <td className="p-3">
                    Real-Time Translation (110+ Languages)
                  </td>
                </tr>

                <tr className="border-b border-gray-600">
                  <td className="p-3 font-semibold">Connectivity</td>
                  <td className="p-3">Bluetooth 5.3</td>
                </tr>

                <tr className="border-b border-gray-600">
                  <td className="p-3 font-semibold">Battery</td>
                  <td className="p-3">220mAh Lithium Battery</td>
                </tr>

                <tr className="border-b border-gray-600">
                  <td className="p-3 font-semibold">Usage Time</td>
                  <td className="p-3">7h Music · 3h Calls · 1.5h Charging</td>
                </tr>

                <tr>
                  <td className="p-3 font-semibold">Special Features</td>
                  <td className="p-3">
                    Hands-Free Recording, Smart Audio, AI Assist
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* About this item */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-4">About this item</h2>
          <ul className="list-disc ml-6 space-y-3 text-gray-200">
            <li>Supports 1080P HD video recording for hands-free adventures</li>
            <li>AI Translation in 110+ languages for global communication</li>
            <li>Bluetooth 5.3 with ultra-low power and stable connection</li>
            <li>220mAh battery with up to 7 hours music playback</li>
            <li>
              Fashion-forward design with automatic color-changing blue-light
              lenses
            </li>
          </ul>
        </div>
      </section>

      {/* Video Section */}
      <div className="m-20 flex justify-center">
        <video
          src={video}
          controls
          className="rounded-xl shadow-lg w-full max-w-6xl"
        />
      </div>
    </>
  );
};

export default Description;
