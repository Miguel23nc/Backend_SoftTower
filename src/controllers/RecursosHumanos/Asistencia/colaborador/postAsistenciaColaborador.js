const Employee = require("../../../../models/Employees/Employee");
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
      dni,
    } = req.body;
    console.log("req.body", req.body);

    if (!fecha) {
      return res.status(400).json({ message: "La Fecha es obligatoria" });
    }
    if (!colaborador && !dni) {
      return res
        .status(400)
        .json({ message: "El colaborador o el dni es obligatorio" });
    }

    let asistenciaExistente;
    if (colaborador) {
      asistenciaExistente = await AsistenciaColaborador.findOne({
        colaborador,
        fecha: fecha,
      });
    }
    if (dni) {
      const findColaborador = await Employee.findOne({
        documentNumber: dni,
      });
      asistenciaExistente = await AsistenciaColaborador.findOne({
        colaborador: findColaborador._id,
        fecha: fecha,
      });
    }

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
