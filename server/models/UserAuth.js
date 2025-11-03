// server/models/UserAuth.js
const mongoose = require("mongoose");

// 👤 Schema for app users (customers)
const UserAuthSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },          // user's full name
    email: { type: String, required: true, unique: true }, // login email
    password: { type: String, required: true },          // password (plain for now)
  },
  { timestamps: true } // auto adds createdAt & updatedAt
);

module.exports = mongoose.model("UserAuth", UserAuthSchema);
