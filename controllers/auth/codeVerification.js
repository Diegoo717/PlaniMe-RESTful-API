require("dotenv").config;
const jwt = require("jsonwebtoken");
const db = require("../../models/index");
const User = db.User;

async function codeVerification(req, res) {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({
      where: { email: email, code: code },
    });

    if (!user) {
      return res.status(404).json("Invalid code");
    }

    const newCode =
      createRandomString(3) + extractCharact(email) + createRandomString(3);
    user.code = newCode;
    await user.save()

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res
      .status(200)
      .json({ message: "Successful code verification, your token expire in 15min", token: token });
  } catch (error) {
      res.status(500).json(error)
  }
}

function createRandomString(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function extractCharact(email) {
  const characters = email.substring(0, 3);
  return characters;
}

module.exports = { codeVerification };
