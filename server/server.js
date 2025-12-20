const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 🔥 VERY IMPORTANT: image serving
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🔥 ROUTES (ORDER MAT BADALNA)
app.use("/auth", authRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/products", productRoutes);

// 🔥 DB
mongoose
  .connect("mongodb://127.0.0.1:27017/citysphere")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));

// 🔥 START
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
