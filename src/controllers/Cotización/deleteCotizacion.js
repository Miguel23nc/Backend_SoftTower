const Cotizacion = require("../../models/Cotizacion");

const deleteCotizacion = async (req, res) => {
  const { _id } = req.body;
  try {
    const cotizacion = await Cotizacion.findByIdAndDelete({ _id });

    if (!cotizacion) {
      return res.status(404).json({ error: "Cotizacion no encontrada" });
    }

    return res.status(200).json({ message: "Cotizacion eliminada" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = deleteCotizacion;
