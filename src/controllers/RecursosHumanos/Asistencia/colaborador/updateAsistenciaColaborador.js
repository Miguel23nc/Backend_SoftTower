const Employee = require("../../../../models/Employees/Employee");
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

    if (colaborador) findAsistenciaColaborador.colaborador = colaborador;
    if (fecha) findAsistenciaColaborador.fecha = fecha;
    if (ingreso) findAsistenciaColaborador.ingreso = ingreso;
    if (salida) findAsistenciaColaborador.salida = salida;
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
