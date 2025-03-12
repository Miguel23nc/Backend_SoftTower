const BoletaDePagos = require("../../../models/RecursosHumanos/BoletaDePago");

const getBoletaDePagos = async (req, res) => {
  try {
    const boleta = await BoletaDePagos.find().populate("colaborador");

    if (!boleta || boleta.length === 0) {
      return res.status(404).json({ message: "Boleta de pagos no encontrada" });
    }
    return res.status(200).json(boleta);
  } catch (error) {
    console.log("Error en getBoletaDePagos:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getBoletaDePagos;
