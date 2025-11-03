// ✅ web/src/pages/VendorLogin.jsx
// Handles vendor login, saves JWT token, and redirects to vendor dashboard

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function VendorLogin() {
  const navigate = useNavigate();

  // Local state for input values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Update input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // POST request to vendor login API
      const res = await axios.post("http://localhost:5000/auth/vendor/login", formData);

      // ✅ Save JWT token and vendor info
      localStorage.setItem("vendorToken", res.data.token);
      localStorage.setItem("vendorInfo", JSON.stringify(res.data.vendor));

      toast.success("✅ Login Successful!");

      // Redirect vendor to dashboard
      navigate("/vendor-dashboard");
    } catch (err) {
      toast.error("❌ Invalid email or password");
      console.error("Vendor login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Vendor Login
        </h2>

        {/* 🧾 Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-all"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span
            className="text-green-600 hover:underline cursor-pointer"
            onClick={() => navigate("/vendor/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
