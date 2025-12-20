import React, { useState, useEffect } from "react";
import { addProduct, updateProduct } from "../api/products";

export default function ProductForm({ vendorId, product, onSaved, onCancel }) {
  // 🔹 Text fields
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  // 🔹 Image file
  const [image, setImage] = useState(null);

  const [saving, setSaving] = useState(false);

  // 🔁 Edit mode → load old data
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category || "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
      });
    }
    setImage(null);
  }, [product]);

  // 🔹 Text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔴 Image required for NEW product
    if (!product && !image) {
      alert("❌ Product image is required");
      return;
    }

    try {
      setSaving(true);

      // 🔥 IMPORTANT: FormData
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);

      if (image) {
        data.append("image", image); 
      }

      let saved;
      if (product && product._id) {
        saved = await updateProduct(product._id, data);
      } else {
        saved = await addProduct(vendorId, data);
      }

      onSaved(saved);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 mb-4 p-4 border rounded bg-gray-50"
    >
      <h3 className="font-semibold text-lg">
        {product ? "Edit Product" : "Add Product"}
      </h3>

      <input
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="border px-3 py-2 rounded w-full"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full"
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
        className="border px-3 py-2 rounded w-full"
      />

      <input
        name="category"
        placeholder="Category (e.g. Cakes, Clothes)"
        value={formData.category}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full"
      />

      {/* 🖼 IMAGE FILE */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="border px-3 py-2 rounded w-full"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className={`px-4 py-2 rounded ${
            saving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {saving ? "Saving..." : "Save"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
