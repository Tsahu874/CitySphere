// 📂 File: web/src/pages/VendorDashboard.jsx
// 🎯 Purpose: Modern Vendor Dashboard UI — visually enhanced version for demo submission
// ✨ Features: Glass effect, gradient background, hover glow, logout, and easy navigation

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function VendorDashboard() {
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch vendor data using JWT token stored in localStorage
  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const token = localStorage.getItem("vendorToken");
        if (!token) {
          toast.error("Please login first!");
          navigate("/vendor/login");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/vendor-dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setVendor(response.data.vendor);
      } catch (error) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("vendorToken");
        navigate("/vendor/login");
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, [navigate]);

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("vendorToken");
    toast.info("Logged out successfully!");
    navigate("/");
  };

  // 🕓 Loading animation
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-50 to-green-100">
        <p className="text-gray-600 text-lg animate-pulse">Loading your dashboard...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col items-center py-12 px-4">
      {/* 🏪 Vendor Info Card */}
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-10 w-full max-w-4xl border border-green-100 text-center">
        <h1 className="text-4xl font-bold text-green-700 drop-shadow-sm">
          Welcome, {vendor?.shopName || "Vendor"} 👋
        </h1>
        <p className="text-gray-600 mt-2">{vendor?.email}</p>
        <p className="text-sm text-gray-500 mt-3">
          Manage your shop, add products, and connect with your customers — all from here.
        </p>
      </div>

      {/* 📦 Dashboard Actions */}
      <div className="grid md:grid-cols-3 gap-8 mt-10 max-w-5xl w-full">
        {/* 🛍️ Manage Products */}
        <div
          onClick={() => navigate("/vendor-dashboard/list")}
          className="group cursor-pointer bg-white/70 backdrop-blur-md border border-green-100 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:bg-green-50"
        >
          <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">🛍️</div>
          <h3 className="text-2xl font-semibold text-green-700">Manage Products</h3>
          <p className="text-gray-500 text-sm mt-2">Add, edit or delete your listings.</p>
        </div>

        {/* 👤 View Profile */}
        <div
          onClick={() => toast.info("Profile editing coming soon!")}
          className="group cursor-pointer bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:bg-blue-50"
        >
          <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">👤</div>
          <h3 className="text-2xl font-semibold text-blue-700">View Profile</h3>
          <p className="text-gray-500 text-sm mt-2">View or update your shop details.</p>
        </div>

        {/* 🚪 Logout */}
        <div
          onClick={handleLogout}
          className="group cursor-pointer bg-white/70 backdrop-blur-md border border-red-100 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:bg-red-50"
        >
          <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">🚪</div>
          <h3 className="text-2xl font-semibold text-red-700">Logout</h3>
          <p className="text-gray-500 text-sm mt-2">Exit safely and return to homepage.</p>
        </div>
      </div>

      {/* 🧾 Footer */}
      <footer className="mt-10 text-gray-500 text-sm">
        © 2025 <span className="font-semibold text-green-600">CitySphere</span> — Vendor Dashboard
      </footer>
    </div>
  );
}
