const shortid = require("shortid");

const { User } = require("../models/user.model");
const { URL } = require("../models/url.model");

async function generateNewShortURL(req, res) {
  const link = req.body.link;

  if (!link) {
    return res.status(400).json({
      success: false,
      message: "URL is required",
    });
  }

  const shortID = shortid.generate();

  try {
    // Create the URL document
    const newURLInstance = await URL.create({
      shortId: shortID,
      redirectURL: link,
      visitHistory: [],
      userId: req.user._id,
    });

    // Push the new URL instance's ID into the URL array in the user document
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { URL: newURLInstance._id } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      id: shortID,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
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

async function deleteURL(req, res) {
  try {
    const id = req.params.id;
    await User.findByIdAndUpdate(req.user._id, { $pull: { URL: id } });
    await URL.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ sucess: true, message: "URL deleted successfully" });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
module.exports = {
  generateNewShortURL: generateNewShortURL,
  getRedirectURL: getRedirectURL,
  deleteURL: deleteURL,
};
