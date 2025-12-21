// server/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const JWT_SECRET = "citysphere_secret_key"; // later move to .env

// Middleware to verify JWT for vendors
const verifyVendorToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== "vendor") {
      return res.status(403).json({ error: "Access denied. Vendor only." });
    }

    req.vendor = decoded; // store decoded vendor info in request
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = verifyVendorToken;
