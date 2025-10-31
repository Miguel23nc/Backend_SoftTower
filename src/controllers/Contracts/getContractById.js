const Contract = require("../../models/Contracts");

const getContractById = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contract.findOne({ colaborador: id });
    if (!contract) {
      return res.status(404).json({ message: "Contrato no encontrado" });
    }

    res.status(200).json(contract);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getContractById;
