const Contract = require("../../models/Contracts");

const putContracts = async (req, res) => {
  const { _id, typeContract, state, dateStart, dateEnd, empresa, colaborator } =
    req.body;

  try {
    const updatedContract = await Contract.findById(_id);
    if (!updatedContract) {
      return res.status(404).json({ message: "Contrato no encontrado" });
    }
    if (typeContract) updatedContract.typeContract = typeContract;
    if (dateStart) updatedContract.dateStart = dateStart;
    if (dateEnd) updatedContract.dateEnd = dateEnd;
    if (empresa) updatedContract.empresa = empresa;
    if (colaborator) updatedContract.colaborator = colaborator;
    if (state) updatedContract.state = state;
    if (
      !typeContract &&
      !state &&
      !dateStart &&
      !dateEnd &&
      !empresa &&
      !colaborator
    ) {
      return res.status(400).json({ message: "No hay Cambios" });
    }
    await updatedContract.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json({ message: "Contrato actualizado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error updating contract", error });
  }
};

module.exports = putContracts;
