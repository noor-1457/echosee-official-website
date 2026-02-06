import { motion } from "framer-motion";
import specs from "../assets/hard-specs.webp";

const HardSpecs = () => {
  return (
    <section className="w-full bg-[#0f2027] text-white px-20 py-20">
      {/* Heading */}
      <motion.h1
        className="text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        EchoSee AI Smart Glasses – Hardware Specs
      </motion.h1>

      {/* Content */}
      <div className="flex gap-14 items-center">
        {/* Image */}
        <motion.img
          src={specs}
          alt="Hardware Specs"
          className="w-1/2 rounded-xl shadow-xl"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1 }}
        />

        {/* Text */}
        <motion.p
          className="w-1/2 text-gray-300 leading-relaxed text-lg"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1 }}
        >
          EchoSee is designed to fit most people while maintaining a lightweight
          and comfortable build. Weighing just over 40g, the device delivers
          all-day battery life under normal usage. It features a color display,
          a low-power optical sensor for AI inference, dual microphones with
          audio activity detection, a dedicated low-power AI processor, and dual
          bone-conduction speakers.
          <br />
          <br />
          EchoSee is fully open-source, with design files and code available on
          GitHub. The glasses support an IPD (inter-pupillary distance) range of
          58–72mm, covering most users. We recommend using the Eye Measure app
          to ensure compatibility.
        </motion.p>
      </div>
    </section>
  );
};

export default HardSpecs;
