const Movimiento = require("../../../../models/AllModulos/Almacen/Movimiento");

const getMovimientoByCodigo = async (req, res) => {
  const { codigoIngreso } = req.query;

  try {
    if (!codigoIngreso) {
      return res.status(400).json({
        message: "El código de ingreso es requerido",
      });
    }
    console.log("codigoIngreso", codigoIngreso);

    const response = await Movimiento.findOne({
      correlativa: String(codigoIngreso),
    })
      .populate("contratoId")
      .populate(
        "descripcionBienes.productoId",
        "item cantidad descripcion unidadDeMedida pesoNeto pesoBruto estadoEnvase subItem"
      )
      .populate({
        path: "descripcionBienes.ubicacionId",
        populate: {
          path: "zonaId",
        },
      })
      .populate("creadoPor", "name lastname email")
      .lean();

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error al obtener el movimiento por código:", error);
    return res
      .status(500)
      .json({ message: error.message || "Error al obtener los movimientos" });
  }
};

module.exports = getMovimientoByCodigo;
