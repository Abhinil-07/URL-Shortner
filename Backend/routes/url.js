const express = require("express");
const {
  generateNewShortURL,
  getRedirectURL,
  deleteURL,
} = require("../controllers/url.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const router = express.Router();

router.route("/new").post(isAuthenticated, generateNewShortURL);

router.get("/:shortId", getRedirectURL);

router.route("/delete/:id").delete(isAuthenticated, deleteURL);

module.exports = router;
