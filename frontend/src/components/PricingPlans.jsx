import { useState } from "react";

export default function PricingPlans() {
  const [plan, setPlan] = useState("basic");

  return (
    <section className="py-24 bg-gray-950 text-white">
      <h2 className="text-4xl font-bold text-center mb-12">Pricing & Plans</h2>

      {/* Toggle */}
      <div className="flex justify-center mb-16">
        <div className="bg-gray-800 rounded-full p-1 flex items-center w-67 relative">
          <button
            onClick={() => setPlan("basic")}
            className="w-1/2 z-10 py-2 text-sm font-semibold"
          >
            Basic
          </button>

          <button
            onClick={() => setPlan("premium")}
            className="w-1/2 z-10 py-2 text-sm font-semibold"
          >
            Premium
          </button>

          {/* Slider */}
          <div
            className={`absolute top-1 bottom-1 w-1/2 bg-indigo-600 rounded-full transition-all duration-500
            ${plan === "premium" ? "translate-x-full" : "translate-x-0"}`}
          />
        </div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
        {/* Glasses */}
        <div
          className="bg-gray-800 rounded-2xl p-8 text-center shadow-xl 
        transform transition-all duration-300 hover:-translate-y-4"
        >
          <h3 className="text-2xl font-semibold mb-4">Smart Glasses</h3>
          <p className="text-4xl font-bold mb-4">PKR 35k – 40k</p>
          <p className="text-gray-400 mb-6">One-time hardware purchase</p>

          <ul className="space-y-2 text-gray-300 mb-8">
            <li>✔ Live subtitles</li>
            <li>✔ Noise filtering</li>
            <li>✔ Bluetooth connect</li>
          </ul>

          <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200">
            Buy Now
          </button>
        </div>

        {/* Basic Plan */}
        <div
          className="bg-gray-800 rounded-2xl p-8 text-center shadow-xl 
        transform transition-all duration-300 hover:-translate-y-4"
        >
          <h3 className="text-2xl font-semibold mb-4">Basic Plan</h3>
          <p className="text-4xl font-bold mb-4">
            {plan === "basic" ? "PKR 1,500" : "PKR 2,000"}
            <span className="text-base text-gray-400"> /month</span>
          </p>

          <ul className="space-y-2 text-gray-300 mb-8">
            <li>✔ Limited translations</li>
            <li>✔ Standard accuracy</li>
            <li>✔ Cloud history</li>
          </ul>

          <button className="bg-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-500">
            Choose Plan
          </button>
        </div>

        {/* Premium Plan (Highlighted) */}
        <div
          className="relative bg-gray-900 rounded-2xl p-8 text-center shadow-2xl 
        border-2 border-indigo-500 transform transition-all duration-300 hover:-translate-y-4"
        >
          {/* Glow */}
          <div className="absolute inset-0 rounded-2xl blur-xl bg-indigo-500 opacity-20 -z-10"></div>

          <span className="text-sm bg-indigo-600 px-3 py-1 rounded-full mb-4 inline-block">
            Recommended
          </span>

          <h3 className="text-2xl font-semibold mb-4">Premium Plan</h3>

          <p className="text-4xl font-bold mb-4">
            {plan === "premium" ? "PKR 3,500" : "PKR 3,000"}
            <span className="text-base text-gray-400"> /month</span>
          </p>

          <ul className="space-y-2 text-gray-300 mb-8">
            <li>✔ Unlimited subtitles</li>
            <li>✔ High accuracy AI</li>
            <li>✔ Multi-language</li>
            <li>✔ Priority support</li>
          </ul>

          <button className="bg-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-500">
            Go Premium
          </button>
        </div>
      </div>
    </section>
  );
}
