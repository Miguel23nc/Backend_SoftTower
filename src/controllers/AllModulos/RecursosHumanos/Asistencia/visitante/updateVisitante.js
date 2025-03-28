const AsistenciaVisitante = require("../../../../models/RecursosHumanos/AsistenciaVisitante");

const updateAsistenciaVisitante = async (req, res) => {
  const {
    _id,
    Visitante,
    fecha,
    ingreso,
    salida,
    inicioAlmuerzo,
    finAlmuerzo,
  } = req.body;
  try {
    if (!_id) {
      return res.status(400).json({ message: "El _id es requerido" });
    }
    const findAsistenciaVisitante = await AsistenciaVisitante.findById(_id);
    if (!findAsistenciaVisitante) {
      return res
        .status(404)
        .json({ message: "AsistenciaVisitante no encontrada" });
    }
    if (Visitante) findAsistenciaVisitante.Visitante = Visitante;
    if (fecha) findAsistenciaVisitante.fecha = fecha;
    if (ingreso) findAsistenciaVisitante.ingreso = ingreso;
    if (salida) findAsistenciaVisitante.salida = salida;
    if (inicioAlmuerzo) findAsistenciaVisitante.inicioAlmuerzo = inicioAlmuerzo;
    if (finAlmuerzo) findAsistenciaVisitante.finAlmuerzo = finAlmuerzo;
    await findAsistenciaVisitante.save();

    res.status(200).json({
      message: "AsistenciaVisitante actualizada",
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports = updateAsistenciaVisitante;
