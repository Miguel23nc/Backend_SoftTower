const Employee = require("../../../../../models/Employees/Employee");
const AsistenciaColaborador = require("../../../../../models/RecursosHumanos/AsistenciaColaborador");

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
  //necesito saber que se cambió, si se cambió el ingreso o la salida se cambia, miniTarde o minExtras
  try {
    let findAsistenciaColaborador;
    let ingresoConDni = false;

    if (dni) {
      const findColaborador = await Employee.findOne({ documentNumber: dni });
      if (!findColaborador) {
        return res.status(404).json({ message: "Colaborador no encontrado" });
      }
      findAsistenciaColaborador = await AsistenciaColaborador.findOne({
        colaborador: findColaborador._id,
        fecha: fecha,
      });

      ingresoConDni = true; // Marcar que se ingresó con DNI
    } else if (colaborador) {
      findAsistenciaColaborador = await AsistenciaColaborador.findOne({
        colaborador: colaborador,
        fecha: fecha,
      });
    }

    if (!findAsistenciaColaborador) {
      return res
        .status(404)
        .json({ message: "No se encontró esta asistencia" });
    }

    if (ingresoConDni) {
      if (inicioAlmuerzo && findAsistenciaColaborador.inicioAlmuerzo)
        return res.status(400).json({
          message: "No se puede modificar el Inicio de Almuerzo",
        });
      if (finAlmuerzo && findAsistenciaColaborador.finAlmuerzo)
        return res.status(400).json({
          message: "No se puede modificar el Fin de Almuerzo",
        });
      if (salida && findAsistenciaColaborador.salida)
        return res.status(400).json({
          message: "No se puede modificar la Salida",
        });
    }
    let minTarde = 0;
    if (ingreso) {
      let state;
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
      findAsistenciaColaborador.ingreso = ingreso;
      findAsistenciaColaborador.minTarde = minTarde;
      findAsistenciaColaborador.estado = state;
    }
    let horasExtras = 0;
    if (salida) {
      const horaSalida = dayjs(salida, "hh:mm A").format("hh:mm A");
      const diaSemana = dayjs(fecha).day(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
      const horaLimiteSalida =
        diaSemana === 6
          ? dayjs().hour(13).minute(30).format("hh:mm A") // Sábado: 1:30 PM
          : dayjs().hour(18).minute(0).format("hh:mm A"); // Lunes a Viernes: 6:00 PM

      if (horaSalida > horaLimiteSalida) {
        horasExtras =
          dayjs(horaSalida, "hh:mm A").diff(
            dayjs(horaLimiteSalida, "hh:mm A"),
            "minute"
          ) + 30;
      }
      findAsistenciaColaborador.salida = salida;
      findAsistenciaColaborador.minExtras = horasExtras;
    }

    if (colaborador) findAsistenciaColaborador.colaborador = colaborador;
    if (fecha) findAsistenciaColaborador.fecha = fecha;
    if (inicioAlmuerzo)
      findAsistenciaColaborador.inicioAlmuerzo = inicioAlmuerzo;
    if (finAlmuerzo) findAsistenciaColaborador.finAlmuerzo = finAlmuerzo;

    await findAsistenciaColaborador.save();

    res.status(200).json({ message: "Asistencia del colaborador actualizada" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = updateAsistenciaColaborador;
