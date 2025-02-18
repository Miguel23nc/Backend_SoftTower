const BoletaDePagos = require("../../../models/RecursosHumanos/BoletaDePago");
const generarCorrelativa = require("./correlativa");

const postBoletaDePagos = async (req, res) => {
  try {
    const boletas = req.body; // Ahora esperamos un array de objetos

    if (!Array.isArray(boletas) || boletas.length === 0) {
      return res.status(400).json({ message: "Debes enviar al menos una boleta válida." });
    }

    for (const boleta of boletas) {
      const {
        fechaBoletaDePago,
        colaborador,
        diasTrabajados,
        diasSubsidiados,
        horasTrabajadas,
        diasNoLaborales,
        remuneraciones,
        descuentosAlTrabajador,
        aportacionesDelEmpleador,
      } = boleta;

      // Validar que cada boleta tenga los datos correctos
      if (
        !fechaBoletaDePago ||
        !colaborador ||
        typeof diasTrabajados !== "number" ||
        typeof diasSubsidiados !== "number" ||
        typeof horasTrabajadas !== "number" ||
        typeof diasNoLaborales !== "number" ||
        !Array.isArray(remuneraciones) || remuneraciones.length === 0 ||
        !Array.isArray(descuentosAlTrabajador) || descuentosAlTrabajador.length === 0 ||
        !Array.isArray(aportacionesDelEmpleador) || aportacionesDelEmpleador.length === 0
      ) {
        return res.status(400).json({ message: "Uno o más objetos en la solicitud son inválidos." });
      }

      let fechaOperacionDate;
      if (typeof fechaBoletaDePago === "string" && fechaBoletaDePago.includes("/")) {
        const [month, year] = fechaBoletaDePago.split("/");
        if (!month || !year) {
          return res.status(400).json({ message: "Fecha inválida en alguna boleta." });
        }
        fechaOperacionDate = new Date(`${year}/${month}`);
      } else {
        fechaOperacionDate = fechaBoletaDePago;
      }

      const boletaFound = await BoletaDePagos.findOne({ fechaBoletaDePago, colaborador });
      if (boletaFound) {
        return res.status(400).json({ message: `La boleta para el colaborador ${colaborador} en la fecha ${fechaBoletaDePago} ya existe.` });
      }

      const correlativa = await generarCorrelativa(fechaOperacionDate);
      if (!correlativa) {
        return res.status(500).json({ message: "Error al generar correlativa." });
      }

      const nuevaBoleta = new BoletaDePagos({
        correlativa,
        fechaBoletaDePago,
        colaborador,
        diasTrabajados,
        diasSubsidiados,
        horasTrabajadas,
        diasNoLaborales,
        remuneraciones,
        descuentosAlTrabajador,
        aportacionesDelEmpleador,
      });

      await nuevaBoleta.save();
    }

    return res.status(201).json({ message: "Boletas de pago creadas exitosamente" });

  } catch (error) {
    console.error("Error en postBoletaDePagos:", error);
    return res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

module.exports = postBoletaDePagos;


