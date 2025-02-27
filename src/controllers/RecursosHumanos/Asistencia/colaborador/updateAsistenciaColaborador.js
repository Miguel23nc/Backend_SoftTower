const AsistenciaColaborador = require("../../../../models/RecursosHumanos/AsistenciaColaborador");

const updateAsistenciaColaborador = async (req, res) => {
  const {
    colaborador,
    fecha,
    ingreso,
    salida,
    inicioAlmuerzo,
    finAlmuerzo,
    dni,
  } = req.body;
  try {
    let findAsistenciaColaborador;
    if (colaborador) {
      findAsistenciaColaborador = await AsistenciaColaborador.findOne({
        colaborador: colaborador,
        fecha: fecha,
      });
    }
    if (dni) {
      const findColaborador = await Employee.findOne({
        documentNumber: dni,
      });
      findAsistenciaColaborador = await AsistenciaColaborador.findOne({
        colaborador: findColaborador._id,
        fecha: fecha,
      });
    }

    if (!findAsistenciaColaborador) {
      return res
        .status(404)
        .json({ message: "No se encontró esta asistencia" });
    }
    if (colaborador) findAsistenciaColaborador.colaborador = colaborador;
    if (fecha) findAsistenciaColaborador.fecha = fecha;
    if (ingreso) findAsistenciaColaborador.ingreso = ingreso;
    if (salida) findAsistenciaColaborador.salida = salida;
    if (inicioAlmuerzo)
      findAsistenciaColaborador.inicioAlmuerzo = inicioAlmuerzo;
    if (finAlmuerzo) findAsistenciaColaborador.finAlmuerzo = finAlmuerzo;

    await findAsistenciaColaborador.save();

    res.status(200).json({
      message: "AsistenciaColaborador actualizada",
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports = updateAsistenciaColaborador;
