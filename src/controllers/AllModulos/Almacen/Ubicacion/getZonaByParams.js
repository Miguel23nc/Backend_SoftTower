const Zona = require("../../../../models/AllModulos/Almacen/Zona");

const getZonasByParams = async (req, res) => {
  const { almacenId } = req.query;

  try {
    const response = await Zona.find(almacenId);

    return res.json(response);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Error al obtener las boletas de pago",
    });
  }
};

module.exports = getZonasByParams;
