const express = require("express");
const {
  generateNewShortURL,
  getRedirectURL,
} = require("../controllers/url.controller");
const router = express.Router();

router.post("/", generateNewShortURL);

router.get("/:shortId", getRedirectURL);

module.exports = router;
