// ✅ web/src/pages/UserSignup.jsx
// Handles new user registration + validation + feedback

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function UserSignup() {
  const navigate = useNavigate();

  // 🧩 Form data state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  // 🔁 Handle field input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🚀 Submit signup form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/user/signup", formData);
      toast.success("✅ Signup successful!");
      console.log("User Registered:", res.data);
      navigate("/user/login");
    } catch (err) {
      toast.error("❌ Signup failed");
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-silver to-secondary">
      {/* 📦 Signup Card */}
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-silver">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Create an Account</h2>

        {/* 📝 Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
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

        {/* 🔁 Redirect to login */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            className="text-primary hover:underline cursor-pointer"
            onClick={() => navigate("/user/login")}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}
