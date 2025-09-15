import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-blue-700 text-white p-4 shadow">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo / Title */}
        <h1 className="text-xl font-bold tracking-wide">🌆 CitySphere</h1>

        {/* Navigation */}
        <nav className="space-x-4 text-sm">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
        </nav>
      </div>
    </header>
  );
}
