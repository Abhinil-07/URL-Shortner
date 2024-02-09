const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res
        .staus(400)
        .json({ success: false, message: "Please login first." });
    }

    const decoded = await jwt.verify(token, "okay");
    const user = await User.findById(decoded._id);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { isAuthenticated: isAuthenticated };
