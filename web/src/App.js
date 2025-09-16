import React from "react";
import VendorList from "./components/VendorList";
import Header from "./components/Header";
import About from "./pages/About";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import toastify CSS + container
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        {/* Global Header */}
        <Header />

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<VendorList />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* Toast container for global notifications */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
