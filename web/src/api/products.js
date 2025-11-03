// src/api/products.js
// Product API helper functions
// These functions talk to the backend Express server
// and are used in the frontend components (ProductForm, ProductList, VendorDetail, etc.)

import axios from "axios";

// Base URL of our backend server
const API = "http://localhost:5000";

// =============================
//  Product APIs
// =============================

// ✅ Get all products for a vendor
// vendorId → MongoDB _id of the vendor
// Returns → Array of products belonging to that vendor
export const getProducts = (vendorId) =>
  axios.get(`${API}/vendors/${vendorId}/products`).then((res) => res.data);

// ✅ Add a new product
// vendorId → Which vendor this product belongs to
// product → { name, description, price, category, image(optional) }
// Returns → Saved product object
export const addProduct = (vendorId, product) =>
  axios.post(`${API}/vendors/${vendorId}/products`, product).then((res) => res.data);

// ✅ Update an existing product
// id → Product _id
// product → Updated product fields
// Returns → Updated product object
export const updateProduct = (id, product) =>
  axios.put(`${API}/products/${id}`, product).then((res) => res.data);

// ✅ Delete a product
// id → Product _id
// Returns → { message: "✅ Product deleted", product: deletedProduct }
export const deleteProduct = (id) =>
  axios.delete(`${API}/products/${id}`).then((res) => res.data);
