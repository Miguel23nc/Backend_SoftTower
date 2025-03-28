const Employee = require("../../../../../models/Employees/Employee");
const AsistenciaColaborador = require("../../../../../models/RecursosHumanos/AsistenciaColaborador");

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
    //si recibo el ingreso debo marcar min tardanza
    //si recibo la salida debo marcar min extras

    if (!fecha) {
      return res.status(400).json({ message: "La Fecha es obligatoria" });
    }
    if (!colaborador && !dni) {
      return res
        .status(400)
        .json({ message: "El colaborador o el DNI es obligatorio" });
    }

    let asistenciaExistente;
    let findColaborador = null;

    if (colaborador) {
      asistenciaExistente = await AsistenciaColaborador.findOne({
        colaborador,
        fecha,
      });
    } else if (dni) {
      findColaborador = await Employee.findOne({ documentNumber: dni });

      if (!findColaborador) {
        return res
          .status(404)
          .json({ message: "No se encontró un colaborador con este DNI" });
      }

      asistenciaExistente = await AsistenciaColaborador.findOne({
        colaborador: findColaborador._id,
        fecha,
      });
    }

    if (!asistenciaExistente && !ingreso) {
      return res.status(400).json({
        message: "Debe registrar el ingreso antes de marcar otros datos.",
      });
    }

    if (asistenciaExistente) {
      return res.status(400).json({
        message: "Ya existe una asistencia para este colaborador en esta fecha",
      });
    }

    const asistencia = new AsistenciaColaborador({
      colaborador: colaborador || findColaborador._id, // ✅ Asegura que siempre haya un colaborador
      fecha,
      ingreso,
      salida,
      inicioAlmuerzo,
      finAlmuerzo,
      estado,
    });

    await asistencia.save();
    return res.status(200).json({
      message: "Asistencia creada correctamente",
      asistencia,
    });
  } catch (error) {
    console.error("❌ Error en postAsistenciaColaborador:", error);
    return res
      .status(500)
      .json({ message: error.message || "Error inesperado en el servidor." });
  }
};

module.exports = postAsistenciaColaborador;
