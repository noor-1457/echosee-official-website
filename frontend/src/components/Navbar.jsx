import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
   <nav className="bg-[#2c5364] w-full h-[70px] flex items-center px-6 md:px-12 fixed top-0 left-0 z-50 shadow-md">

      {/* Logo */}
      <Link to="/" className="text-white text-2xl font-bold">
        EchoSee
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex ml-auto items-center gap-8 text-white">
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
          <Link to="/how-it-works" className="hover:text-[#00c6ff]">
            How It Works
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

        <Link to="/pre-order">
          <button className="bg-[#00c6ff] text-white px-5 py-2 rounded-full hover:opacity-90 transition">
            Pre-Order
          </button>
        </Link>
      </ul>

      {/* Mobile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="ml-auto md:hidden text-white text-2xl"
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-[70px] left-0 w-full bg-[#2c5364] md:hidden">
          <ul className="flex flex-col items-center gap-6 py-6 text-white">
            <Link to="/" className="hover:text-[#00c6ff]" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link to="/about" className="hover:text-[#00c6ff]" onClick={() => setOpen(false)}>
              About
            </Link>
            <Link to="/product" className="hover:text-[#00c6ff]" onClick={() => setOpen(false)}>
              Product
            </Link>
            <Link to="/how-it-works" className="hover:text-[#00c6ff]" onClick={() => setOpen(false)}>
              How It Works
            </Link>
            <Link to="/pricing" className="hover:text-[#00c6ff]" onClick={() => setOpen(false)}>
              Pricing
            </Link>
            <Link to="/contact" className="hover:text-[#00c6ff]" onClick={() => setOpen(false)}>
              Contact
            </Link>

            <Link to="/pre-order" onClick={() => setOpen(false)}>
              <button className="bg-[#00c6ff] text-white px-6 py-2 rounded-full">
                Pre-Order
              </button>
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
