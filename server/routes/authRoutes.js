// File: server/routes/authRoutes.js
// Description: Secure Authentication Routes for User & Vendor
// Uses bcrypt for password hashing and JWT for authentication tokens

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Import models
const UserAuth = require("../models/UserAuth");
const VendorLogin = require("../models/VendorLogin");

// 🔑 Secret key for JWT (move to .env later)
const JWT_SECRET = "citysphere_secret_key";



// USER AUTH ROUTES


// USER SIGNUP

// → Registers new user securely (hashed password)
// → Returns success message with basic user info

router.post("/user/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validation
    if (!fullName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check existing email
    const existingUser = await UserAuth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserAuth({ fullName, email, password: hashedPassword });
    await newUser.save();

    res.json({
      message: "✅ User registered successfully!",
      user: { id: newUser._id, fullName: newUser.fullName, email: newUser.email },
    });
  } catch (err) {
    console.error("Error during user signup:", err);
    res.status(500).json({ error: "Server error during signup" });
  }
});


// USER LOGIN
// -------------------------------------------------------
// → Compares hashed password using bcrypt
// → Generates JWT token if credentials are valid
// -------------------------------------------------------
router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserAuth.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, role: "user" }, JWT_SECRET, { expiresIn: "2h" });

    res.json({
      message: "✅ User login successful!",
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email },
    });
  } catch (err) {
    console.error("Error during user login:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});



// VENDOR AUTH ROUTES
// ====================

// VENDOR SIGNUP
// -------------------------------------------------------
// → Registers vendor with hashed password
// → Checks for duplicate email before saving

router.post("/vendor/signup", async (req, res) => {
  try {
    const { shopName, email, password } = req.body;

    if (!shopName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingVendor = await VendorLogin.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newVendor = new VendorLogin({ shopName, email, password: hashedPassword });
    await newVendor.save();

    res.json({
      message: "✅ Vendor registered successfully!",
      vendor: { id: newVendor._id, shopName: newVendor.shopName, email: newVendor.email },
    });
  } catch (err) {
    console.error("Error during vendor signup:", err);
    res.status(500).json({ error: "Server error during signup" });
  }
});


// VENDOR LOGIN
// -------------------------------------------------------
// → Validates login, compares password using bcrypt
// → Returns JWT token for authentication
// -------------------------------------------------------
router.post("/vendor/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const vendor = await VendorLogin.findOne({ email });
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: vendor._id, role: "vendor" }, JWT_SECRET, { expiresIn: "2h" });

    res.json({
      message: "✅ Vendor login successful!",
      token,
      vendor: { id: vendor._id, shopName: vendor.shopName, email: vendor.email },
    });
  } catch (err) {
    console.error("Error during vendor login:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});



// EXPORT ROUTER

module.exports = router;
