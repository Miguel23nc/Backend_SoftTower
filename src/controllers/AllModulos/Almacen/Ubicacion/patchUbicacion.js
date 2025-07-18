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
      return res.status(404).json({
        message: "Ubicación no encontrada",
      });
    }
    const ubicacion = await new Ubicacion({
      zonaId,
      porcentaje: porcentaje || findUbicacion.porcentaje,
      observaciones: observaciones || findUbicacion.observaciones,
      estado: estado || findUbicacion.estado,
      actualizadoPor,
    });

    return res.status(200).json({
      message: "Ubicación actualizada exitosamente",
      ubicacion,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Error al actualizar la ubicación",
    });
  }
};

module.exports = patchUbicacion;
