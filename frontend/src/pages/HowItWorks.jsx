import React from "react";
import { motion } from "framer-motion";
import { Mic, Cpu, Glasses, Subtitles } from "lucide-react";

const steps = [
  {
    icon: <Mic size={40} />,
    title: "Voice Detection",
    desc: "Built-in microphones capture surrounding speech clearly in real time.",
  },
  {
    icon: <Cpu size={40} />,
    title: "AI Processing",
    desc: "Advanced AI instantly processes speech and converts it into accurate text.",
  },
  {
    icon: <Subtitles size={40} />,
    title: "Live Subtitles",
    desc: "Real-time subtitles are generated with minimal delay for natural conversation.",
  },
  {
    icon: <Glasses size={40} />,
    title: "AR Display",
    desc: "Text is projected directly onto the smart glasses lens for hands-free viewing.",
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full px-20 py-24 bg-[#0f2027] text-white">
      {/* Heading */}
      <motion.h1
        className="text-4xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        How EchoSee Smart Glasses Work
      </motion.h1>

      <motion.p
        className="text-center text-gray-300 max-w-3xl mx-auto mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        EchoSee smart glasses use AI-powered audio processing and augmented
        reality technology to deliver live subtitles directly into your field of
        view — enabling seamless communication anytime, anywhere.
      </motion.p>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="bg-[#132f3a] rounded-2xl p-8 text-center shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: index * 0.15,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex justify-center mb-4 text-blue-400">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Flow line (optional visual cue) */}
      <motion.div
        className="mt-20 text-center text-gray-400 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        🎯 From sound to subtitles — all in real time
      </motion.div>
    </section>
  );
};

export default HowItWorks;
