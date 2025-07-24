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
    if (movimiento) movimientoActualizado.movimiento = movimiento;
    if (codigoIngreso) movimientoActualizado.codigoIngreso = codigoIngreso;
    if (codigoSalida) movimientoActualizado.codigoSalida = codigoSalida;
    if (contratoId) movimientoActualizado.contratoId = contratoId;
    if (numeroDeActa) movimientoActualizado.numeroDeActa = numeroDeActa;
    if (contribuyente) movimientoActualizado.contribuyente = contribuyente;
    if (numeroDocumento)
      movimientoActualizado.numeroDocumento = numeroDocumento;
    if (datosGenerales)
      movimientoActualizado.datosGenerales = datosGenerales;
    if (descripcionBienes)
      movimientoActualizado.descripcionBienes = descripcionBienes;
    if (detallesDePeso)
      movimientoActualizado.detallesDePeso = detallesDePeso;
    if (referenciaImagen)
      movimientoActualizado.referenciaImagen = referenciaImagen;
    if (observaciones) movimientoActualizado.observaciones = observaciones;
    if (horaSalida) movimientoActualizado.horaSalida = horaSalida;
    if (fechaSalida) movimientoActualizado.fechaSalida = fechaSalida;
    if (actualizadoPor)
      movimientoActualizado.actualizadoPor = actualizadoPor;
    if (estadoActa) movimientoActualizado.estadoActa = estadoActa;


    const response = await movimientoActualizado.save();
    return res.status(200).json({
      message: "Movimiento actualizado exitosamente",
      movimiento: response,
    });
  } catch (error) {
    console.error("Error al actualizar el movimiento:", error);
    return res.status(500).json({ error: "Error al actualizar el movimiento" });
  }
};

module.exports = patchMovimiento;
