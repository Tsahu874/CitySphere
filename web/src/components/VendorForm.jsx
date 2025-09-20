// src/components/VendorForm.jsx
import React, { useState, useEffect } from "react";
import { addVendor, updateVendor } from "../api/vendors";

export default function VendorForm({ vendor, onSaved, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "", // ✅ new field
  });
  const [saving, setSaving] = useState(false);

  // Load vendor data if editing, otherwise reset for new vendor
  useEffect(() => {
    if (vendor) {
      setFormData({
        name: vendor.name || "",
        category: vendor.category || "",
        address: vendor.address || "",
        city: vendor.city || "",
        state: vendor.state || "",
        pincode: vendor.pincode || "",
        phone: vendor.phone || "",
        email: vendor.email || "",
      });
    } else {
      setFormData({
        name: "",
        category: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
        email: "", // ✅ reset email when adding new vendor
      });
    }
  }, [vendor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      let saved;
      if (vendor && vendor._id) {
        saved = await updateVendor(vendor._id, formData);
      } else {
        saved = await addVendor(formData);
      }
      onSaved(saved);
    } catch (err) {
      console.error(err);
      alert("❌ Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 mb-4 p-4 border rounded bg-gray-50"
    >
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="border px-3 py-2 rounded w-full"
      />
      <input
        name="category"
        placeholder="Category (e.g. Bakers)"
        value={formData.category}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full"
      />
      <input
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full"
      />
      <input
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full"
      />
      <input
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full"
      />
      <input
        name="pincode"
        placeholder="Pincode"
        value={formData.pincode}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full"
      />
      <input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full"
      />
      <input
        name="email"
        placeholder="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className={`px-4 py-2 rounded ${
            saving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
