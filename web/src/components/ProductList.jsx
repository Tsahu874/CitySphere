// src/components/ProductList.jsx
import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api/products";
import ProductForm from "./ProductForm";

export default function ProductList({ vendorId, onClose }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Load products when vendorId changes
  useEffect(() => {
    fetchProducts();
  }, [vendorId]);

  async function fetchProducts() {
    try {
      setLoading(true);
      const data = await getProducts(vendorId);
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  const handleSaved = (savedProduct) => {
    setProducts((prev) => {
      const idx = prev.findIndex((p) => p._id === savedProduct._id);
      if (idx >= 0) {
        // update existing
        const copy = [...prev];
        copy[idx] = savedProduct;
        return copy;
      }
      // add new
      return [savedProduct, ...prev];
    });
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      alert("✅ Product deleted");
    } catch (err) {
      console.error(err);
      alert("❌ Delete failed");
    }
  };

  return (
    <div className="p-4 border rounded bg-white shadow">
      <h3 className="text-xl font-bold mb-4">Products</h3>

      {/* Add Product Button */}
      <button
        onClick={() => {
          setEditing(null);
          setShowForm(true);
        }}
        className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 mb-4"
      >
        + Add Product
      </button>

      {showForm && (
        <ProductForm
          vendorId={vendorId}
          product={editing}
          onSaved={handleSaved}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}

      {/* Products List */}
      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products yet.</p>
      ) : (
        <ul className="space-y-3">
          {products.map((p) => (
            <li
              key={p._id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-gray-600">
                  {p.description || "No description"}
                </div>
                <div className="text-sm text-gray-800">
                  ₹{p.price} — {p.category}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditing(p);
                    setShowForm(true);
                  }}
                  className="text-yellow-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Close Button */}
      <div className="mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
}
