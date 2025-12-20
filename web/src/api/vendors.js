// src/api/vendors.js
import axios from "axios";

const API_BASE = "http://localhost:5000";

// ✅ GET all vendors
export const getVendors = async () => {
  const res = await axios.get(`${API_BASE}/api/vendors`);
  return res.data;
};

// ✅ ADD vendor
export const addVendor = async (vendor) => {
  const res = await axios.post(`${API_BASE}/api/vendors`, vendor);
  return res.data;
};

// ✅ UPDATE vendor
export const updateVendor = async (id, vendor) => {
  const res = await axios.put(`${API_BASE}/api/vendors/${id}`, vendor);
  return res.data;
};

// ✅ DELETE vendor
export const deleteVendor = async (id) => {
  const res = await axios.delete(`${API_BASE}/api/vendors/${id}`);
  return res.data;
};
