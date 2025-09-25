// server/server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

// =========================
// Middleware
// =========================
app.use(cors());
app.use(express.json());

// =========================
// Connect to MongoDB
// =========================
mongoose
  .connect("mongodb://127.0.0.1:27017/citysphere")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// =========================
// Import Models
// =========================
const Vendor = require("./models/Vendor");
const Product = require("./models/Product"); 

// =========================
// Vendor APIs
// =========================

// GET all vendors
app.get("/vendors", async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch vendors" });
  }
});

// POST new vendor
app.post("/vendors", async (req, res) => {
  try {
    const newVendor = new Vendor(req.body);
    await newVendor.save();
    res.json(newVendor);
  } catch (err) {
    res.status(500).json({ error: "Failed to add vendor" });
  }
});

// UPDATE vendor
app.put("/vendors/:id", async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ error: "Vendor not found" });

    // Update fields if provided
    vendor.name = req.body.name || vendor.name;
    vendor.category = req.body.category || vendor.category;
    vendor.address = req.body.address || vendor.address;
    vendor.city = req.body.city || vendor.city;
    vendor.state = req.body.state || vendor.state;
    vendor.pincode = req.body.pincode || vendor.pincode;
    vendor.phone = req.body.phone !== undefined ? req.body.phone : vendor.phone;
    vendor.email = req.body.email !== undefined ? req.body.email : vendor.email;

    // Lat/Lng support (future)
    vendor.lat = req.body.lat !== undefined ? req.body.lat : vendor.lat;
    vendor.lng = req.body.lng !== undefined ? req.body.lng : vendor.lng;

    await vendor.save();
    res.json(vendor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE vendor
app.delete("/vendors/:id", async (req, res) => {
  try {
    const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!deletedVendor) return res.status(404).json({ error: "Vendor not found" });
    res.json({ message: "Vendor deleted", vendor: deletedVendor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single vendor
app.get("/vendors/:id", async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ error: "Vendor not found" });
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================
// Product APIs
// =========================

// Add product to a vendor
app.post("/vendors/:vendorId/products", async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { name, description, price, category, image } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: "Name and Price are required" });
    }

    const product = new Product({
      vendorId,
      name,
      description,
      price,
      category,
      image,
    });
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all products for a vendor
app.get("/vendors/:vendorId/products", async (req, res) => {
  try {
    const { vendorId } = req.params;
    const products = await Product.find({ vendorId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a product
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Product not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a product
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "✅ Product deleted", product: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================
// Start server
// =========================
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
