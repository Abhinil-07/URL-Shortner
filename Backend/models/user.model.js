const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: [true, "Please enter a name"],
  },

  email: {
    type: "String",
    required: [true, "Please enter a email address"],
  },

  password: {
    type: "String",
    required: [true, "Please enter a password"],
  },

  URL: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "URL",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = async function () {
  return jwt.sign({ _id: this._id }, "okay");
};

const User = mongoose.model("User", userSchema);

module.exports = { User: User };
