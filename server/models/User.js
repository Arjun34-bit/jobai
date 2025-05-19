const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    location: { type: String, required: true },
    exp: { type: Number, required: true },
    skills: [String],
    preferredJobType: { type: String, enum: ["remote", "onsite", "both"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
