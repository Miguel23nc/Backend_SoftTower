const mongoose = require("mongoose");
const { Schema } = mongoose;

const inventarioSistemasSchema = new Schema(
  {
    codigo: {
      type: String,
      unique: true,
      required: true,
    },
    categoria: {
      type: String,
      required: true,
    },
    marca: {
      type: String,
      required: true,
    },
    modelo: {
      type: String,
      required: true,
    },
    especificaciones: {
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
      enum: ["ACTIVO", "INACTIVO"],
      default: "ACTIVO",
    },
    observacion: {
      type: String,
    },
  },
  { timestamps: true }
);

const InventarioSistemas = mongoose.model(
  "InventarioSistemas",
  inventarioSistemasSchema
);

module.exports = InventarioSistemas;
