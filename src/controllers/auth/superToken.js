require("dotenv").config();
const jwt = require("jsonwebtoken");
const { MASTER_TOKEN } = process.env;

const generateSupertoken = (user) => {
  const expiresIn = 10; // 5 años en segundos
  try {
    console.log("user", user);

    const payload = { _id: user._id, email: user.email, role: user.role };

    console.log("Generando supertoken con expiración de 10 segundos...");

    return jwt.sign(payload, MASTER_TOKEN, { expiresIn });
  } catch (error) {
    console.log("Error al generar el supertoken:", error);
    throw new Error("Error al generar el token");
  }
};

module.exports = generateSupertoken;
