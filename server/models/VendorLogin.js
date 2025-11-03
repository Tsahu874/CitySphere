// server/models/VendorLogin.js
const mongoose = require("mongoose");

// 🏪 Schema for vendors (login/signup)
const VendorLoginSchema = new mongoose.Schema(
  {
    shopName: { type: String, required: true },           // business/shop name
    email: { type: String, required: true, unique: true }, // login email
    password: { type: String, required: true },           // password (plain for now)
  },
  { timestamps: true }
);

module.exports = mongoose.model("VendorLogin", VendorLoginSchema);
