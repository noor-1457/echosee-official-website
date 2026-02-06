import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const featureRef = useRef([]);

  /* ===== SCROLL ANIMATION ===== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-10");
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.2 }
    );

    featureRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ===== TYPING EFFECT ===== */
  useEffect(() => {
    const text = "Real-time subtitles for the hearing impaired";
    let i = 0;

    const typingElement = document.getElementById("typing-text");

    const typing = setInterval(() => {
      if (i < text.length) {
        typingElement.innerHTML += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
      }
    }, 60);

    return () => clearInterval(typing);
  }, []);

  return (
    <div
      className="
      min-h-screen
      text-white
      font-sans
      bg-gradient-to-r
      from-[#0f2027]
      via-[#203a43]
      to-[#2c5364]
      bg-[length:400%_400%]
      animate-gradient
      text-center
    "
    >
      {/* ================= HERO SECTION ================= */}

      <section
        className="
        min-h-screen
        flex
        flex-col
        items-center
        justify-center
        px-5
        py-20
        text-center
      "
      >
        <h1
          className="
          text-[clamp(2rem,5vw,3.2rem)]
          font-bold
          mb-3
          animate-fadeSlide
        "
        >
          See What You Cannot Hear
        </h1>

        <p
          id="typing-text"
          className="
          text-[clamp(1rem,3vw,1.2rem)]
          min-h-[30px]
        "
        ></p>

        {/* CTA Buttons */}

        <div
          className="
          mt-5
          flex
          gap-4
          justify-center
          flex-wrap
          max-sm:flex-col
          max-sm:items-center
        "
        >
          <button
            className="
            bg-sky-400
            px-6
            py-3
            rounded-full
            transition
            hover:shadow-[0_0_15px_#00c6ff]
            focus:outline-none
            focus:ring-2
            focus:ring-yellow-400
            max-sm:w-[80%]
          "
            onClick={() => navigate("/preorder")}
          >
            Pre-Order Now
          </button>

          <button
            className="
            border
            border-white
            px-6
            py-3
            rounded-full
            transition
            hover:shadow-[0_0_15px_white]
            focus:outline-none
            focus:ring-2
            focus:ring-yellow-400
            max-sm:w-[80%]
          "
            onClick={() => navigate("/product")}
          >
            Learn More
          </button>
        </div>
      </section>

      {/* ================= FEATURES ================= */}

      <section
        className="
        py-20
        px-5
        bg-[#0b1620]
        text-center
      "
      >
        <h2 className="text-3xl font-semibold mb-10">
          Product Highlights
        </h2>

        <div
          className="
          grid
          grid-cols-3
          gap-5
          max-w-[1000px]
          mx-auto
          px-3

          max-[900px]:grid-cols-2
          max-[600px]:grid-cols-1
        "
        >
          {[
            "Real-time subtitles on AR lens",
            "Adjustable font size",
            "Emoji-based emotion display",
            "Multilingual support",
            "Works offline with AI chip",
            "Battery life: 10–12 hours",
          ].map((feature, index) => (
            <div
              key={index}
              ref={(el) => (featureRef.current[index] = el)}
              className="
              bg-white/10
              p-5
              rounded-lg
              text-center
              transition
              duration-300

              opacity-0
              translate-y-10

              hover:-translate-y-1
            "
            >
              {feature}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
