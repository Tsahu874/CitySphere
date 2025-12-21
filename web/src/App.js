// ✅ web/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🌐 Shared Components / Pages
import Header from "./components/Header";
import Footer from "./components/Footer"; // ✅ ADDED
import About from "./pages/About";
import LandingPage from "./pages/LandingPage";

// 🧑‍💼 Vendor Dashboard (Vendor Side)
import VendorList from "./components/VendorList";
import ProductList from "./components/ProductList";
import VendorDashboard from "./pages/VendorDashboard";

// 🔐 Protected Route
import ProtectedVendorRoute from "./components/ProtectedVendorRoute";

// 👤 User Side Pages
import UserHome from "./pages/UserHome";
import UserProfile from "./pages/UserProfile";
import VendorDetail from "./pages/VendorDetail";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

// 🔐 Authentication Pages
import UserSignup from "./pages/UserSignup";
import UserLogin from "./pages/UserLogin";
import VendorSignup from "./pages/VendorSignup";
import VendorLogin from "./pages/VendorLogin";

// 🔔 Toast Notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      {/* ✅ flex layout so footer stays at bottom */}
      <div className="bg-gray-50 min-h-screen flex flex-col">
        
        {/* 🔝 Navbar */}
        <Header />

        {/* 📄 Page Content */}
        <main className="flex-grow max-w-6xl mx-auto px-6 py-8">
          <Routes>
            {/* 🏠 Landing */}
            <Route path="/" element={<LandingPage />} />

            {/* 👤 User */}
            <Route path="/home" element={<UserHome />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/cart" element={<Cart />} />

            {/* 🏪 Vendor / Products */}
            <Route path="/vendor/:id" element={<VendorDetail />} />
            <Route path="/product/:id" element={<ProductDetail />} />

            {/* 🧑‍💼 Vendor Dashboard */}
            <Route
              path="/vendor-dashboard"
              element={
                <ProtectedVendorRoute>
                  <VendorDashboard />
                </ProtectedVendorRoute>
              }
            />
            <Route path="/vendor-dashboard/list" element={<VendorList />} />
            <Route
              path="/vendor-dashboard/:id/products"
              element={<ProductList />}
            />

            {/* 🔐 Auth */}
            <Route path="/user/signup" element={<UserSignup />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/vendor/signup" element={<VendorSignup />} />
            <Route path="/vendor/login" element={<VendorLogin />} />

            {/* ℹ️ Info */}
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* ✅ Footer added */}
        <Footer />

        {/* 🔔 Toast */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
