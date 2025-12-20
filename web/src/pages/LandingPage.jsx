// web/src/pages/LandingPage.jsx


import React from "react";
import { useNavigate } from "react-router-dom";
import cityBg from "../assets/city-bg.jpg"; // Local city background image

export default function LandingPage() {
  const navigate = useNavigate(); //Used to redirect on button click

  return (
    //  Full-page flex layout with luxury-themed gradient
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-silver via-secondary to-white overflow-hidden">
      
      {/*  Background image layer (semi-transparent) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url(${cityBg})` }}
      ></div>

      {/*  Foreground content (z-index above background) */}
      <div className="relative z-10 text-center p-6">
        {/* 🏷️ App Heading */}
        <h1 className="text-5xl font-extrabold text-primary mb-4 drop-shadow">
          🌆 CitySphere
        </h1>

        {/* Tagline Text */}
        <p className="text-lg text-blue mb-8 max-w-xl mx-auto">
          Discover and support local vendors, artisans, and small businesses — all in one place.
        </p>

        {/*  Action Buttons: User & Vendor login */}
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
    </div>
  );
}
