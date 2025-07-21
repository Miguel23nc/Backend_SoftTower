const Movimiento = require("../../../../models/AllModulos/Almacen/Movimiento");

const getAllMovimientosBySede = async (req, res) => {
  const { contratoId, movimiento, page = 0, limit = 10 } = req.query;

  try {
    if (!contratoId) {
      return res.status(400).json({
        message: "Falta el ID del contrato para filtrar los movimientos",
      });
    }
    const query = { contratoId };
    if (movimiento && movimiento !== "TODOS") {
      query.movimiento = movimiento;
    }

    const [data, total] = await Promise.all([
      Movimiento.find(query)
        .skip(page * limit)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 })
        .populate("contratoId")
        .populate("sedeId")
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
        .populate("creadoPor", "name lastname email"),
      Movimiento.countDocuments(query),
    ]);

    return res.json({ data, total });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Error al obtener los movimientos" });
  }
};

module.exports = getAllMovimientosBySede;
