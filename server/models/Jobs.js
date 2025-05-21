const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: String,
    company: String,
    location: String,
    skills: [String],
    salary_range: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
