const express = require("express");
const {
  registerUser,
  loginUser,
  getURL,
} = require("../controllers/user.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/links").get(isAuthenticated, getURL);

module.exports = router;
