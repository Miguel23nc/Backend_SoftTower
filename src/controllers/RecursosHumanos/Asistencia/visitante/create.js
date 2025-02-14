const AsistenciaVisitante = require("../../../../models/RecursosHumanos/AsistenciaVisitante");

const createAsistenciaVisitante = async (req, res) => {
  const { fecha, ingreso, salida, inicioAlmuerzo, finAlmuerzo, colaborador } =
    req.body;

  try {
    const AsistenciaFound = await AsistenciaVisitante.findOne({
      fecha,
      colaborador,
    });
    if (AsistenciaFound) {
      return res.status(400).json({
        message: "La Asistencia de visitante ya está creada en esta fecha",
      });
    }
    const newAsistencia = new AsistenciaVisitante({
      fecha,
      ingreso,
      salida,
      inicioAlmuerzo,
      finAlmuerzo,
      colaborador,
    });
    await newAsistencia.save();
    return res.status(201).json({
      message: "Asistencia de Visitante creado correctamente",
    });
  } catch (error) {
    console.error("Error al crear la Asistencia de visitante:", error);
    return res.status(500).json({ message: error.message });
  }
};
module.exports = createAsistenciaVisitante;
