const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports = auth;
