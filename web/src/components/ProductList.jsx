// 🌿 web/src/components/ProductList.jsx
import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api/products";
import ProductForm from "./ProductForm";
import { toast } from "react-toastify";

export default function ProductList({ vendorId, onClose }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // ✅ Fetch products from DB
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

  // ✅ When product added/edited
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
    toast.success("✅ Product saved successfully!");
    setShowForm(false);
    setEditing(null);
  };

  // ✅ Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.info("🗑️ Product deleted");
    } catch (err) {
      console.error(err);
      toast.error("❌ Delete failed");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-green-700">🛍️ Your Products</h3>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Product
        </button>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="mb-6 border rounded-lg bg-gray-50 p-4">
          <ProductForm
            vendorId={vendorId}
            product={editing}
            onSaved={handleSaved}
            onCancel={() => {
              setShowForm(false);
              setEditing(null);
            }}
          />
        </div>
      )}

      {/* Product Display */}
      {loading ? (
        <p className="text-gray-500 text-center">Loading products...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-center">No products added yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="border rounded-xl p-4 bg-gray-50 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="mb-3">
                <h4 className="text-xl font-semibold text-gray-800">{p.name}</h4>
                <p className="text-gray-600 text-sm">
                  {p.description || "No description"}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-green-700 font-bold">₹{p.price}</p>
                <span className="text-sm text-gray-500">{p.category}</span>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => {
                    setEditing(p);
                    setShowForm(true);
                  }}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Close Button */}
      <div className="mt-6 text-center">
        <button
          onClick={onClose}
          className="px-5 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}
