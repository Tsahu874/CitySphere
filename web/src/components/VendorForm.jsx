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
  });
  const [saving, setSaving] = useState(false);

  // Load vendor data if editing
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
      });
    }
  }, [vendor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.address) {
      alert("⚠️ Name, Category, and Address are required!");
      return;
    }
    try {
      setSaving(true);
      let saved;
      if (vendor && vendor._id) {
        saved = await updateVendor(vendor._id, formData);
      } else {
        saved = await addVendor(formData);
      }
      alert("✅ Vendor saved successfully!");
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
      className="bg-white shadow-md rounded p-6 mb-6 border border-gray-200"
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        {vendor ? "Edit Vendor" : "Add Vendor"}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="name"
          placeholder="Shop name"
          value={formData.name}
          onChange={handleChange}
          className="border px-3 py-2 rounded focus:ring focus:ring-blue-300"
          required
        />
        <input
          name="category"
          placeholder="Category (e.g. Bakers)"
          value={formData.category}
          onChange={handleChange}
          className="border px-3 py-2 rounded focus:ring focus:ring-blue-300"
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border px-3 py-2 rounded focus:ring focus:ring-blue-300 col-span-2"
          required
        />
        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="border px-3 py-2 rounded focus:ring focus:ring-blue-300"
        />
        <input
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          className="border px-3 py-2 rounded focus:ring focus:ring-blue-300"
        />
        <input
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          className="border px-3 py-2 rounded focus:ring focus:ring-blue-300"
        />
        <input
          name="phone"
          placeholder="Phone (digits only)"
          value={formData.phone}
          onChange={handleChange}
          className="border px-3 py-2 rounded focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className={`px-4 py-2 rounded text-white ${
            saving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition`}
        >
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
