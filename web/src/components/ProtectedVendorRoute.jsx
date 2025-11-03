// web/src/components/ProtectedVendorRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

/**
 * 🔒 Protected route for Vendor Dashboard
 * Redirects to login if vendor token is missing
 */
const ProtectedVendorRoute = ({ children }) => {
  const token = localStorage.getItem("vendorToken");

  // ❌ If token not found, send user to login
  if (!token) {
    return <Navigate to="/vendor/login" replace />;
  }

  // ✅ If logged in, show dashboard
  return children;
};

export default ProtectedVendorRoute;
