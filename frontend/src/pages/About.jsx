import { motion } from "framer-motion";
import CountUp from "react-countup";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 }
};

const About = () => {
  return (
    <div className="w-full overflow-hidden">

      {/* HERO / PARALLAX */}
      <section
        className="h-[80vh] bg-fixed bg-center bg-cover flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1607746882042-944635dfe10e')"
        }}
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-white text-5xl md:text-6xl font-bold bg-black/50 px-6 py-4 rounded-xl"
        >
          Our Story
        </motion.h1>
      </section>

      {/* MISSION / VISION */}
      <section className="py-24 px-6 md:px-20 bg-white">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6 text-[#2c5364]">
            Mission & Vision
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            Our mission is to empower the hearing-impaired community
            using AI-powered smart glasses. We envision a world where
            communication barriers no longer exist.
          </p>
        </motion.div>

      </section>

      {/* PROBLEM & SOLUTION */}
      <section className="py-24 px-6 md:px-20 bg-gray-100">

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-4 text-red-500">
              The Problem
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Traditional hearing aids fail in noisy environments.
              They are expensive, uncomfortable, and socially isolating.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold mb-4 text-green-500">
              Our Solution
            </h3>

            <p className="text-gray-600 leading-relaxed">
              EchoSee converts speech into real-time subtitles and emojis
              using AI, displayed directly on AR lenses.
            </p>
          </motion.div>

        </div>

      </section>

      {/* TIMELINE */}
      <section className="py-24 px-6 md:px-20 bg-white">

        <h2 className="text-4xl font-bold text-center mb-16 text-[#2c5364]">
          Our Journey
        </h2>

        <div className="max-w-4xl mx-auto space-y-12">

          {[
            { year: "2023", text: "Idea & Research" },
            { year: "2024", text: "Prototype Development" },
            { year: "2025", text: "AI Integration" },
            { year: "2026", text: "Public Launch" }
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex gap-6 items-start"
            >
              <div className="text-[#00c6ff] text-2xl font-bold">
                {item.year}
              </div>

              <div className="bg-gray-100 p-5 rounded-xl shadow w-full">
                {item.text}
              </div>
            </motion.div>
          ))}

        </div>

      </section>

      {/* MARKET & IMPACT */}
      <section className="py-24 px-6 md:px-20 bg-[#2c5364] text-white">

        <h2 className="text-4xl font-bold text-center mb-16">
          Market & Social Impact
        </h2>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto mb-20 text-center">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-5xl font-bold text-[#00c6ff]">
              <CountUp end={430} duration={3} />M+
            </h3>
            <p className="mt-2">Global Hearing Loss</p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-5xl font-bold text-[#00c6ff]">
              <CountUp end={20} duration={3} />M+
            </h3>
            <p className="mt-2">Pakistan Users</p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-5xl font-bold text-[#00c6ff]">
              <CountUp end={70} duration={3} />%
            </h3>
            <p className="mt-2">Communication Improvement</p>
          </motion.div>

        </div>

        {/* Impact Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {[
            "Education Support",
            "Employment Access",
            "Social Inclusion"
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white text-black p-6 rounded-xl shadow-lg"
            >
              <h4 className="text-xl font-bold mb-2 text-[#2c5364]">
                {item}
              </h4>

              <p className="text-gray-600">
                Helping hearing-impaired individuals live independently
                and confidently.
              </p>
            </motion.div>
          ))}

        </div>

      </section>

    </div>
  );
};

export default About;
