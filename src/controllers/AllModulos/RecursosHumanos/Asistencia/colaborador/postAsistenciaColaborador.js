const dayjs = require("dayjs");
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
    let state;
    let minTarde = 0;
    if (!estado) {
      const horaLimite = dayjs().hour(8).minute(0).format("hh:mm A");
      const horaIngreso = dayjs(ingreso, "hh:mm A").format("hh:mm A");
      if (horaIngreso > horaLimite) {
        state = "TARDANZA";
        minTarde = dayjs(horaIngreso, "hh:mm A").diff(
          dayjs(horaLimite, "hh:mm A"),
          "minute"
        );
      }
      if (horaIngreso <= horaLimite) {
        state = "PRESENTE";
      }
    }
    let horasExtras = 0;
    if (salida) {
      const horaSalida = dayjs(salida, "hh:mm A").format("hh:mm A");
      const diaSemana = dayjs(fecha).day(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
      const horaLimiteSalida =
        diaSemana === 6
          ? dayjs().hour(13).minute(0).format("hh:mm A") // Sábado: 1:00 PM
          : dayjs().hour(18).minute(30).format("hh:mm A"); // Lunes a Viernes: 5:30 PM

      if (horaSalida > horaLimiteSalida) {
        horasExtras = dayjs(horaSalida, "hh:mm A").diff(
          dayjs(horaLimiteSalida, "hh:mm A"),
          "minute"
        );
      }
    }

    const asistencia = new AsistenciaColaborador({
      colaborador: colaborador || findColaborador._id,
      fecha,
      ingreso,
      salida,
      inicioAlmuerzo,
      finAlmuerzo,
      estado: estado || state,
      minExtras: horasExtras,
      minTarde: minTarde,
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
