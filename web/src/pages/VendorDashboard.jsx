// web/src/pages/VendorDashboard.jsx
// Vendor Dashboard – stable auth handling + no redirect loop

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function VendorDashboard() {
  const navigate = useNavigate();
  const { vendor, vendorToken, loading, setVendor, setVendorToken } = useAuth();

  //  Protect dashboard (NO infinite redirect)
  useEffect(() => {
    if (loading) return;

    if (!vendorToken) {
      toast.error("Please login first!");
      navigate("/vendor/login");
    }
  }, [vendorToken, loading, navigate]);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("vendorToken");
    localStorage.removeItem("vendorData");

    setVendor(null);
    setVendorToken(null);

    toast.info("Logged out successfully");
    navigate("/");
  };

  //  While auth state is loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-silver to-secondary">
        <p className="text-gray-600 text-lg animate-pulse">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  //  Extra safety
  if (!vendor) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-silver via-white to-secondary flex flex-col items-center py-12 px-4">
      
      {/* Vendor Info */}
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-10 w-full max-w-4xl border border-silver text-center">
        <h1 className="text-4xl font-bold text-sage">
          Welcome, {vendor.shopName} 👋
        </h1>
        <p className="text-gray-600 mt-2">{vendor.email}</p>
        <p className="text-sm text-gray-500 mt-3">
          Manage your shop, add products, and connect with customers.
        </p>
      </div>

      {/*  Dashboard Actions */}
      <div className="grid md:grid-cols-3 gap-8 mt-10 max-w-5xl w-full">

        {/*  Manage Products */}
        <div
          onClick={() => navigate("/vendor-dashboard/list")}
          className="cursor-pointer bg-white/70 backdrop-blur-md border border-silver rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
        >
          <div className="text-5xl mb-3">🛍️</div>
          <h3 className="text-2xl font-semibold text-primary">
            Manage Products
          </h3>
          <p className="text-gray-500 text-sm mt-2">
            Add, edit or delete your listings.
          </p>
        </div>

        {/*  Profile */}
        <div
          onClick={() => toast.info("Profile feature coming soon")}
          className="cursor-pointer bg-white/70 backdrop-blur-md border border-silver rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
        >
          <div className="text-5xl mb-3">👤</div>
          <h3 className="text-2xl font-semibold text-primary">
            View Profile
          </h3>
          <p className="text-gray-500 text-sm mt-2">
            View or update shop details.
          </p>
        </div>

        {/*  Logout */}
        <div
          onClick={handleLogout}
          className="cursor-pointer bg-white/70 backdrop-blur-md border border-silver rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
        >
          <div className="text-5xl mb-3">🚪</div>
          <h3 className="text-2xl font-semibold text-red-600">
            Logout
          </h3>
          <p className="text-gray-500 text-sm mt-2">
            Exit safely.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-gray-500 text-sm">
        © 2025 <span className="font-semibold text-primary">CitySphere</span>
      </footer>
    </div>
  );
}
