// 📂 File: web/src/pages/LandingPage.jsx
// 🎯 Purpose: Stylish entry screen with luxury-modern palette

import React from "react";
import { useNavigate } from "react-router-dom";
import cityBg from "../assets/city-bg.jpg";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-silver via-secondary to-white overflow-hidden">
      
      {/* 🌆 Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url(${cityBg})` }}
      ></div>

      {/* 🎯 Hero content */}
      <div className="relative z-10 text-center p-6">
        <h1 className="text-5xl font-extrabold text-primary mb-4 drop-shadow">
          🌆 CitySphere
        </h1>

        <p className="text-lg text-blue mb-8 max-w-xl mx-auto">
          Discover and support local vendors, artisans, and small businesses — all in one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/user/login")}
            className="bg-primary hover:bg-[#243544] text-white px-6 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            Continue as User 👤
          </button>

          <button
            onClick={() => navigate("/vendor/login")}
            className="bg-gold hover:bg-yellow-500 text-white px-6 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            Continue as Vendor 🧑‍💼
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-blue text-sm">
        © 2025 <span className="font-semibold text-gold">CitySphere</span> — Empowering local markets.
      </footer>
    </div>
  );
}
