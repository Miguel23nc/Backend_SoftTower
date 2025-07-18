const mongoose = require("mongoose");
const { Schema } = mongoose;

const ubicacionSchema = new Schema(
  {
    zonaId: {
      type: Schema.Types.ObjectId,
      ref: "Zona",
      required: true,
    },
    rack: String,
    nivel: Number,
    seccion: Number,
    porcentaje: String,
    observaciones: String,
    estado: {
      type: String,
      enum: [
        "OCUPADO",
        "LIBRE",
        "RESERVADO",
        "MANTENIMIENTO",
        "PARCIALMENTE OCUPADO",
        "PENDIENTE",
      ],
      default: "LIBRE",
    },
    actualizadoPor: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    creadoPor: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
  },
  { timestamps: true }
);

const Ubicacion = mongoose.model("Ubicacion", ubicacionSchema);
module.exports = Ubicacion;
