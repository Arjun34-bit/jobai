const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/dbConfig");

const userRoutes = require("./routes/userRoutes");

const app = express();

dotenv.config();

connectDB();
app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server Started at PORT 5000");
});
