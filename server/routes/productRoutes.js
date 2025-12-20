const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const upload = require("../middleware/upload");

// ================= ADD PRODUCT =================
router.post(
  "/vendors/:vendorId/products",
  upload.single("image"),
  async (req, res) => {
    try {
      const product = new Product({
        vendorId: req.params.vendorId,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: req.file ? `/uploads/${req.file.filename}` : null,
      });

      await product.save();
      res.status(201).json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Add product failed" });
    }
  }
);

// ================= GET PRODUCTS BY VENDOR =================
router.get("/vendors/:vendorId/products", async (req, res) => {
  try {
    const products = await Product.find({
      vendorId: req.params.vendorId,
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

// ================= 🔥 GET SINGLE PRODUCT (THIS WAS MISSING) =================
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Product fetch failed" });
  }
});

// ================= UPDATE PRODUCT =================
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

// ================= DELETE PRODUCT =================
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;
