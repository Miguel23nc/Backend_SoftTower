const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImge = async (file, folder) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: folder,
      resource_type: "image",
    });
    return result;
  } catch (error) {
    console.error("Error al subir la imagen a Cloudinary:", error.message);
    throw error;
  }
};

const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Error al eliminar la imagen de Cloudinary:", error.message);
    throw error;
  }
};

const uploadDocument = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: "documents",
    });
    return result;
  } catch (error) {
    console.error("Error al subir el documento a Cloudinary:", error.message);
    throw error;
  }
};

const deleteDocument = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error(
      "Error al eliminar el documento de Cloudinary:",
      error.message
    );
    throw error;
  }
};

module.exports = { uploadImge, deleteImage, uploadDocument, deleteDocument };
