// ✅ web/src/pages/VendorSignup.jsx
// Handles vendor registration + validation + feedback

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function VendorSignup() {
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState({
    shopName: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/vendor/signup", formData);
      toast.success("✅ Signup successful!");
      console.log("Vendor Registered:", res.data);
      navigate("/vendor/login");
    } catch (err) {
      toast.error("❌ Signup failed");
      console.error("Vendor signup error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-silver to-secondary">
      {/* Signup Card */}
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-silver">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Register as a Vendor</h2>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="shopName"
            placeholder="Shop Name"
            value={formData.shopName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-gold transition-all"
          >
            Sign Up
          </button>
        </form>

        {/*  Redirect to login */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already a vendor?{" "}
          <span
            className="text-primary hover:underline cursor-pointer"
            onClick={() => navigate("/vendor/login")}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}
