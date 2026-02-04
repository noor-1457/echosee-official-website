import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./Home";
import About from "./pages/About";
import Footer from "./components/Footer";


function App() {
  return (
    <BrowserRouter>

      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />


    </BrowserRouter>
  );
}

export default App;
