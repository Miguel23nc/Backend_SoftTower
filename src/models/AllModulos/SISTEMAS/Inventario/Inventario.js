const mongoose = require("mongoose");
const { Schema } = mongoose;

const inventarioSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    encargado: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    fecha: {
      type: String,
      default: Date.now,
    },
    sede: {
      type: String,
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      enum: ["ACTIVO", "INACTIVO", "DISPONIBLE"],
      default: "DISPONIBLE",
    },
    descripcion: {
      type: String,
      required: true,
    },
    observacion: {
      type: String,
    },
  },
  { timestamps: true }
);

const InventarioSistemas = mongoose.model("Inventario", inventarioSchema);

module.exports = InventarioSistemas;
