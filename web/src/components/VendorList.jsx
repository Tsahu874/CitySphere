import React, { useEffect, useState } from "react";
import { getVendors, deleteVendor } from "../api/vendors";
import VendorForm from "./VendorForm";
import { toast } from "react-toastify";

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
      toast.error("❌ Failed to load vendors.");
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vendor?")) return;
    try {
      await deleteVendor(id);
      setVendors((prev) => prev.filter((v) => v._id !== id));
      toast.success("✅ Vendor deleted successfully");
    } catch (e) {
      console.error(e);
      toast.error(`❌ Delete failed: ${e.response?.data?.error || e.message}`);
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
    toast.success("✅ Vendor saved successfully");
  };

  // filter visible vendors
  const visibleVendors = vendors.filter(
    (v) =>
      (!categoryFilter || v.category.toLowerCase() === categoryFilter) &&
      (v.name.toLowerCase().includes(query.toLowerCase()) ||
        v.address.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
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
        <div className="flex justify-center items-center py-6">
          <p className="text-gray-500 animate-pulse">Loading vendors...</p>
        </div>
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
              <div className="flex gap-3 text-sm">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${v.address}, ${v.city || ""}, ${v.state || ""} ${
                      v.pincode || ""
                    }`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Map
                </a>
                {v.phone && (
                  <a
                    href={`https://wa.me/${v.phone.replace(
                      /[^0-9]/g,
                      ""
                    )}?text=${encodeURIComponent(
                      "Hi, I saw your profile on CitySphere. I want to order..."
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    WhatsApp
                  </a>
                )}
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
