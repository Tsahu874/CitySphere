// server/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/citysphere")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Import Vendor Model
const Vendor = require("./models/Vendor");

// GET all vendors
app.get('/vendors', async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch vendors" });
  }
});

// POST new vendor
app.post('/vendors', async (req, res) => {
  try {
    const newVendor = new Vendor(req.body);
    await newVendor.save();
    res.json(newVendor);
  } catch (err) {
    res.status(500).json({ error: "Failed to add vendor" });
  }
});

// UPDATE vendor
app.put('/vendors/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ error: 'Vendor not found' });

    // Update fields if provided
    vendor.name = req.body.name || vendor.name;
    vendor.category = req.body.category || vendor.category;
    vendor.address = req.body.address || vendor.address;
    vendor.city = req.body.city || vendor.city;
    vendor.state = req.body.state || vendor.state;
    vendor.pincode = req.body.pincode || vendor.pincode;
    vendor.phone = req.body.phone !== undefined ? req.body.phone : vendor.phone;

    // ✅ Lat/Lng support
    vendor.lat = req.body.lat !== undefined ? req.body.lat : vendor.lat;
    vendor.lng = req.body.lng !== undefined ? req.body.lng : vendor.lng;

    await vendor.save();
    res.json(vendor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE vendor
app.delete('/vendors/:id', async (req, res) => {
  try {
    const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!deletedVendor) return res.status(404).json({ error: 'Vendor not found' });
    res.json({ message: 'Vendor deleted', vendor: deletedVendor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single vendor
app.get('/vendors/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
