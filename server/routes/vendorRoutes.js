const express = require("express");
const router = express.Router();
const verifyVendorToken = require("../middleware/authMiddleware");

// 🧠 Example protected route for dashboard
router.get("/vendor-dashboard", verifyVendorToken, (req, res) => {
  res.json({
    message: `Welcome to your dashboard, vendor ID: ${req.vendor.id}`,
  });
});

module.exports = router;
