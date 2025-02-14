require("dotenv").config();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const generatetoken = (user) => {
  try {
    const payload = {
      _id: user._id,
      email: user.email,
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = generatetoken;
