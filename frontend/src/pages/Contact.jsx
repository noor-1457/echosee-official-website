import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section className="w-full min-h-screen bg-[#0f2027] text-white px-20 py-20">
      {/* Heading */}
      <motion.h1
        className="text-4xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        Contact EchoSee
      </motion.h1>

      <motion.p
        className="text-center text-gray-300 max-w-2xl mx-auto mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        Have questions about EchoSee Smart Glasses? Reach out to us — we’d love
        to hear from you.
      </motion.p>

      {/* Content */}
      <div className="flex gap-16 items-start">
        {/* Contact Info */}
        <motion.div
          className="w-1/2 space-y-8"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1 }}
        >
          <div>
            <h3 className="text-xl font-semibold mb-2">📍 Address</h3>
            <p className="text-gray-300">
              EchoSee Labs
              <br />
              Innovation Street, Tech City
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">📧 Email</h3>
            <p className="text-gray-300">support@echosee.ai</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">📞 Phone</h3>
            <p className="text-gray-300">+1 (234) 567-890</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">🌐 Social</h3>
            <p className="text-gray-300">Twitter · LinkedIn · GitHub</p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          className="w-1/2 bg-[#0b1620] p-10 rounded-2xl shadow-2xl space-y-6"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1 }}
        >
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:border-sky-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:border-sky-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">Message</label>
            <textarea
              rows="5"
              placeholder="Write your message...."
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:border-sky-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-400 text-black py-3 rounded-lg font-semibold hover:shadow-[0_0_20px_#00c6ff] transition"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
