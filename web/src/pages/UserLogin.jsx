// ✅ web/src/pages/UserLogin.jsx
// Handles User Login + Token Save + Redirect to Home Page

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const navigate = useNavigate();

  // 🧩 State for input fields
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // 🧩 Update state on typing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🧩 Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔹 Send login request to backend
      const res = await axios.post("http://localhost:5000/auth/user/login", formData);

      // ✅ Show success notification
      toast.success("🎉 Login successful!");

      // 🔹 Save token in localStorage
      localStorage.setItem("userToken", res.data.token);
      localStorage.setItem("userName", res.data.user.fullName);

      // 🔹 Redirect user to home page
      navigate("/home");
    } catch (err) {
      // ❌ If any error
      toast.error("Invalid email or password");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-purple-100">
      {/* 🧭 Card */}
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">User Login</h2>

        {/* 🧾 Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Login
          </button>
        </form>

        {/* 🧭 Link to Signup */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/user/signup")}
          >
            Sign up here
          </span>
        </p>
      </div>
    </div>
  );
}
