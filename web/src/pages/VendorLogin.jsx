import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function VendorLogin() {
  const navigate = useNavigate();
  const { setVendor, setVendorToken } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/vendor/login",
        formData
      );

      // ✅ Context
      setVendor(res.data.vendor);
      setVendorToken(res.data.token);

      // ✅ LocalStorage (KEYS MUST MATCH AuthContext)
      localStorage.setItem("vendor", JSON.stringify(res.data.vendor));
      localStorage.setItem("vendorToken", res.data.token);

      toast.success("Vendor login successful!");
      navigate("/vendor-dashboard");
    } catch (err) {
      toast.error(err.response?.data?.error || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-silver to-secondary">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Vendor Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />

          <button className="w-full bg-primary text-white py-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
