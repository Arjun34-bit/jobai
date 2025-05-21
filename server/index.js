const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/dbConfig");

const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const miscellenousRoutes = require("./routes/miscellenousRoutes");

const app = express();

dotenv.config();

connectDB();
app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: "https://jobai-k9mu.vercel.app/",
    credentials: true,
  })
);

app.use("/api/auth", userRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/misc", miscellenousRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server Started at PORT 5000");
});
