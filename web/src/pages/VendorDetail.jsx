// web/src/pages/VendorDetail.jsx
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
        // fetch vendor details
        const vendorData = await getVendor(id);
        setVendor(vendorData);
        // fetch products for vendor
        const productData = await getProducts(id);
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

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!vendor) return <p className="text-gray-500">Vendor not found</p>;

  return (
    <div>
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Vendors
      </Link>

      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-2xl font-bold">{vendor.name}</h2>
        <p className="text-gray-600 capitalize">{vendor.category}</p>
        <p className="text-gray-500">
          {vendor.address}{vendor.city ? `, ${vendor.city}` : ""}{vendor.state ? `, ${vendor.state}` : ""}{vendor.pincode ? ` - ${vendor.pincode}` : ""}
        </p>

        <div className="flex gap-4 mt-3 text-sm">
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

      <h3 className="text-xl font-semibold mb-4">Products</h3>
      {products.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {products.map((p) => (
            <div key={p._id} className="border p-4 rounded bg-white">
              <h4 className="font-semibold">{p.name}</h4>
              <p className="text-sm text-gray-600">{p.description || "No description"}</p>
              <p className="text-sm font-medium text-gray-800 mt-1">₹{p.price} — {p.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
