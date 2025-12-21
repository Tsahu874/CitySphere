import React from "react";
import { Link } from "react-router-dom";
import { Mail, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#2f4f6f] text-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* 🌆 Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            CitySphere
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Discover and support local vendors, artisans, and small businesses —
            all in one trusted platform.
          </p>
        </div>

        {/* 🔗 Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/user/login" className="hover:text-white">User Login</Link></li>
            <li><Link to="/vendor/login" className="hover:text-white">Vendor Login</Link></li>
          </ul>
        </div>

        {/* 👤 Users */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            For Users
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Browse local vendors</li>
            <li>View products</li>
            <li>WhatsApp contact</li>
            <li>Save favorites</li>
          </ul>
        </div>

        {/* 📬 Contact & Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Contact
          </h3>

          <div className="flex items-center gap-2 text-sm mb-3">
            <Mail size={16} />
            <span>support@citysphere.com</span>
          </div>

          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white">
              <Github />
            </a>
            <a href="#" className="hover:text-white">
              <Linkedin />
            </a>
          </div>
        </div>

      </div>

      {/* 🔒 Bottom */}
      <div className="border-t border-gray-500 text-center py-4 text-sm text-gray-300">
        © {new Date().getFullYear()} CitySphere. All rights reserved.
      </div>
    </footer>
  );
}
