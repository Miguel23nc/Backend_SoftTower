const AsistenciaColaborador = require("../../../../models/RecursosHumanos/AsistenciaColaborador");

const postAsistenciaColaborador = async (req, res) => {
  try {
    const {
      colaborador,
      fecha,
      ingreso,
      salida,
      inicioAlmuerzo,
      finAlmuerzo,
      estado,
    } = req.body;
    console.log("req.body", req.body);

    if (!colaborador || !fecha) {
      return res
        .status(400)
        .json({ message: "Colaborador y fecha son obligatorios" });
    }

    let asistenciaExistente = await AsistenciaColaborador.findOne({
      colaborador,
      fecha: fecha,
    });

    if (!asistenciaExistente && !ingreso) {
      return res.status(400).json({
        message: "Debe registrar el ingreso antes de marcar otros datos.",
      });
    }
    const findAsistencia = await AsistenciaColaborador.findOne({
      colaborador,
      fecha: fecha,
    });

    if (findAsistencia) {
      return res.status(400).json({
        message: "Ya existe una asistencia para este colaborador en esta fecha",
      });
    }

    const asistencia = new AsistenciaColaborador({
      colaborador,
      fecha,
      ingreso,
      salida,
      inicioAlmuerzo,
      finAlmuerzo,
      estado,
    });

    await asistencia.save();
    return res.status(201).json({
      message: "Asistencia creada correctamente",
      asistencia,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = postAsistenciaColaborador;
