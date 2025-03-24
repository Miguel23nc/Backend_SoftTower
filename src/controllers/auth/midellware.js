// const jwt = require("jsonwebtoken");
// const Employee = require("../../models/Employees/Employee");
// const { JWT_SECRET, MASTER_TOKEN } = process.env;
// const publicRoutes = ["/api/login", "/api/employee", "/api/auth/login"];
// const tokenVerify = async (req, res, next) => {
//   const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

//   if (publicRoutes.includes(req.path)) {
//     return next();
//   }

//   if (!token) {
//     return res.status(401).json({ message: "No hay token" });
//   }

//   try {
//     let decoded;
//     try {
//       decoded = jwt.verify(token, JWT_SECRET);
//     } catch (error) {
//       decoded = jwt.verify(token, MASTER_TOKEN);
//       if (decoded.role !== "superadmin") {
//         return res.status(403).json({ message: "Token inválido" });
//       }
//     }

//     if (decoded.role === "superadmin") {
//       req.user = { role: "superadmin" };
//       return next();
//     }

//     const userFound = await Employee.findOne({ email: decoded.email });

//     if (!userFound) {
//       return res.status(401).json({ message: "No se encuentra este usuario" });
//     }

//     req.user = userFound.toObject();
//     delete req.user.password;

//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Token no válido o expirado" });
//   }
// };

// module.exports = tokenVerify;
