import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function UserProductCard({ product }) {
  const { addToCart, cartItems } = useCart();
  const [added, setAdded] = useState(false);

  const alreadyInCart = cartItems.some((item) => item._id === product._id);

  const handleAddToCart = () => {
    if (!alreadyInCart) {
      addToCart(product);
      setAdded(true);

      setTimeout(() => setAdded(false), 800);
    }
  };

  return (
    <div className="relative bg-white border rounded-xl shadow hover:shadow-lg transition overflow-hidden group">
      {/* 🛒 ADD TO CART ICON */}
      <button
        onClick={handleAddToCart}
        disabled={alreadyInCart}
        className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center
  transition-all duration-200
  ${
    alreadyInCart
      ? "bg-yellow-500 text-white shadow-md"
      : "bg-white text-gray-700 opacity-0 group-hover:opacity-100 hover:bg-yellow-500 hover:text-white shadow"
  }`}
        title={alreadyInCart ? "Already in cart" : "Add to cart"}
      >
        🛒
      </button>

      {/* 🖼 IMAGE */}
      <Link to={`/product/${product._id}`}>
        <div className="h-48 bg-gray-100">
          {product.image ? (
            <img
              src={`http://localhost:5000${product.image}`}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>
      </Link>

      {/* 📦 INFO */}
      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>

        <p className="text-sm text-gray-500">{product.category}</p>

        <p className="text-green-600 font-bold mt-2">₹{product.price}</p>
      </div>

      {/* ✅ ADD FEEDBACK */}
      {added && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm font-semibold">
          Added to Cart ✅
        </div>
      )}
    </div>
  );
}
