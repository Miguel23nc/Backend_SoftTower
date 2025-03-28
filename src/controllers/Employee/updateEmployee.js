const Employee = require("../../models/Employees/Employee");
const { hashPassword } = require("../../utils/bcrypt");
const { deleteImage } = require("../../utils/cloudinary/images");

const updateEmployeePartial = async (req, res) => {
  const {
    _id,
    name,
    lastname,
    typeDocument,
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
    charge,
    sueldo,
    user,
    password,
    modules,
    phoneCode,
    phoneNumber,
    business,
    sede,
    photo,
    funcion,
    asistenciaAutomatica,
  } = req.body;
  console.log("req.body", req.body);

  try {
    if (!_id) {
      return res.status(400).json({ message: "El ID es obligatorio" });
    }

    const userFound = await Employee.findById(_id);
    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (name) userFound.name = name;
    if (lastname) userFound.lastname = lastname;
    if (typeDocument) userFound.typeDocument = typeDocument;
    if (documentNumber) userFound.documentNumber = documentNumber;
    if (type) userFound.type = type;
    if (state) userFound.state = state;
    if (dateOfBirth) userFound.dateOfBirth = dateOfBirth;
    if (genre) userFound.genre = genre;
    if (civilStatus) userFound.civilStatus = civilStatus;
    if (phone) userFound.phone = phone;
    if (telephone) userFound.telephone = telephone;
    if (email) userFound.email = email;
    if (location) userFound.location = location;
    if (charge) userFound.charge = charge;
    if (sueldo) userFound.sueldo = sueldo;
    if (user) userFound.user = user;
    if (modules) userFound.modules = modules;
    if (phoneCode) userFound.phoneCode = phoneCode;
    if (phoneNumber) userFound.phoneNumber = phoneNumber;
    if (business) userFound.business = business;
    if (sede) userFound.sede = sede;
    if (asistenciaAutomatica)
      userFound.asistenciaAutomatica = asistenciaAutomatica;
    if (photo) {
      userFound.photo = photo;
    }
    if (funcion) userFound.funcion = funcion;

    if (password) {
      await deleteImage(userFound.photo);
      userFound.password = await hashPassword(password);
    }

    await userFound.save();

    return res.status(200).json({
      message: "Usuario actualizado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = updateEmployeePartial;
