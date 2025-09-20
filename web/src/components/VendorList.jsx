// src/components/VendorList.jsx
import React, { useEffect, useState } from "react";
import { getVendors, deleteVendor } from "../api/vendors";
import VendorForm from "./VendorForm";

export default function VendorList() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    fetchVendors();
  }, []);

  async function fetchVendors() {
    try {
      setLoading(true);
      const data = await getVendors();
      setVendors(data);
    } catch (e) {
      console.error(e);
      setError("❌ Failed to load vendors. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vendor?")) return;
    try {
      await deleteVendor(id);
      setVendors((prev) => prev.filter((v) => v._id !== id));
      alert("✅ Vendor deleted successfully");
    } catch (e) {
      console.error(e);
      alert(`❌ Delete failed: ${e.response?.data?.error || e.message}`);
    }
  };

  const handleSaved = (savedVendor) => {
    setVendors((prev) => {
      const idx = prev.findIndex((v) => v._id === savedVendor._id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = savedVendor;
        return copy;
      }
      return [savedVendor, ...prev];
    });
    setShowForm(false);
    setEditing(null);
  };

  // filter vendors
  const visibleVendors = vendors.filter(
    (v) =>
      (!categoryFilter || v.category.toLowerCase() === categoryFilter) &&
      (v.name.toLowerCase().includes(query.toLowerCase()) ||
        v.address.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Local Vendors</h2>

      {/* Add button */}
      <button
        onClick={() => {
          setEditing(null);
          setShowForm(true);
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4"
      >
        + Add vendor
      </button>

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
      <div className="flex gap-2 mb-4">
        <input
          placeholder="Search by name/address"
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

      {/* Loading + Error + List */}
      {loading ? (
        <p className="text-gray-500">Loading vendors...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : visibleVendors.length === 0 ? (
        <p className="text-gray-500">No vendors found.</p>
      ) : (
        <div className="grid gap-4">
          {visibleVendors.map((v) => (
            <div
              key={v._id}
              className="bg-white shadow p-4 rounded border border-gray-200"
            >
              <div className="text-lg font-semibold text-gray-800">
                {v.name} — <span className="capitalize">{v.category}</span>
              </div>
              <div className="text-gray-600 text-sm mb-2">
                {v.address}
                {v.city ? `, ${v.city}` : ""}
                {v.state ? `, ${v.state}` : ""}
                {v.pincode ? ` - ${v.pincode}` : ""}
              </div>

              {/* Contact Buttons */}
              {/* Contact + actions (styled) */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {/* WhatsApp */}
                {v.phone ? (
                  <a
                    href={`https://wa.me/${v.phone.replace(
                      /[^0-9]/g,
                      ""
                    )}?text=${encodeURIComponent(
                      "Hi, I saw your profile on CitySphere. I want to order..."
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm"
                  >
                    WhatsApp
                  </a>
                ) : null}

                {/* Email */}
                {v.email ? (
                  <a
                    href={`mailto:${v.email}`}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                  >
                    Email
                  </a>
                ) : null}

                {/* If neither phone nor email */}
                {!v.phone && !v.email && (
                  <span className="text-gray-500 text-sm mr-2">
                    No contact info available
                  </span>
                )}

                {/* Spacer */}
                <div className="flex-1" />

                {/* Edit */}
                <button
                  onClick={() => {
                    setEditing(v);
                    setShowForm(true);
                  }}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition text-sm"
                >
                  Edit
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(v._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
