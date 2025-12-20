// src/components/VendorList.jsx
import React, { useEffect, useState } from "react";
import { getVendors, deleteVendor } from "../api/vendors";
import VendorForm from "./VendorForm";
import ProductList from "./ProductList";
import { useAuth } from "../context/AuthContext"; // ✅ IMPORTANT

export default function VendorList() {
  const { vendor } = useAuth(); // ✅ logged-in vendor

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const [showProductsFor, setShowProductsFor] = useState(null);

  useEffect(() => {
    fetchVendors();
  }, []);

  async function fetchVendors() {
    try {
      setLoading(true);
      const data = await getVendors();

      // ✅ ONLY SHOW LOGGED-IN VENDOR
      const myVendor = vendor
        ? data.filter((v) => v.email === vendor.email)
        : [];

      setVendors(myVendor);
    } catch (e) {
      console.error(e);
      setError("❌ Failed to load vendors.");
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete your vendor profile?"))
      return;

    try {
      await deleteVendor(id);
      setVendors([]);
      alert("✅ Vendor deleted successfully");
    } catch (e) {
      console.error(e);
      alert("❌ Delete failed");
    }
  };

  const handleSaved = (savedVendor) => {
    setVendors([savedVendor]);
    setShowForm(false);
    setEditing(null);
  };

  // 🔍 filters (still useful even for single vendor)
  const visibleVendors = vendors.filter(
    (v) =>
      (!categoryFilter || v.category?.toLowerCase() === categoryFilter) &&
      (v.name?.toLowerCase().includes(query.toLowerCase()) ||
        v.address?.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        My Vendor Profile
      </h2>

      {/* ➕ Add Vendor (only if not exists) */}
      {vendors.length === 0 && (
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4"
        >
          + Add my vendor profile
        </button>
      )}

      {showForm && (
        <VendorForm
          vendor={editing}
          onSaved={handleSaved}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}

      {/* Search + Filter */}
      {vendors.length > 0 && (
        <div className="flex gap-2 mb-4">
          <input
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">All Categories</option>
            <option value="baker">Bakers</option>
            <option value="artisan">Artisans</option>
            <option value="bookstore">Bookstores</option>
            <option value="grocery">Groceries</option>
          </select>
        </div>
      )}

      {/* Loading / Error / Vendor Card */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : visibleVendors.length === 0 ? (
        <p className="text-gray-500">No vendor profile found.</p>
      ) : (
        <div className="grid gap-4">
          {visibleVendors.map((v) => (
            <div
              key={v._id}
              className="bg-white shadow p-4 rounded border border-gray-200"
            >
              <div className="text-lg font-semibold">
                {v.name} — <span className="capitalize">{v.category}</span>
              </div>

              <div className="text-gray-600 text-sm mb-2">
                {v.address}, {v.city}, {v.state} - {v.pincode}
              </div>

              <div className="flex gap-3 text-sm mt-2">
                <button
                  onClick={() => {
                    setEditing(v);
                    setShowForm(true);
                  }}
                  className="text-yellow-600 hover:underline"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(v._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>

                <button
                  onClick={() => setShowProductsFor(v._id)}
                  className="text-blue-600 hover:underline"
                >
                  Manage Products
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 📦 Products */}
      {showProductsFor && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">My Products</h3>
          <ProductList
            vendorId={showProductsFor}
            onClose={() => setShowProductsFor(null)}
          />
        </div>
      )}
    </div>
  );
}
