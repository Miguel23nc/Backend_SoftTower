require("dotenv").config();
const jwt = require("jsonwebtoken");
const { MASTER_TOKEN } = process.env;

const generateSupertoken = (user) => {
  const expiresIn = 10; 
  try {
    const payload = {
      ...user,
    };
    delete payload.password;
    return jwt.sign(payload, MASTER_TOKEN, { expiresIn: expiresIn });
  } catch (error) {
    console.log(error);
    throw new Error("Error al generar el token");
  }
};

module.exports = generateSupertoken;
