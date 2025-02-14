const ILovePDFApi = require("@ilovepdf/ilovepdf-nodejs");
const { ILOVEPDF_PUBLIC_API_KEY, ILOVEPDF_SECRET_API_KEY } = process.env;

const instance = new ILovePDFApi(
  ILOVEPDF_PUBLIC_API_KEY,
  ILOVEPDF_SECRET_API_KEY
);

const convertPathToPdf = async (archivoUrl) => {
  console.log("archivoUrl", archivoUrl);
  
  try {
    // Crear una nueva tarea
    let task = instance.newTask("officepdf");
    await task.start();
    // console.log("Tarea iniciada en iLovePDF");

    await task.addFile(archivoUrl);
    // console.log("Archivo agregado a la tarea:");

    await task.process();

    const pdfBuffer = await task.download();
    if (!pdfBuffer) throw new Error("No se pudo descargar el archivo PDF.");
    return pdfBuffer;
  } catch (error) {
    console.error("Error al convertir el archivo DOCX a PDF:", error.message);
    throw error;
  }
};

module.exports = convertPathToPdf;
