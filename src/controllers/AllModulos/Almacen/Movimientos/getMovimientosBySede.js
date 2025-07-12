const Movimiento = require("../../../../models/AllModulos/Almacen/Movimiento");

const getAllMovimientosBySede = async (req, res) => {
  const { contratoId } = req.params;
  try {
    if (!contratoId) {
      return res.status(400).json({
        message: "Falta el ID del contrato para filtrar los movimientos",
      });
    }
    const movimientosFiltrados = await Movimiento.find({
      contratoId: contratoId,
    }).sort({ createdAt: -1 });

    if (movimientosFiltrados.length === 0) {
      return res.status(404).json({
        message: "No se encontraron movimientos para esta sede",
      });
    }

    return res.status(200).json(movimientosFiltrados);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Error al obtener los movimientos" });
  }
};

module.exports = getAllMovimientosBySede;
