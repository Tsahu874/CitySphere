const express = require("express");
const router = express.Router();
const Vendor = require("../models/Vendor");


// TEST ROUTE

router.get("/test", (req, res) => {
  res.send("vendorRoutes working");
});


// GET ALL VENDORS

router.get("/", async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (err) {
    console.error("❌ Fetch vendors error:", err);
    res.status(500).json({ error: "Failed to fetch vendors" });
  }
});


// ADD VENDOR

router.post("/", async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    await vendor.save();
    res.status(201).json(vendor);
  } catch (err) {
    console.error("❌ Add vendor error:", err);
    res.status(500).json({ error: "Failed to add vendor" });
  }
});

module.exports = router;
