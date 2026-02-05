import React from "react";
import product from "../assets/product.webp";
import video from "../assets/productVideoOptimized.mp4";
import { motion } from "framer-motion";

const listItems = [
  "Supports 1080P HD video recording for hands-free adventures",
  "AI Translation in 110+ languages for global communication",
  "Bluetooth 5.3 with ultra-low power and stable connection",
  "220mAh battery with up to 7 hours music playback",
  "Fashion-forward design with automatic color-changing blue-light lenses",
];

const Description = () => {
  return (
    <>
      {/* ================= PRODUCT DESCRIPTION SECTION ================= */}
      <section className="w-full px-20 py-20 bg-[#0f2027] text-white">
        <div className="flex gap-14 items-start">
          {/* Product Image */}
          <div className="w-1/2 flex justify-center">
            <motion.img
              src={product}
              alt="EchoSee Smart Glasses"
              className="w-full max-w-lg rounded-xl shadow-2xl"
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
          </div>

          {/* Text Content */}
          <div className="w-1/2">
            <motion.h1
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              EchoSee AI Smart Glasses
            </motion.h1>

            <motion.p
              className="text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              AI Smart Glasses with 1080P HD Camera, Real-Time AI Translation,
              Bluetooth Audio and Hands-Free Video Recording — designed for
              travel, sports and everyday smart living.
            </motion.p>

            {/* Specs Table */}
            <motion.table
              className="w-full border border-gray-600 border-collapse text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <tbody>
                {[
                  ["Camera", "1080P HD Built-in Camera"],
                  ["AI Translation", "Real-Time (110+ Languages)"],
                  ["Connectivity", "Bluetooth 5.3"],
                  ["Battery", "220mAh Lithium Battery"],
                  ["Usage Time", "7h Music · 3h Calls · 1.5h Charging"],
                  [
                    "Special Features",
                    "Hands-Free Recording, Smart Audio, AI Assist",
                  ],
                ].map(([key, value], index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="p-3 font-semibold w-1/3">{key}</td>
                    <td className="p-3 text-gray-300">{value}</td>
                  </tr>
                ))}
              </tbody>
            </motion.table>
          </div>
        </div>

        {/* ================= ABOUT SECTION ================= */}
        <div className="mt-20 max-w-4xl">
          <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            About this item
          </motion.h2>

          <ul className="list-disc ml-6 space-y-4 text-gray-300">
            {listItems.map((item, index) => (
              <motion.li
                key={index}
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 22,
                  delay: index * 0.15,
                }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= VIDEO SECTION ================= */}
      <section className="w-full py-20 flex justify-center bg-black">
        <motion.video
          src={video}
          controls
          className="w-full max-w-6xl rounded-xl shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
      </section>
    </>
  );
};

export default Description;
