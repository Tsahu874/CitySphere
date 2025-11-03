// 📂 File: web/src/pages/LandingPage.jsx
// 🎯 Purpose: Main landing page for CitySphere — entry point where user chooses their role.
// Includes a warm gradient + city background, modern buttons, and a minimal footer.

import React from "react";
import { useNavigate } from "react-router-dom";
import cityBg from "../assets/city-bg.jpg"; // ✅ Local background image (stored in src/assets)

export default function LandingPage() {
  const navigate = useNavigate(); // Used for navigating between routes

  return (
    // 🏙️ Main container with gradient background and center alignment
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 overflow-hidden">
      
      {/* 🌆 Background Image Layer (using local asset) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url(${cityBg})` }}
      ></div>

      {/* 🎯 Hero Section — App Name, Description, and Buttons */}
      <div className="relative z-10 text-center p-6">
        {/* App Title */}
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 drop-shadow-md">
          🌆 CitySphere
        </h1>

        {/* Subtitle / Tagline */}
        <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto">
          Discover and support local vendors, artisans, and small businesses —
          all in one place.
        </p>

        {/* 🚀 Role Selection Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* 🔹 User Login Button */}
          <button
            onClick={() => navigate("/user/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            Continue as User 👤
          </button>

          {/* 🔸 Vendor Login Button */}
          <button
            onClick={() => navigate("/vendor/login")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            Continue as Vendor 🧑‍💼
          </button>
        </div>
      </div>

      {/* ⚙️ Footer — Static text at bottom */}
      <footer className="absolute bottom-4 text-gray-600 text-sm">
        © 2025 <span className="font-semibold text-green-600">CitySphere</span> — Empowering local markets.
      </footer>
    </div>
  );
}
