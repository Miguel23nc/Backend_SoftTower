const convertPathToPdf = require("../../utils/convertToPdf");

const returnPdf = async (req, res) => {
  try {
    const { archivoUrl, nameDoc } = req.body;
    if (!archivoUrl || !nameDoc) {
      return res.status(400).json({ message: "Faltan datos para procesar." });
    }
    if (!pdfBuffer)
      return res
        .satatus(400)
        .json({ message: "No se pudo descargar el archivo PDF." });
    console.log("pdfPath", pdfBuffer);
    await mailtrap(pdfBuffer, nameDoc);
    return res.status(200).json({ message: "Correo enviado con éxito" });
  } catch (error) {
    console.error("Error en la conversión:", error.message);
    return res.status(500).json({ message: "Error al procesar la solicitud." });
  }
};

module.exports = returnPdf;
