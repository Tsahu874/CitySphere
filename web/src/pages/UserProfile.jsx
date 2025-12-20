import React from "react";
import { useCart } from "../context/CartContext";

export default function UserProfile() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { cart, addToCart, decreaseQty, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">My Profile</h2>

      {/* 👤 USER INFO */}
      <div className="bg-white shadow rounded p-6 mb-8">
        <p><strong>Name:</strong> {userData?.fullName}</p>
        <p><strong>Email:</strong> {userData?.email}</p>
      </div>

      {/* 🛒 CART */}
      <h3 className="text-2xl font-semibold mb-4">My Cart</h3>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-white p-4 rounded shadow"
              >
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p>₹{item.price}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQty(item._id)}
                    className="px-2 bg-gray-200"
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="px-2 bg-gray-200"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-right mt-6 text-xl font-bold">
            Total: ₹{total}
          </div>
        </>
      )}
    </div>
  );
}
