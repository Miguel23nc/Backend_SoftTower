const { v4: uuidv4 } = require("uuid");
const cloudinary = require("./config.js");

const uploadDocument = (fileBuffer, fileName) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "home/TOWER/DOCUMENTS",
        resource_type: "raw",
        public_id: fileName,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });
};

const deleteDocument = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "raw",
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const uploadTemporaryDocument = (fileBuffer, fileName) => {
  return new Promise((resolve, reject) => {
    const uniqueFileName = `${uuidv4()}-${fileName}`;
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "home/TOWER/TEMP_DOCS",
        resource_type: "raw",
        public_id: uniqueFileName,
      },
      async (error, result) => {
        if (error) return reject(error);

        console.log(`Archivo subido: ${result.secure_url}`);

        setTimeout(async () => {
          try {
            await cloudinary.uploader.destroy(result.public_id, {
              resource_type: "raw",
            });
            console.log(`Archivo eliminado: ${result.public_id}`);
          } catch (err) {
            console.error(`Error al eliminar ${result.public_id}:`, err);
          }
        }, 10 * 60 * 1000);

        resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });
};

module.exports = { uploadDocument, deleteDocument, uploadTemporaryDocument };
