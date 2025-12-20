import axios from "axios";

const API_BASE = "http://localhost:5000/api/products";

// 📦 GET PRODUCTS BY VENDOR
export const getProductsByVendor = async (vendorId) => {
  const res = await axios.get(`${API_BASE}/vendors/${vendorId}/products`);
  return res.data;
};

// 🔍 GET SINGLE PRODUCT
export const getProductById = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};

// ➕ ADD PRODUCT
export const addProduct = async (vendorId, formData) => {
  const res = await axios.post(
    `${API_BASE}/vendors/${vendorId}/products`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data;
};

// ✏️ UPDATE PRODUCT
export const updateProduct = async (productId, formData) => {
  const res = await axios.put(`${API_BASE}/${productId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// ❌ DELETE PRODUCT
export const deleteProduct = async (productId) => {
  const res = await axios.delete(`${API_BASE}/${productId}`);
  return res.data;
};
