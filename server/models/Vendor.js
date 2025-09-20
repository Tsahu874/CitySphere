const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: "" },
  date: { type: Date, default: Date.now }
});

const VendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String },
  state: { type: String },
  pincode: { type: String },
  phone: { type: String },
  email: { type: String },   
  // lat: { type: Number },
  // lng: { type: Number },
  reviews: { type: [ReviewSchema], default: [] },
  avgRating: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Vendor", VendorSchema);
