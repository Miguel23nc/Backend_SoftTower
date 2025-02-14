const cron = require("node-cron");
const mongoose = require("mongoose");
const Asistencia = require("./models/Asistencia");
const Colaborador = require("./models/Colaborador");

mongoose.connect("mongodb://localhost:27017/tuBaseDeDatos", { useNewUrlParser: true, useUnifiedTopology: true });

cron.schedule("0 21 * * *", async () => {
  console.log("⏳ Ejecutando registro de faltas...");

  const fechaHoy = new Date().toISOString().split("T")[0];

  const colaboradoresActivos = await Colaborador.find({ estado: "activo" });

  for (const colaborador of colaboradoresActivos) {
    const asistencia = await Asistencia.findOne({ colaboradorId: colaborador._id, fecha: fechaHoy });

    if (!asistencia) {
      await Asistencia.create({
        colaboradorId: colaborador._id,
        fecha: fechaHoy,
        horaLlegada: "00:00:00",
        estado: "Falta",
      });
    }
  }
  console.log("✅ Registro de faltas completado.");
});
