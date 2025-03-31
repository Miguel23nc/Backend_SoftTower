const { compare } = require("bcrypt");
const generatetoken = require("../../utils/jwt");
const Employee = require("../../models/Employees/Employee");
const generateSupertoken = require("../auth/superToken");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Falta email o password" });
    }
    const user = await Employee.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const userData = user.toObject();
    delete userData.password;

    console.log("Usuario autenticado:", userData); // Log para depuración
    console.log("Rol del usuario:", user.role);

    let token;
    if (user.role === "superadmin") {
      console.log("Generando SuperToken...");
      token = generateSupertoken(userData);
    } else {
      console.log("Generando Token Normal...");
      token = generatetoken(userData);
    }

    console.log("Token generado:", token); // Verificar si el token se está generando correctamente

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({
      data: userData,
      token: token,
    });
  } catch (error) {
    console.log("Error en login:", error);
    return res.status(500).json({ message: "Error en login" });
  }
};

module.exports = login;
