const convertPathToPdf = require("../../../../../utils/convertToPdf");

const returnPdf = async (req, res) => {
  try {
    const { archivoUrlDocx } = req.body;
    if (!archivoUrlDocx) {
      return res.status(404).json({ message: "Archivo no encontrado." });
    }
    console.log("archivoUrlDocx", archivoUrlDocx);
    
    const pdfBuffer = await convertPathToPdf(archivoUrlDocx);
    if (!pdfBuffer) {
      return res
        .status(404)
        .json({ message: "No se pudo convertir el archivo." });
    }
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="document.pdf"`,
    });
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error en returnPdf:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = returnPdf;
