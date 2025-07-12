const ContratoAlmacen = require("../../../../models/AllModulos/Almacen/Contrato");

const putContratoAlmacen = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, fechaInicio, fechaFin, estado } = req.body;
    if (!id) {
      return res.status(400).json({
        message: "ID del contrato es requerido",
      });
    }
    const findContrato = await ContratoAlmacen.findById(id);
    if (nombre) findContrato.nombre = nombre;
    if (descripcion) findContrato.descripcion = descripcion;
    if (fechaInicio) findContrato.fechaInicio = fechaInicio;
    if (fechaFin) findContrato.fechaFin = fechaFin;
    if (estado) findContrato.estado = estado;
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = putContratoAlmacen;
