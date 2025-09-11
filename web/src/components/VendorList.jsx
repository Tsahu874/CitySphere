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
      setError("Failed to load vendors");
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vendor?")) return;
    try {
      await deleteVendor(id);
      setVendors((prev) => prev.filter((v) => v._id !== id));
      alert("Deleted");
    } catch (e) {
      alert("Delete failed");
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

  // ✅ Filter vendors by slug category + search query
  const visibleVendors = vendors.filter(
    (v) =>
      (!categoryFilter || v.category === categoryFilter) &&
      (v.name.toLowerCase().includes(query.toLowerCase()) ||
        v.address.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div style={{ padding: 16 }}>
      <h2>Local Vendors</h2>

      <button
        onClick={() => {
          setEditing(null);
          setShowForm(true);
        }}
        style={{ marginBottom: 12 }}
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

      {/* Search + Category filter */}
      <div style={{ margin: "12px 0" }}>
        <input
          placeholder="Search by name/address"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="baker">Bakers</option>
          <option value="artisan">Artisans</option>
          <option value="bookstore">Bookstores</option>
          <option value="grocery">Groceries</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : visibleVendors.length === 0 ? (
        <p>No vendors found.</p>
      ) : (
        <ul>
          {visibleVendors.map((v) => (
            <li key={v._id} style={{ marginBottom: 12 }}>
              <div>
                <strong>{v.name}</strong> — {v.category}
              </div>
              <div>{v.address}</div>
              <div style={{ marginTop: 6 }}>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    v.address
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Map
                </a>
                {" • "}
                {v.phone && v.phone.trim() !== "" && (
                  <a
                    href={`https://wa.me/${v.phone.replace(
                      /[^0-9]/g,
                      ""
                    )}?text=${encodeURIComponent(
                      "Hi, I saw your profile on CitySphere. I want to order..."
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                )}
                {" • "}
                <button
                  onClick={() => {
                    setEditing(v);
                    setShowForm(true);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(v._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
