import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/products";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError("Product not found");
      }
    }
    fetchProduct();
  }, [id]);

  if (error) {
    return <p className="text-center text-red-600 mt-10">{error}</p>;
  }

  if (!product) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="bg-white rounded-xl shadow p-6">
        {product.image && (
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            className="w-full h-96 object-cover rounded mb-6"
          />
        )}

        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.category}</p>
        <p className="text-lg mb-4">{product.description}</p>
        <p className="text-2xl font-bold text-green-600">
          ₹{product.price}
        </p>
      </div>
    </div>
  );
}
