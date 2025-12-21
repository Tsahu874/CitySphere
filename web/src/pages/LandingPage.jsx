import React from "react";
import { useNavigate } from "react-router-dom";
import cityBg from "../assets/city-bg.jpg";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    //  FORCE FULL WIDTH EVEN INSIDE max-w container
    <div className="relative w-screen min-h-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url(${cityBg})` }}
      />

      {/* Overlay (optional luxury effect) */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/20"></div>

      {/* Foreground Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6">
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-4 drop-shadow-lg">
          🌆 CitySphere
        </h1>

        <p className="text-lg md:text-xl text-white mb-8 max-w-2xl">
          Discover and support local vendors, artisans, and small businesses — all in one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/user/login")}
            className="bg-primary hover:bg-[#243544] text-white px-8 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            Continue as User 👤
          </button>

          <button
            onClick={() => navigate("/vendor/login")}
            className="bg-gold hover:bg-yellow-500 text-white px-8 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            Continue as Vendor 🧑‍💼
          </button>
        </div>
      </div>
    </div>
  );
}
