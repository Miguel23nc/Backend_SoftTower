require("dotenv").config();
const jwt = require("jsonwebtoken");
const { MASTER_TOKEN } = process.env;

const generateSupertoken = (user) => {
  const expiresIn = 10; // 5 años en segundos
  try {
    const payload = { ...user };
    delete payload.password;

    console.log("Generando supertoken con expiración de 10 segundos...");

    return jwt.sign(payload, MASTER_TOKEN, { expiresIn });
  } catch (error) {
    console.log("Error al generar el supertoken:", error);
    throw new Error("Error al generar el token");
  }
};

module.exports = generateSupertoken;
