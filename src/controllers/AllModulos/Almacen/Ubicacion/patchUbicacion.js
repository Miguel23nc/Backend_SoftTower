const Ubicacion = require("../../../../models/AllModulos/Almacen/Ubicacion");

const patchUbicacion = async (req, res) => {
  const { _id, zonaId, porcentaje, observaciones, estado, actualizadoPor } =
    req.body;

  try {
    if (!actualizadoPor || !_id) {
      return res.status(400).json({
        message: "Faltan datos requeridos para actualizar la ubicación",
      });
    }

    const findUbicacion = await Ubicacion.findById(_id);
    if (!findUbicacion) {
      return res.status(404).json({ message: "Ubicación no encontrada" });
    }

    if (zonaId) findUbicacion.zonaId = zonaId;
    if (porcentaje !== undefined) findUbicacion.porcentaje = porcentaje;
    if (observaciones) findUbicacion.observaciones = observaciones;
    if (estado) findUbicacion.estado = estado;
    findUbicacion.actualizadoPor = actualizadoPor;

    await findUbicacion.save();

    return res.status(200).json({
      message: "Ubicación actualizada exitosamente",
      ubicacion: findUbicacion,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Error al actualizar la ubicación",
    });
  }
};

module.exports = patchUbicacion;
