// ✅ web/src/pages/VendorLogin.jsx
// Handles vendor login + JWT storage + redirection to dashboard

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function VendorLogin() {
  const navigate = useNavigate();

  // 🧩 Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // 🔁 Handle field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🚀 Submit login form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/vendor/login", formData);
      toast.success("✅ Login successful!");
      localStorage.setItem("vendorToken", res.data.token);
      localStorage.setItem("vendorInfo", JSON.stringify(res.data.vendor));
      navigate("/vendor-dashboard");
    } catch (err) {
      toast.error("❌ Invalid email or password");
      console.error("Vendor login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-silver to-secondary">
      {/* 📦 Login Card */}
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-silver">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Vendor Login</h2>

        {/* 🧾 Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-gold transition-all"
          >
            Login
          </button>
        </form>

        {/* 🔁 Redirect to Signup */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span
            className="text-primary hover:underline cursor-pointer"
            onClick={() => navigate("/vendor/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
