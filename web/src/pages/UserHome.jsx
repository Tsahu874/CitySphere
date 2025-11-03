// web/src/pages/UserHome.jsx
// User-facing homepage: shows clickable vendor cards (no edit/delete)
import React, { useEffect, useState } from "react";
import { getVendors } from "../api/vendors";
import { Link } from "react-router-dom";

export default function UserHome() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch vendors when page loads
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
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse Local Vendors</h2>

      {loading ? (
        <p className="text-gray-500">Loading vendors...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : vendors.length === 0 ? (
        <p className="text-gray-500">No vendors available.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((v) => (
            <Link
              key={v._id}
              to={`/vendor/${v._id}`} // clicking goes to vendor detail for users
              className="bg-white p-5 rounded shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-900">{v.name}</h3>
              <p className="text-sm text-gray-600 capitalize">{v.category}</p>
              <p className="text-sm text-gray-500">
                {v.city || v.address || "Location"}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
