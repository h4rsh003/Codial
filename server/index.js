const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require('./routes/projectRoutes');
const fs = require("fs");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "https://codial-woad.vercel.app"],
  credentials: true
}));
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => res.send("API running"));
app.use("/api/projects", projectRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
