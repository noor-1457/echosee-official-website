import { useEffect, useRef, useState } from "react";
import Partnerships from "../components/Partnerships";
import FAQSection from "../components/FAQSection";
import AfterSalesServices from "../components/AfterSalesServices";
import PricingPlans from "../components/PricingPlans";
import Mic from "../assets/Mic.jpg"

const steps = [
  {
    title: "Mic Captures Sound",
    desc: "The microphone captures your voice clearly, even in noisy surroundings, so every word is recorded accurately.",
    image: Mic,
  },
  {
    title: "AI Converts to Text",
    desc: "AI quickly processes your speech and turns it into accurate text in real-time without any delay.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800",
  },
  {
    title: "Subtitles on Glasses",
    desc: "The text appears instantly on smart glasses as live subtitles, making conversations easy to follow.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVmpw9BQb2pOGiZcOqBMbv0em6qcp9evFgyg&s",
  },
];

export default function HowItWorks() {
 const [show, setShow] = useState(false);
  const [typedText, setTypedText] = useState("");

  const subtitle = "Hello! Smart subtitles in real time...";

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById("how-it-works");
      if (section.getBoundingClientRect().top < window.innerHeight - 80) {
        setShow(true);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!show) return;

    let i = 0;
    const timer = setInterval(() => {
      setTypedText(subtitle.slice(0, i));
      i++;
      if (i > subtitle.length) clearInterval(timer);
    }, 50); // 🔥 faster typing

    return () => clearInterval(timer);
  }, [show]);
  return (
    <>
     <section
      id="how-it-works"
      className="py-20 bg-gradient-to-b from-black to-gray-900 text-white"
    >
      <h2 className="text-4xl font-bold text-center mb-14">
        How It Works
      </h2>

      <div className="max-w-8xl mx-auto grid md:grid-cols-3 gap-10 px-6 relative">

        {steps.map((step, index) => (
          <div
            key={index}
            className={`bg-gray-800 rounded-2xl overflow-hidden shadow-xl 
            transition-all duration-400 ease-out
            ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: `${index * 12}ms` }} // ⚡ faster appear
          >
            <img
              src={step.image}
              alt={step.title}
              className="h-80 w-full object-center hover:scale-105 transition-transform duration-300 hover:shadow-blue-500/40"
            />

            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">
                {step.title}
              </h3>

              <p className="text-gray-400">
                {step.desc}
              </p>

              {index === 2 && (
                <div className="mt-4 bg-black border border-green-500 text-green-400 p-2 rounded font-mono text-sm">
                  {typedText}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Arrows */}
        <div className="hidden md:block absolute top-1/2 left-[33%] text-blue-400 text-3xl animate-pulse">
          →
        </div>

        <div className="hidden md:block absolute top-1/2 left-[66%] text-blue-400 text-3xl animate-pulse">
          →
        </div>

      </div>
    </section>
      <PricingPlans />
      <AfterSalesServices />
      <Partnerships />
      <FAQSection />
    </>
  );
}
