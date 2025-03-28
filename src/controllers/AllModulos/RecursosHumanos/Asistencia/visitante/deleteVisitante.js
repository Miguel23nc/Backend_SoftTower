const AsistenciaVisitante = require("../../../../models/RecursosHumanos/AsistenciaVisitante");

const deleteAsistenciaVisitante = async (req, res) => {
  const { _id } = req.body;
  try {
    const asistencia = await AsistenciaVisitante.findByIdAndDelete(_id);
    if (!asistencia) {
      return res
        .status(404)
        .json({ message: "Asistencia de Visitante no encontrada" });
    }
    return res
      .status(200)
      .json({ message: "Asistencia de Visitante eliminada" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = deleteAsistenciaVisitante;
