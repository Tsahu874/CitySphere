// ✅ web/src/components/Header.jsx
// 📘 Header component used across the app
// 🧭 Dynamically renders navigation based on login state (user or vendor)
// 🎨 Updated with modern luxury color palette (Deep Navy, Warm Gray, Rich Gold)

import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  // 🔐 Check login states
  const vendorToken = localStorage.getItem("vendorToken");
  const userToken = localStorage.getItem("userToken");
  const vendorData = localStorage.getItem("vendorData");
  const userData = localStorage.getItem("userData");

  // 🔓 Logout handler
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="bg-primary shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
        {/* 🌆 App Logo / Name */}
        <Link to="/" className="text-2xl font-extrabold text-silver">
          CitySphere
        </Link>

        {/* 🧭 Navigation Section */}
        <nav className="space-x-6 text-silver font-medium">
          {/* 🌐 Not Logged In */}
          {!vendorToken && !userToken ? (
            <>
              <Link to="/about" className="hover:text-gold transition-colors">
                About
              </Link>

              {/* 👤 User Options */}
              <Link to="/user/login" className="hover:text-gold">
                User Login
              </Link>
              <Link to="/user/signup" className="hover:text-gold">
                User Signup
              </Link>

              {/* 🏪 Vendor Options */}
              <Link to="/vendor/login" className="hover:text-gold">
                Vendor Login
              </Link>
              <Link to="/vendor/signup" className="hover:text-gold">
                Vendor Signup
              </Link>
            </>
          ) : vendorToken ? (
            // 🧑‍💼 Vendor Logged In
            <>
              <span className="text-gold font-semibold">
                {vendorData
                  ? `Welcome, ${JSON.parse(vendorData).shopName || "Vendor"} 👋`
                  : "Welcome Vendor 👋"}
              </span>
              <Link to="/vendor-dashboard" className="hover:text-primary">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600 font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            // 👤 User Logged In
            <>
              <span className="text-gold font-semibold">
                {userData
                  ? `Hi, ${JSON.parse(userData).fullName || "User"} 👋`
                  : "Hi User 👋"}
              </span>
              <Link to="/home" className="hover:text-gold">
                Home
              </Link>
              <button
                onClick={handleLogout}
                className="text-sage-500 hover:text-gold-600 font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
