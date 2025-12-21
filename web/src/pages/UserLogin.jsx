// web/src/pages/UserLogin.jsx
// Handles user login + authentication + feedback

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UserLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/user/login",
        formData
      );

      localStorage.setItem("userToken", res.data.token);
      localStorage.setItem("userData", JSON.stringify(res.data.user));

      toast.success("Login successful");
      navigate("/home");
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Invalid email or password"
      );
    }
  };

  return (
    // SAME BACKGROUND AS USER SIGNUP
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      {/* Login Card */}
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          User Login
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3
                       focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3
                       focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg
                       font-semibold hover:bg-gold transition-all"
          >
            Login
          </button>
        </form>

        {/* Redirect to Signup */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don&apos;t have an account?{" "}
          <span
            className="text-primary hover:underline cursor-pointer"
            onClick={() => navigate("/user/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
