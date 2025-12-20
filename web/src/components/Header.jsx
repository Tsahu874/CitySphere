import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const navigate = useNavigate();

  // 🔐 Auth data
  const vendorToken = localStorage.getItem("vendorToken");
  const userToken = localStorage.getItem("userToken");
  const vendorData = localStorage.getItem("vendorData");
  const userData = localStorage.getItem("userData");

  // 🛒 Cart
  const { cartItems } = useCart();

  // 🔓 Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="bg-primary shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">

        {/* 🌆 Brand */}
        <Link to="/" className="text-2xl font-extrabold text-silver">
          CitySphere
        </Link>

        {/* 🧭 Desktop Nav */}
        <nav className="flex items-center gap-6 text-silver font-medium">

          {/* 👤 Not logged in */}
          {!vendorToken && !userToken && (
            <>
              <Link to="/about">About</Link>
              <Link to="/user/login">User Login</Link>
              <Link to="/user/signup">User Signup</Link>
              <Link to="/vendor/login">Vendor Login</Link>
              <Link to="/vendor/signup">Vendor Signup</Link>
            </>
          )}

          {/* 🧑‍💼 Vendor */}
          {vendorToken && (
            <>
              <span className="text-gold">
                Welcome, {vendorData ? JSON.parse(vendorData).shopName : "Vendor"} 👋
              </span>
              <Link to="/vendor-dashboard">Dashboard</Link>
              <button onClick={handleLogout} className="text-red-400">
                Logout
              </button>
            </>
          )}

          {/* 👤 User */}
          {userToken && !vendorToken && (
            <>
              <span className="text-gold">
                Hi, {userData ? JSON.parse(userData).fullName : "User"} 👋
              </span>

              <Link to="/home">Home</Link>

              {/* 🛒 CART ICON */}
              <Link to="/cart" className="relative">
                <span className="text-2xl">🛒</span>

                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              <button onClick={handleLogout} className="text-red-400">
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
