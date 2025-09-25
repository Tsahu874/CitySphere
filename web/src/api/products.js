// src/api/products.js
import axios from "axios";

const API = "http://localhost:5000";

// ✅ Get all products for a vendor
export const getProducts = (vendorId) =>
  axios.get(`${API}/vendors/${vendorId}/products`).then((res) => res.data);

// ✅ Add a new product
export const addProduct = (vendorId, product) =>
  axios.post(`${API}/vendors/${vendorId}/products`, product).then((res) => res.data);

// ✅ Update an existing product
export const updateProduct = (id, product) =>
  axios.put(`${API}/products/${id}`, product).then((res) => res.data);

// ✅ Delete a product
export const deleteProduct = (id) =>
  axios.delete(`${API}/products/${id}`).then((res) => res.data);
