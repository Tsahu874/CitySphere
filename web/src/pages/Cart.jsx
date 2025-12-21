import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const cartContext = useCart();

  // Safety check (important)
  if (!cartContext) {
    return <p className="text-center mt-10">Cart not available</p>;
  }

  const { cartItems, removeFromCart } = cartContext;

  // total price (safe reduce)
  const total = (cartItems || []).reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="min-h-screen">
      <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link
            to="/home"
            className="text-blue-600 hover:underline"
          >
            ← Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white p-4 rounded shadow"
              >
                <div className="flex items-center gap-4">
                  {item.image && (
                    <img
                      src={`http://localhost:5000${item.image}`}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}

                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      ₹{item.price} × {item.qty}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/*Total */}
          <div className="mt-8 text-right">
            <h3 className="text-xl font-bold">
              Total: ₹{total}
            </h3>
          </div>
        </>
      )}
    </div>
  );
}
