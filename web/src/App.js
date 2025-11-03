// ✅ web/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🌐 Shared Components / Pages
import Header from "./components/Header";
import About from "./pages/About";
import LandingPage from "./pages/LandingPage";

// 🧑‍💼 Vendor Dashboard (Vendor Side)
import VendorList from "./components/VendorList";
import ProductList from "./components/ProductList";
import VendorDashboard from "./pages/VendorDashboard";

//  Import Protected Route
import ProtectedVendorRoute from "./components/ProtectedVendorRoute";

// 👤 User Side Pages
import UserHome from "./pages/UserHome";
import VendorDetail from "./pages/VendorDetail";

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
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <main className="max-w-6xl mx-auto px-6 py-8">
          <Routes>
            {/* 🏠 Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* 👤 USER ROUTES */}
            <Route path="/home" element={<UserHome />} />
            <Route path="/vendor/:id" element={<VendorDetail />} />

            {/* 🧑‍💼 VENDOR DASHBOARD ROUTES */}
            {/*  Protected route using ProtectedVendorRoute */}
            <Route
              path="/vendor-dashboard"
              element={
                <ProtectedVendorRoute>
                  <VendorDashboard />
                </ProtectedVendorRoute>
              }
            />
            <Route path="/vendor-dashboard/list" element={<VendorList />} />
            <Route path="/vendor-dashboard/:id/products" element={<ProductList />} />

            {/* 🔐 AUTH ROUTES */}
            <Route path="/user/signup" element={<UserSignup />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/vendor/signup" element={<VendorSignup />} />
            <Route path="/vendor/login" element={<VendorLogin />} />

            {/* ℹ️ About Page */}
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
