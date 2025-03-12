const { compare } = require("bcrypt");
const generatetoken = require("../../utils/jwt");
const Employee = require("../../models/Employees/Employee");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(200).json({ message: "Falta email o password" });
    }
    const user = await Employee.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }
    const response = await compare(password, user.password);
    if (!response)
      return res.status(400).json({ message: "Contraseña incorrecta" });
    const userData = user.toObject();
    delete userData.password;

    const token = generatetoken(userData);
    res.cookie("token", token, {
      httpOnly: true, // Esto asegura que solo el servidor pueda acceder a la cookie
      secure: true, // Asegura que la cookie solo se envíe por HTTPS
      sameSite: "None", // Necesario para cookies entre diferentes dominios
    });
    return res.status(200).json({
      data: userData,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error en login" });
  }
};
module.exports = login;
