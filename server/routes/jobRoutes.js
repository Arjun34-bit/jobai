const express = require("express");
const {
  getJobRecommendation,
  createJob,
  getJobs,
} = require("../controllers/jobsController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/getRecommendations", authMiddleware, getJobRecommendation);
router.post("/createJob", createJob);
router.get("/", authMiddleware, getJobs);

module.exports = router;
