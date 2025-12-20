import { Navigate } from "react-router-dom";

export default function ProtectedVendorRoute({ children }) {
  const token = localStorage.getItem("vendorToken");

  if (!token) {
    return <Navigate to="/vendor/login" />;
  }

  return children;
}
