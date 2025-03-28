const Employee = require("../../../../../models/Employees/Employee");
const AsistenciaColaborador = require("../../../../../models/RecursosHumanos/AsistenciaColaborador");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

async function marcarAsistenciaAutomatica() {
  const defaultData = {
    ingreso: "-",
    salida: "-",
    almuerzo: "-",
    minExtras: "-",
    minTarde: "-",
    estado: "FALTA",
  };

  const asistenciaAutomaticaData = {
    ingreso: "08:00 AM",
    salida: "5:30 PM",
    inicioAlmuerzo: "1:00 PM",
    finAlmuerzo: "2:00 PM",
    minExtras: "0",
    minTarde: "0",
    estado: "PRESENTE",
  };
  const hoy = dayjs().tz("America/Lima").format("DD/MM/YYYY");

  try {
    const colaboradores = await Employee.find({ state: "ACTIVO" }).lean();

    const asistenciasHoy = await AsistenciaColaborador.find({
      fecha: hoy,
    }).lean();

    const asistenciaMap = new Map(
      asistenciasHoy.map((a) => [a.colaborador.toString(), a])
    );

    const bulkOps = [];

    for (const empleado of colaboradores) {
      const findAsistenciaHoy = asistenciaMap.get(empleado._id.toString());

      if (findAsistenciaHoy) {
        const updateFields = { ...defaultData, ...findAsistenciaHoy };
        bulkOps.push({
          updateOne: {
            filter: { _id: findAsistenciaHoy._id },
            update: { $set: updateFields },
          },
        });
      } else {
        const dataToPost =
          empleado.asistenciaAutomatica === "SI"
            ? asistenciaAutomaticaData
            : defaultData;

        bulkOps.push({
          insertOne: {
            document: {
              colaborador: empleado._id,
              fecha: hoy,
              ...dataToPost,
            },
          },
        });
      }
    }

    if (bulkOps.length > 0) {
      await AsistenciaColaborador.bulkWrite(bulkOps);
    }
  } catch (error) {
    throw new Error(
      `Error al marcar la asistencia automática: ${error.message}`
    );
  }
}

marcarAsistenciaAutomatica();
