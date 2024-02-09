const { User } = require("../models/user.model");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existedUser = await User.findOne({ email: email });
    if (existedUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const createdUser = await User.findById(user._id).select("-password");
    const token = await createdUser.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res
      .status(200)
      .cookie("token", token, options)
      .json({ success: true, createdUser, token });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, message: "Wrong password" });
    }

    const token = await user.generateToken();
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getURL = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).populate("URL");

    return res.status(200).json({ success: true, links: user.URL, user: user });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerUser: registerUser,
  loginUser: loginUser,
  getURL: getURL,
};
