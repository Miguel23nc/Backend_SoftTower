const mongoose = require("mongoose");
const { Schema } = mongoose;

const productoSchema = new Schema(
  {
    item: { type: String, required: true },
    cantidad: { type: String, required: true },
    descripcion: { type: String, required: true },
    unidadDeMedida: { type: String, required: true },
    pesoNeto: { type: String },
    pesoBruto: { type: String },
    estadoEnvase: { type: String },
    subItem: {
      type: String,
      enum: ["1.1", "1.2", "1.3"],
    },
  },
  {
    timestamps: true,
  }
);

const Producto = mongoose.model("Producto", productoSchema);
module.exports = Producto;
