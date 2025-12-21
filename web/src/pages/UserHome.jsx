// web/src/pages/UserHome.jsx
// User-facing homepage: displays vendors in elegant, clickable cards

import React, { useEffect, useState } from "react";
import { getVendors } from "../api/vendors";
import { Link } from "react-router-dom";

export default function UserHome() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch vendor list on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getVendors();
        setVendors(data);
      } catch (err) {
        console.error(err);
        setError("❌ Failed to load vendors");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-silver to-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Heading */}
        <h2 className="text-4xl font-bold text-sage mb-10 text-center">
          Explore Local Vendors
        </h2>

        {/* Content Area */}
        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading vendors...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-lg">{error}</p>
        ) : vendors.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No vendors available yet.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {vendors.map((v) => (
              <Link
                key={v._id}
                to={`/vendor/${v._id}`}
                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl border border-gray-200 hover:border-gold transition-all"
              >
                <h3 className="text-xl font-semibold text-primary mb-1">{v.name}</h3>
                <p className="text-sm text-gray-600 capitalize mb-1">{v.category}</p>
                <p className="text-sm text-gray-500">{v.city || v.address || "Location not specified"}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
