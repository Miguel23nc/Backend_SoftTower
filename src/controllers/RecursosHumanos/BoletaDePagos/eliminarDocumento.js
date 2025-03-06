const { deleteDocument } = require("../../../utils/cloudinary/documents");

const EliminarDocumento = async (req, res) => {
  const { public_id } = req.body;
  console.log("public_id:", public_id);
  console.log("req.body:", req.body);

  try {
    if (!public_id)
      return res.status(400).json({ message: "public_id requerida" });
    setTimeout(async () => {
      try {
        const result = await deleteDocument(public_id);
        console.log("result:", result);
      } catch (error) {
        console.log("Error en eliminar documento:", error);
      }
    }, 300000);

    return res.status(200).json({ message: "Documento eliminado" });
  } catch (error) {
    console.log("Error en mostrarDocxBoleta:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = EliminarDocumento;
