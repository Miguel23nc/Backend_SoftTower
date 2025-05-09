const ILovePDFApi = require("@ilovepdf/ilovepdf-nodejs");
const { ILOVEPDF_PUBLIC_API_KEY, ILOVEPDF_SECRET_API_KEY } = process.env;

const instance = new ILovePDFApi(
  ILOVEPDF_PUBLIC_API_KEY,
  ILOVEPDF_SECRET_API_KEY
);

const convertPathToPdf = async (archivoUrl) => {
  try {
    let task = instance.newTask("officepdf");
    await task.start();

    await task.addFile(archivoUrl);

    await task.process();

    const pdfBuffer = await task.download();
    if (!pdfBuffer) throw new Error("No se pudo descargar el archivo PDF.");
    return pdfBuffer;
  } catch (error) {
    throw ("Error al convertir el archivo DOCX a PDF:", error.message);
  }
};

module.exports = convertPathToPdf;
