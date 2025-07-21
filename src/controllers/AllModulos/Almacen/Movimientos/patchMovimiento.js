const Movimiento = require("../../../../models/AllModulos/Almacen/Movimiento");

const patchMovimiento = async (req, res) => {
  const {
    _id,
    movimiento,
    codigoIngreso,
    codigoSalida,
    contratoId,
    numeroDeActa,
    contribuyente,
    numeroDocumento,
    datosGenerales,
    descripcionBienes,
    detallesDePeso,
    referenciaImagen,
    observaciones,
    horaSalida,
    fechaSalida,
    actualizadoPor,
    estadoActa,
  } = req.body;
  try {
    if (!actualizadoPor || !_id) {
      return res.status(400).json({
        message: "Faltan datos requeridos para actualizar el movimiento",
      });
    }
    const movimientoActualizado = await Movimiento.findById(_id);
    if (!movimientoActualizado) {
      return res.status(404).json({ error: "Movimiento no encontrado" });
    }
    const patch = new Movimiento({
      movimiento,
      codigoIngreso,
      codigoSalida,
      contratoId,
      numeroDeActa,
      contribuyente,
      numeroDocumento,
      datosGenerales,
      descripcionBienes,
      detallesDePeso,
      referenciaImagen,
      observaciones,
      horaSalida,
      fechaSalida,
      actualizadoPor,
      estadoActa,
    });
    await Movimiento.save(patch);
    return res.status(200).json({
      message: "Movimiento actualizado exitosamente",
      movimiento: patch,
    });
  } catch (error) {
    console.error("Error al actualizar el movimiento:", error);
    return res.status(500).json({ error: "Error al actualizar el movimiento" });
  }
};

module.exports = patchMovimiento;
