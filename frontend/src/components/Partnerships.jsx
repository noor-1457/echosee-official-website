const partners = [
  { name: "Schools", logo: "🏫" },
  { name: "Universities", logo: "🎓" },
  { name: "NGOs", logo: "🤝" },
  { name: "Hospitals", logo: "🏥" },
  { name: "Corporates", logo: "🏢" },
];

export default function Partnerships() {
  return (
    <section className="py-24 bg-gray-950 text-white overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-14">
        Our Trusted Partners
      </h2>

      {/* Auto Scroll Carousel */}
      <div className="relative w-full overflow-hidden">

        <div className="flex gap-10 animate-scroll whitespace-nowrap">

          {[...partners, ...partners].map((item, index) => (
            <div
              key={index}
              className="min-w-[220px] bg-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center
              transform transition-all duration-300 hover:scale-110 hover:rotate-1 shadow-xl"
            >
              <div className="text-6xl mb-4">{item.logo}</div>
              <p className="text-lg font-semibold text-gray-300">
                {item.name}
              </p>
            </div>
          ))}

        </div>
      </div>

      {/* Optional Static Cards */}
      <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto mt-20 px-6">

        {partners.map((item, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-xl p-6 text-center border border-gray-700
            transition-all duration-300 hover:-translate-y-3 hover:scale-105"
          >
            <div className="text-4xl mb-3">{item.logo}</div>
            <h4 className="font-semibold">{item.name}</h4>
          </div>
        ))}

      </div>
    </section>
  );
}
