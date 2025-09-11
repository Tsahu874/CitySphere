// server/server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/citysphere";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Import Vendor Model
const Vendor = require("./models/Vendor");

// ==================== Vendor Routes ==================== //

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

    vendor.name = req.body.name ?? vendor.name;
    vendor.category = req.body.category ?? vendor.category;
    vendor.address = req.body.address ?? vendor.address;
    vendor.city = req.body.city ?? vendor.city;
    vendor.phone = req.body.phone ?? vendor.phone;

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
    if (!deletedVendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
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

// GET reviews for a vendor
app.get("/vendors/:id/reviews", async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).select("reviews");
    if (!vendor) return res.status(404).json({ error: "Vendor not found" });
    res.json(vendor.reviews || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add a review
app.post("/vendors/:id/reviews", async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    if (!name || !rating) {
      return res.status(400).json({ error: "Name and rating are required" });
    }

    const numRating = Number(rating);
    if (numRating < 1 || numRating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ error: "Vendor not found" });

    const newReview = { name, rating: numRating, comment: comment || "" };
    vendor.reviews.push(newReview);

    // Update avgRating
    const sum = vendor.reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
    vendor.avgRating = +(sum / vendor.reviews.length).toFixed(2);

    await vendor.save();
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== Start Server ==================== //
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
