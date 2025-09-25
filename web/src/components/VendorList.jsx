// src/components/VendorList.jsx
import React, { useEffect, useState } from "react";
import { getVendors, deleteVendor } from "../api/vendors";
import VendorForm from "./VendorForm";
import ProductList from "./ProductList";   // ✅ Import ProductList

export default function VendorList() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const [showProductsFor, setShowProductsFor] = useState(null); // ✅ Track vendor for products

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
              <div className="flex gap-3 text-sm mt-2">
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
                    className="text-green-600 hover:underline"
                  >
                    WhatsApp
                  </a>
                ) : (
                  <span className="text-gray-400">No phone</span>
                )}

                {/* Email */}
                {v.email ? (
                  <a
                    href={`mailto:${v.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    Email
                  </a>
                ) : (
                  <span className="text-gray-400">No email</span>
                )}

                {/* Edit + Delete */}
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
                {/* ✅ Manage Products */}
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

      {/* ✅ Product List Section */}
      {showProductsFor && (
        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-700 mb-2">
            Products for {vendors.find(v => v._id === showProductsFor)?.name}
          </h3>
          <ProductList
            vendorId={showProductsFor}
            onClose={() => setShowProductsFor(null)}
          />
        </div>
      )}
    </div>
  );
}
