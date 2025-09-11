import React, { useState, useEffect } from "react";
import { addVendor, updateVendor } from "../api/vendors";

export default function VendorForm({ vendor, onSaved, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    address: "",
    city: "",
    phone: ""
  });

  // load vendor data if editing
  useEffect(() => {
    if (vendor) {
      setFormData({
        name: vendor.name || "",
        category: vendor.category || "",
        address: vendor.address || "",
        city: vendor.city || "",
        phone: vendor.phone || ""
      });
    } else {
      setFormData({
        name: "",
        category: "",
        address: "",
        city: "",
        phone: ""
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
      let saved;
      if (vendor && vendor._id) {
        saved = await updateVendor(vendor._id, formData);
      } else {
        saved = await addVendor(formData);
      }
      onSaved(saved);
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <div>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* ✅ category select dropdown (slug values) */}
      <div>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="baker">Bakers</option>
          <option value="artisan">Artisans</option>
          <option value="bookstore">Bookstores</option>
          <option value="grocery">Groceries</option>
        </select>
      </div>

      <div>
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Save</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>
        Cancel
      </button>
    </form>
  );
}
