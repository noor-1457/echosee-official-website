import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./Home";
import About from "./pages/About";
import Footer from "./components/Footer";
import HowItWorks from "./pages/HowItWorks";


function App() {
  return (
    <BrowserRouter>

      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
      </Routes>
      <Footer />


    </BrowserRouter>
  );
}

export default App;
