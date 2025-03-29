require("dotenv").config();
const jwt = require("jsonwebtoken");
const { MASTER_TOKEN } = process.env;

const generateSupertoken = (user) => {
  try {
    const payload = {
      role: "superadmin",
    };
    return jwt.sign(payload, MASTER_TOKEN, { expiresIn: 157680000 });
  } catch (error) {
    console.log(error);
    throw new Error("Error al generar el token");
  }
};

module.exports = generateSupertoken;
