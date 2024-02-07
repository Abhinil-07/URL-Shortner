const URL = require("../models/url.model");
const shortid = require("shortid");

async function generateNewShortURL(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({
      success: false,
      message: "URL is required",
    });
  }
  const shortID = shortid.generate();
  console.log(shortID);
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.status(200).json({
    success: "true",
    id: shortID,
  });
}

async function getRedirectURL(req, res) {
  const shortID = req.params.shortId;
  console.log(shortID);
  const entry = await URL.findOneAndUpdate(
    {
      shortId: shortID,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
}

module.exports = {
  generateNewShortURL: generateNewShortURL,
  getRedirectURL: getRedirectURL,
};
