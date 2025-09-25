const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    image: { type: String }, // future use (Cloudinary/S3)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
