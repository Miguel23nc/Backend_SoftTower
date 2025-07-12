const Movimiento = require("../../../../models/AllModulos/Almacen/Movimiento");

const generarCorrelativa = async (tipo) => {
  try {
    const now = new Date();
    const año = now.getFullYear().toString().slice(2); // ejemplo: 2025 → "25"
    const prefijo = tipo === "INGRESO" ? "CI" : "CS";

    // Buscar la última correlativa del año y tipo
    const ultMovimiento = await Movimiento.findOne({
      movimiento: tipo,
      correlativa: { $regex: `^${prefijo}${año}` },
    })
      .sort({ createdAt: -1 })
      .lean();

    let nuevoNumero = 1;

    if (ultMovimiento?.correlativa) {
      const numero = parseInt(ultMovimiento.correlativa.slice(4)); // ej. "2500005" → 00005
      nuevoNumero = numero + 1;
    }

    const correlativoStr = nuevoNumero.toString().padStart(5, "0");
    return `${prefijo}${año}${correlativoStr}`;
  } catch (error) {
    console.error("Error al generar correlativa:", error.message);
    throw error;
  }
};

module.exports = generarCorrelativa;
