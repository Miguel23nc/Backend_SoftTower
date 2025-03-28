const Business = require("../../../../models/Business");

const deleteBusiness = async (req, res) => {
  const { _id } = req.body;
  try {
    const userDelete = await Business.findByIdAndDelete(_id);

    if (!userDelete) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }

    return res.status(200).json({
      message: "Empresa eliminada correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = deleteBusiness;
