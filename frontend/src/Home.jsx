import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // <-- ROUTING CONNECTED
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const featureRef = useRef([]);

  /* ===== SCROLL ANIMATION LOGIC ===== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
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

  /* ===== TYPING EFFECT FOR SUBTITLE ===== */
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
    <div className="home">

      {/* ===================== HERO SECTION ===================== */}
      {/* IMPLEMENTED:
          - Gradient background motion
          - Text fade + slide animation
          - Typing subtitle animation
          - CTA hover glow
          - Keyboard focus accessibility
          - Routing connected
      */}

      <section className="hero">

        <h1 className="tagline">
          See What You Cannot Hear
        </h1>

        <p className="subtitle" id="typing-text"></p>

        <div className="cta-buttons">

          <button
            className="primary-btn"
            aria-label="Pre Order Now"
            onClick={() => navigate("/preorder")}   // <-- ROUTING CONNECTED
          >
            Pre-Order Now
          </button>

          <button
            className="secondary-btn"
            aria-label="Learn More"
            onClick={() => navigate("/product")}   // <-- ROUTING CONNECTED
          >
            Learn More
          </button>

        </div>
      </section>

      {/* ================= PRODUCT HIGHLIGHTS ================= */}
      {/* IMPLEMENTED:
          - Feature cards grid
          - Micro-interaction hover lift
          - SCROLL reveal animation added
      */}

      <section className="features">

        <h2>Product Highlights</h2>

        <div className="feature-grid">

          {[
            "Real-time subtitles on AR lens",
            "Adjustable font size",
            "Emoji-based emotion display",
            "Multilingual support",
            "Works offline with AI chip",
            "Battery life: 10–12 hours"
          ].map((feature, index) => (
            <div
              key={index}
              ref={(el) => (featureRef.current[index] = el)}
              className="feature-card hidden"
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
