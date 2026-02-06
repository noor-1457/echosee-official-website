import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#2c5364] text-white pt-16 pb-8 px-6 md:px-20">

      <div className="grid md:grid-cols-4 gap-10 max-w-7xl mx-auto">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-[#00c6ff]">
            EchoSee
          </h2>

          <p className="text-gray-300 text-sm leading-relaxed">
            Smart glasses powered by AI to empower the hearing-impaired
            community with real-time subtitles and emotional cues.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-gray-300">
            <li>
              <Link to="/" className="hover:text-[#00c6ff]">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#00c6ff]">
                About
              </Link>
            </li>
            <li>
              <Link to="/product" className="hover:text-[#00c6ff]">
                Product
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-[#00c6ff]">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#00c6ff]">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Support
          </h3>

          <ul className="space-y-2 text-gray-300">
            <li>FAQs</li>
            <li>Help Center</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Newsletter
          </h3>

          <p className="text-gray-300 text-sm mb-4">
            Get updates about EchoSee and new features.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-2 rounded-l-md text-black border focus:outline-none"
            />

            <button className="bg-[#00c6ff] px-4 rounded-r-md hover:opacity-90">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-white/20 mt-12 pt-6 text-center text-sm text-gray-300">

        {/* Social Icons */}
        <div className="flex justify-center gap-5 mb-4">

          <a href="#" className="hover:text-[#00c6ff]">
            <Facebook size={20} />
          </a>

          <a href="#" className="hover:text-[#00c6ff]">
            <Instagram size={20} />
          </a>

          <a href="#" className="hover:text-[#00c6ff]">
            <Twitter size={20} />
          </a>

          <a href="#" className="hover:text-[#00c6ff]">
            <Linkedin size={20} />
          </a>

        </div>

        <p>
          © {new Date().getFullYear()} EchoSee. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
};

export default Footer;
