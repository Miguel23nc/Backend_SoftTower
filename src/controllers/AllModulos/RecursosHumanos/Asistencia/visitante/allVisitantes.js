const AsistenciaVisitante = require("../../../../models/RecursosHumanos/AsistenciaVisitante");

const getAllAsistenciaVisitante = async (req, res) => {
  try {
    const asistencia = await AsistenciaVisitante.find().populate(
      "colaborador",
      "name lastname photo documentType documentNumber state charge business sede"
    );

    if (!asistencia || asistencia.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron Asistencias de Visitantes" });
    }

    // Devolvemos las asistencias con los datos del Visitante
    return res.status(200).json(asistencia);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getAllAsistenciaVisitante;
