import { useState } from "react";

const services = [
  {
    title: "Warranty",
    desc: "1 year hardware warranty covering manufacturing defects and core components.",
  },
  {
    title: "Software Updates",
    desc: "Regular AI model improvements, bug fixes, and new feature updates automatically.",
  },
  {
    title: "Accessories Support",
    desc: "Easy replacement and upgrade for batteries, lenses, frames, and add-ons.",
  },
];

export default function AfterSalesServices() {
  const [active, setActive] = useState(null);

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="py-24 bg-black text-white">
      <h2 className="text-4xl font-bold text-center mb-16">
        After-Sales Services
      </h2>

      <div className="max-w-3xl mx-auto space-y-6 px-6">
        {services.map((item, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700"
          >
            {/* Header */}
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors duration-300"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`text-2xl transition-colors duration-300
                  ${active === index ? "text-indigo-500" : "text-gray-400"}`}
                >
                  ●
                </span>
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>

              <span
                className={`text-2xl transition-transform duration-300
                ${active === index ? "rotate-45 text-indigo-500" : "rotate-0 text-gray-400"}`}
              >
                +
              </span>
            </button>

            {/* Content */}
            <div
              className={`px-6 transition-all duration-500 ease-in-out
              ${active === index ? "max-h-40 py-4 opacity-100" : "max-h-0 py-0 opacity-0"}`}
            >
              <p className="text-gray-300">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
