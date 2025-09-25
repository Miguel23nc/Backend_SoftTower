const mongoose = require("mongoose");
const { Schema } = mongoose;

const productoAlmacenSchema = new Schema(
  {
    // sku: { type: String, required: true, unique: true },
    descripcion: { type: String, required: true },
    unidadDeMedida: { type: String, required: true },
    subItem: {
      type: String,
      enum: ["1.1", "1.2", "1.3"],
    },
    observaciones: String,
  },
  { timestamps: true }
);

const ProductoAlmacen = mongoose.model(
  "ProductoAlmacen",
  productoAlmacenSchema
);
module.exports = ProductoAlmacen;
