import React from "react";

const IMAGE_BASE = "http://localhost:5000";

export default function ProductCard({
  product,
  isVendor = false,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white shadow-md rounded-xl border p-4 flex flex-col">
      
      {/* Product Image */}
      <div className="h-40 w-full bg-gray-100 rounded mb-3 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={`${IMAGE_BASE}${product.image}`}
            alt={product.name}
            className="h-full w-full object-cover rounded"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image</span>
        )}
      </div>

      {/* Product Info */}
      <h3 className="text-lg font-semibold text-gray-800">
        {product.name}
      </h3>

      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
        {product.description || "No description"}
      </p>

      <div className="mt-2 text-primary font-bold">
        ₹ {product.price}
      </div>

      {/* Vendor Actions */}
      {isVendor && (
        <div className="flex gap-3 mt-4 text-sm">
          <button
            onClick={onEdit}
            className="text-yellow-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
