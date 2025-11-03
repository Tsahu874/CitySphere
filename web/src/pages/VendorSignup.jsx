// ✅ web/src/pages/VendorSignup.jsx
// Handles vendor registration with backend integration and modern UI

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function VendorSignup() {
  const navigate = useNavigate();

  // 🧩 Local state for signup form
  const [formData, setFormData] = useState({
    shopName: "",
    email: "",
    password: "",
  });

  // 🧩 Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🧩 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔹 Send signup data to backend
      const res = await axios.post("http://localhost:5000/auth/vendor/signup", formData);

      // ✅ Show success message
      toast.success("🎉 Vendor Registered Successfully!");

      console.log("Vendor Registered:", res.data);

      // 🔹 Redirect to vendor login
      navigate("/vendor/login");
    } catch (err) {
      console.error("Vendor Signup Error:", err);
      toast.error("❌ Signup failed. Try again with a unique email.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-50 to-emerald-100">
      {/* 🧭 Signup Card */}
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Vendor Signup
        </h2>

        {/* 🧾 Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="shopName"
            type="text"
            placeholder="Enter your Shop Name"
            value={formData.shopName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

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
            placeholder="Create a Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-all"
          >
            Signup
          </button>
        </form>

        {/* 🧭 Link to Login */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            className="text-green-600 hover:underline cursor-pointer"
            onClick={() => navigate("/vendor/login")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}
