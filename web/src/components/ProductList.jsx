import React, { useEffect, useState } from "react";
import { getProductsByVendor, deleteProduct } from "../api/products";
import ProductForm from "./ProductForm";

const IMAGE_BASE = "http://localhost:5000";

export default function ProductList({ vendorId, onClose }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [vendorId]);

  async function fetchProducts() {
    try {
      setLoading(true);
      const data = await getProductsByVendor(vendorId);
      setProducts(data);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  const handleSaved = (savedProduct) => {
    setProducts((prev) => {
      const idx = prev.findIndex((p) => p._id === savedProduct._id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = savedProduct;
        return copy;
      }
      return [savedProduct, ...prev];
    });
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">My Products</h3>
        <button onClick={onClose} className="text-gray-500 hover:underline">
          Close
        </button>
      </div>

      <button
        onClick={() => {
          setEditing(null);
          setShowForm(true);
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
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

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white border rounded shadow-sm p-3"
            >
              {/* IMAGE */}
              {p.image ? (
                <img
                  src={`${IMAGE_BASE}${p.image}`}
                  alt={p.name}
                  className="h-40 w-full object-cover rounded mb-2"
                />
              ) : (
                <div className="h-40 flex items-center justify-center bg-gray-100 mb-2 rounded text-gray-400">
                  No Image
                </div>
              )}

              <h4 className="font-semibold">{p.name}</h4>
              <p className="text-sm text-gray-600">{p.category}</p>
              <p className="text-green-600 font-bold">₹{p.price}</p>

              <div className="flex gap-3 text-sm mt-2">
                <button
                  onClick={() => {
                    setEditing(p);
                    setShowForm(true);
                  }}
                  className="text-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
