const Business = require("../../../models/Business");

const createBusiness = async (req, res) => {
  try {
    const { ruc, razonSocial, address, logo, representative } = req.body;
    console.log("req.body", req.body);
    if (!ruc)
      return res.status(400).json({ message: "El campo ruc es obligatorio" });
    if (!razonSocial)
      res.status(400).json({ message: "El campo razon social es obligatorio" });
    if (!address)
      return res
        .status(400)
        .json({ message: "El campo dirección es obligatorio" });
    if (!representative)
      return res
        .status(400)
        .json({ message: "El campo representante es obligatorio" });
    if (!logo)
      return res.status(400).json({ message: "El campo logo es obligatorio" });

    const newBusiness = new Business({
      ruc,
      razonSocial,
      address,
      representative,
      logo,
    });

    const savedBusiness = await newBusiness.save();
    return res
      .status(201)
      .json({ message: "Empresa creada correctamente", data: savedBusiness });
  } catch (error) {
    console.error("Error al crear empresa:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = createBusiness;
