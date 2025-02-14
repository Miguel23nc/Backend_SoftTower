const Business = require("../../../models/Business");

const updateBusinessPartial = async (req, res) => {
  const { _id, ruc, razonSocial, address, representative, logo } = req.body;

  try {
    const businessFound = await Business.findById(_id);

    if (!businessFound) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }

    if (ruc) businessFound.ruc = ruc;
    if (razonSocial) businessFound.razonSocial = razonSocial;
    if (address) businessFound.address = address;
    if (representative) businessFound.representative = representative;
    if (logo) businessFound.logo = logo;

    await businessFound.save();

    return res.status(200).json({
      message: "Empresa actualizada correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = updateBusinessPartial;
