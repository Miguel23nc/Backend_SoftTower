const Business = require("../../models/Business");
const Employee = require("../../models/Employees/Employee");
const { hashPassword } = require("../../utils/bcrypt");

const registerEmployee = async (req, res) => {
  try {
    const {
      name,
      lastname,
      documentType,
      documentNumber,
      state,
      type,
      dateOfBirth,
      genre,
      civilStatus,
      phone,
      telephone,
      email,
      location,
      address,
      charge,
      sueldo,
      user,
      password,
      photo,
      modules,
      business,
      sede,
      dateStart,
      regimenPension,
    } = req.body;

    // Hash the password
    const hashedPassword = await hashPassword(password);
    const findEmployee = await Employee.findOne({ documentNumber });
    if (findEmployee) {
      return res.status(400).json({ message: "El Colaborador ya existe" });
    }
    if (!hashedPassword) {
      return res
        .status(500)
        .json({ message: "Error al hashear la contraseña" });
    }
    const findBusiness = await Business.findOne({ razonSocial: business });

    if (!findBusiness) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }
    const newEmployee = new Employee({
      name,
      lastname,
      documentType,
      documentNumber,
      type,
      state,
      dateOfBirth,
      genre,
      civilStatus,
      phone,
      telephone,
      email,
      location,
      address,
      charge,
      sueldo,
      user,
      password: hashedPassword,
      photo,
      modules,
      business,
      sede,
      dateStart,
      regimenPension,
    });

    // Save the employee to the database
    await newEmployee.save();

    res.status(201).json({
      message: "Colaborador registrado exitosamente",
      employee: newEmployee,
    });
  } catch (error) {
    console.log("Error en registerEmployee:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = registerEmployee;
