import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getVendors } from "../api/vendors";
import { getProductsByVendor } from "../api/products";
import UserProductCard from "../components/UserProductCard";

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

        // get all vendors
        const vendors = await getVendors();
        const selectedVendor = vendors.find((v) => v._id === id);

        if (!selectedVendor) {
          setError("Vendor not found");
          return;
        }

        setVendor(selectedVendor);

        // get products of this vendor
        const productData = await getProductsByVendor(id);
        setProducts(productData);
      } catch (err) {
        console.error(err);
        setError("Failed to load vendor details");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  // ================= UI STATES =================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 animate-pulse">
          Loading vendor details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Vendor not found</p>
      </div>
    );
  }

  // ================= MAIN UI =================

  return (
    <div className="min-h-screen py-10 px-4">
      <Link
        to="/home"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to Vendors
      </Link>

      {/* Vendor Info */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-3xl font-bold">{vendor.name}</h2>
        <p className="capitalize text-gray-600">{vendor.category}</p>

        <p className="text-gray-500 mt-2">
          {vendor.address}
          {vendor.city ? `, ${vendor.city}` : ""}
          {vendor.state ? `, ${vendor.state}` : ""}
          {vendor.pincode ? ` - ${vendor.pincode}` : ""}
        </p>
      </div>

      {/* Products */}
      <h3 className="text-2xl font-semibold mb-4">Products</h3>

      {products.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <UserProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
