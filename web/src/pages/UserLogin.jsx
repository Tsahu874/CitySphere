import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UserLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ CORRECT API ROUTE
      const res = await axios.post(
        "http://localhost:5000/auth/user/login",
        { email, password }
      );

      // ✅ Backend already sends correct user object
      const user = res.data.user;

      // ✅ Save to localStorage (Header + Profile depend on this)
      localStorage.setItem("userToken", res.data.token);
      localStorage.setItem("userData", JSON.stringify(user));

      toast.success("Login successful");
      navigate("/home");
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Invalid email or password"
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl font-bold mb-4">User Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
