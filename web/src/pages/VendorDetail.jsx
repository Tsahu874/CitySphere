// ✅ web/src/pages/VendorDetail.jsx
// Shows vendor info + their products (user view, read-only)

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getVendor } from "../api/vendors";
import { getProducts } from "../api/products";

export default function VendorDetail() {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const vendorData = await getVendor(id);
        const productData = await getProducts(id);
        setVendor(vendorData);
        setProducts(productData);
      } catch (err) {
        console.error(err);
        setError("❌ Failed to load vendor details");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-silver to-secondary">
        <p className="text-gray-600 animate-pulse">Loading vendor details...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <p className="text-red-600">{error}</p>
      </div>
    );

  if (!vendor)
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <p className="text-gray-500">Vendor not found</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-silver via-white to-secondary py-10 px-4">
      <Link to="/home" className="text-primary hover:underline mb-4 inline-block font-medium">
        ← Back to Vendors
      </Link>

      {/* 🏪 Vendor Info Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-silver mb-8">
        <h2 className="text-3xl font-bold text-primary">{vendor.name}</h2>
        <p className="text-gray-600 capitalize">{vendor.category}</p>
        <p className="text-gray-500">
          {vendor.address}
          {vendor.city ? `, ${vendor.city}` : ""}
          {vendor.state ? `, ${vendor.state}` : ""}
          {vendor.pincode ? ` - ${vendor.pincode}` : ""}
        </p>

        <div className="flex flex-wrap gap-6 mt-4 text-sm">
          {vendor.phone && (
            <a
              href={`https://wa.me/${vendor.phone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="text-green-600 hover:underline"
            >
              WhatsApp
            </a>
          )}
          {vendor.email && (
            <a href={`mailto:${vendor.email}`} className="text-blue-600 hover:underline">
              Email
            </a>
          )}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              vendor.address + " " + (vendor.city || "") + " " + (vendor.state || "")
            )}`}
            target="_blank"
            rel="noreferrer"
            className="text-red-600 hover:underline"
          >
            Open in Maps
          </a>
        </div>
      </div>

      {/* 🛍️ Product Grid */}
      <h3 className="text-2xl font-semibold text-primary mb-4">Products</h3>
      {products.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white border border-silver rounded-xl p-5 shadow hover:shadow-lg transition"
            >
              <h4 className="text-lg font-bold text-gray-800">{p.name}</h4>
              <p className="text-sm text-gray-600 mt-1">
                {p.description || "No description provided."}
              </p>
              <p className="text-sm text-primary font-medium mt-2">
                ₹{p.price} — {p.category}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
