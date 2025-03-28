const BoletaDePagos = require("../../../../models/RecursosHumanos/BoletaDePago");

const actualizarCorrelativas = async (correlativaEliminada) => {
  try {
    const result = await BoletaDePagos.updateMany(
      { correlativa: { $gt: correlativaEliminada } },
      { $inc: { correlativa: -1 } }
    );

    console.log(`${result.nModified} correlativas han sido actualizadas.`);
  } catch (error) {
    console.error("Error al actualizar las correlativas:", error.message);
    throw error;
  }
};

module.exports = actualizarCorrelativas;
