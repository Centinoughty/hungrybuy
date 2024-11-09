const express = require("express");
const cors = require("cors");
const { connectDb } = require("./config/db");
require("dotenv").config();

const authRoutes = require("./routes/auth");

// Initialization
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);

connectDb();
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
