const AsistenciaColaborador = require("../../../../../models/RecursosHumanos/AsistenciaColaborador");

const getAsistenciaByParams = async (req, res) => {
  try {
    const { page = 0, limit = 10 } = req.query;

    const [data, total] = await Promise.all([
      AsistenciaColaborador.find()
        .skip(page * limit)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 })
        .populate("colaborador", "name lastname "),
      AsistenciaColaborador.countDocuments(),
    ]);

    return res.json({ data, total });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message || "Error al buscar las Asistencias" });
  }
};

module.exports = getAsistenciaByParams;
