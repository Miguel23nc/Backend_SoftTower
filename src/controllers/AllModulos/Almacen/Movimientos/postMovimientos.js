const Movimiento = require("../../../../models/AllModulos/Almacen/Movimiento");
const generarCorrelativa = require("./correlativa");

const createMovimiento = async (req, res) => {
  const { body } = req;

  try {
    if (!body || !body.movimiento || !body.contratoId) {
      return res
        .status(400)
        .json({ message: "Faltan datos requeridos para crear el movimiento" });
    }
    if (body.movimiento === "SALIDA" && !body.codigoIngreso) {
      return res.status(400).json({
        message: "Falta el código de ingreso para el movimiento de salida",
      });
    }
    const correlativa = await generarCorrelativa(body.movimiento);
    body.correlativa = correlativa;
    await Movimiento.create(body);
    return res.status(201).json({
      message: `Movimiento de tipo ${body.movimiento} creado exitosamente`,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message || "Error al crear el movimiento" });
  }
};

module.exports = createMovimiento;
