import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

const faqs = [
  {
    question: "Battery kitni der tak chalti hai?",
    answer: "Smart glasses ek full charge par 6–8 hours tak continuous use provide karti hain."
  },
  {
    question: "Kya ye offline bhi kaam karti hain?",
    answer: "Basic features limited offline kaam karte hain, lekin AI subtitles ke liye internet required hota hai."
  },
  {
    question: "Kya Urdu language supported hai?",
    answer: "Yes! Urdu ke sath multiple languages supported hain including English and Arabic."
  },
  {
    question: "Warranty kitni hai?",
    answer: "Smart glasses ke sath 1 year official hardware warranty included hoti hai."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gray-950 text-white">
      <h2 className="text-4xl font-bold text-center mb-16">
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl mx-auto space-y-5 px-6">

        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden"
          >
            {/* Question */}
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-5 text-left transition-colors duration-300"
            >
              <h3 className="text-lg font-semibold">
                {faq.question}
              </h3>

              <span
                className={`transition-transform duration-300 text-2xl
                ${openIndex === index ? "rotate-180 text-indigo-500" : "rotate-0 text-gray-400"}`}
              >
              <IoChevronDown />
              </span>
            </button>

            {/* Answer */}
            <div
              className={`px-6 transition-all duration-500 ease-in-out
              ${openIndex === index ? "max-h-40 py-4 opacity-100" : "max-h-0 py-0 opacity-0"}`}
            >
              <p className="text-gray-300">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
