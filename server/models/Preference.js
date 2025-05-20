const mongoose = require("mongoose");

const PreferenceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    skills: [String],
    location: String,
    exp: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Preference", PreferenceSchema);
