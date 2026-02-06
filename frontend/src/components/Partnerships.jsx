import { FaSchool, FaUniversity, FaHandshake, FaHospital, FaBuilding } from "react-icons/fa";

const partners = [
  { name: "Schools", logo: <FaSchool /> },
  { name: "Universities", logo: <FaUniversity /> },
  { name: "NGOs", logo: <FaHandshake /> },
  { name: "Hospitals", logo: <FaHospital /> },
  { name: "Corporates", logo: <FaBuilding /> },
];


export default function Partnerships() {
  return (
    <section className="py-24 bg-gray-950 text-white overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-14">
        Our Trusted Partners
      </h2>

      {/* Auto Scroll Carousel */}
      <div className="relative w-full overflow-hidden">

        <div className="flex gap-5 animate-scroll whitespace-nowrap">

          {partners.map((item, index) => (
            <div
              key={index}
              className="min-w-[220px] bg-gray-800 mx-auto rounded-2xl p-8 flex flex-col items-center justify-center
              transform transition-all duration-300 hover:scale-[1.02] hover:rotate-1 shadow-xl"
            >
              <div className="text-6xl mb-4">{item.logo}</div>
              <p className="text-lg font-semibold text-gray-300">
                {item.name}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
