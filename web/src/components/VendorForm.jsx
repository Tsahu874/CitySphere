// src/components/VendorForm.jsx
import React, { useEffect, useState } from "react";
import { addVendor, updateVendor } from "../api/vendors";

export default function VendorForm({ vendor, onSaved, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: ""
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (vendor) {
      setFormData({
        name: vendor.name || "",
        category: vendor.category || "",
        address: vendor.address || "",
        city: vendor.city || "",
        state: vendor.state || "",
        pincode: vendor.pincode || "",
        phone: vendor.phone || ""
      });
    } else {
      setFormData({
        name: "",
        category: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
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
      alert(`❌ Save failed: ${err.response?.data?.error || err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16, padding: 12, border: "1px solid #ddd" }}>
      <div>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="baker">Bakers</option>
          <option value="artisan">Artisans</option>
          <option value="bookstore">Bookstores</option>
          <option value="grocery">Groceries</option>
        </select>
      </div>
      <div>
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
      </div>
      <div>
        <input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
      </div>
      <div>
        <input name="state" placeholder="State" value={formData.state} onChange={handleChange} />
      </div>
      <div>
        <input name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} />
      </div>
      <div>
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
      </div>
      <div style={{ marginTop: 8 }}>
        <button type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Cancel</button>
      </div>
    </form>
  );
}
