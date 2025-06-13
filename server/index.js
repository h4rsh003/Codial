const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();
// Connect to mongoDB
connectDB();

//Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)

// test routes
app.get("/", (req, res) => res.send("API running"));

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started at port ${PORT}`) );