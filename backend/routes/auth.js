const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const router = express.Router();
const JWT_TOKEN = process.env.JWT_TOKEN;

/* curl -X POST http://localhost:5000/auth/register -H "Content-Type: application/json" -d '{"firstName": "John", "lastName": "Doe", "email": "test@example.com", "password": "test@123"}' */
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ success: false, message: "Account already exists" });
    }

    const newUser = new User({
      email,
      password,
      profile: { firstName, lastName },
    });
    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, JWT_TOKEN);
    res.status(201).json({ success: true, message: "Account created", token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

/* curl -X POST http://localhost:5000/auth/login -H "Content-Type: application/json" -d '{"email": "test@example.com", "password": "test@123"}' */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Cannot find accout" });
  }

  if (!(await user.isMatchPassword(password))) {
    return res
      .status(401)
      .json({ success: false, message: "Incorrect password" });
  }

  const token = jwt.sign({ _id: user._id }, JWT_TOKEN);
  res.status(200).json({ success: true, message: "Login succesful", token });
});

module.exports = router;
