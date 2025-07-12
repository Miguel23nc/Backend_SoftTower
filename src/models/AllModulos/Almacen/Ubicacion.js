const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ubicacionSchema = new Schema(
  {
    zonaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zona",
      required: true,
    },
    rack: String,
    nivel: Number,
    seccion: Number,
    productoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producto",
      required: true,
    },
    cantidad: String,
    observaciones: String,
    estado: {
      type: String,
      enum: ["OCUPADO", "LIBRE", "RESERVADO", "MANTENIMIENTO"],
      default: "LIBRE",
    },
    actualizadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    creadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    contratoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contrato",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ubicacion = mongoose.model("Ubicacion", ubicacionSchema);

module.exports = Ubicacion;
