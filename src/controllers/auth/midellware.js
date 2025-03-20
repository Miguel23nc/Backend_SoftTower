const jwt = require("jsonwebtoken");
const Employee = require("../../models/Employees/Employee");
const { JWT_SECRET, MASTER_TOKEN } = process.env;

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const queryToken = req.query.token; // Captura el token en la URL

  // Si el token de la URL es el token maestro, permite acceso total
  if (queryToken && queryToken === MASTER_TOKEN) {
    req.user = { role: "superadmin" }; // Fake user para auditoría
    return next();
  }

  if (!token) {
    return res.status(401).json({ message: "No hay token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userFound = await Employee.findOne({ email: decoded.email });

    if (!userFound) {
      return res.status(401).json({ message: "No se encuentra este usuario" });
    }

    req.user = userFound.toObject(); // Agrega el usuario a `req`
    delete req.user.password; // Elimina la contraseña por seguridad

    next(); // ✅ Permite continuar con la siguiente función en la ruta
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expirado" });
    }
    return res.status(403).json({ message: "Token no válido" });
  }
};

module.exports = verifyToken;
