import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function VendorLogin() {
  const navigate = useNavigate();
  const { setVendor, setVendorToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/vendor/login",
        { email, password }
      );

      // SAVE TO LOCAL STORAGE
      localStorage.setItem("vendorToken", res.data.token);
      localStorage.setItem(
        "vendorData",
        JSON.stringify(res.data.vendor)
      );

      //  UPDATE CONTEXT (MOST IMPORTANT FIX)
      setVendorToken(res.data.token);
      setVendor(res.data.vendor);

      toast.success("Vendor login successful!");
      navigate("/vendor-dashboard");

    } catch (err) {
      toast.error(err.response?.data?.error || "Vendor login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-silver to-secondary">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-silver">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Vendor Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-gold transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
