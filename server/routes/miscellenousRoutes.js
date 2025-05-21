const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { getLocation } = require("../controllers/miscellenousController");
const router = express.Router();

router.get("/", authMiddleware, getLocation);

module.exports = router;
