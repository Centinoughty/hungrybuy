const express = require("express");
const cors = require("cors");
const { connectDb } = require("./config/db");
require("dotenv").config();

// Initialization
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

connectDb();
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
