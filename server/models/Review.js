const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
  userName: { type: String, required: true },  // reviewer name
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Review", ReviewSchema);
