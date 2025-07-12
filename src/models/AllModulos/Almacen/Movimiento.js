const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const movimientoSchema = new Schema(
  {
    movimiento: {
      type: String,
      enum: ["INGRESO", "SALIDA"],
      required: true,
    },
    correlativa: {
      type: String,
      required: true,
      unique: true,
    },
    codigoIngreso: {
      type: String,
    },
    numeroDeActa: {
      type: String,
      required: true,
    },
    contribuyente: {
      type: String,
      required: true,
    },
    numeroDocumento: {
      type: Number,
      required: true,
    },
    datosGenerales: {
      fecha: {
        type: String,
        required: true,
      },
      horaIngreso: {
        type: String,
        required: true,
      },
      recepcionadoPor: {
        type: String,
        required: true,
      },
      dniRecepcionadoPor: {
        type: String,
        required: true,
      },
      responsableEntrega: {
        type: String,
        required: true,
      },
      registroOCIP: {
        type: String,
        required: true,
      },
      estadoActa: String,
    },
    descripcionBienes: [
      {
        productoId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Producto",
          required: true,
        },
        cant: Number,
      },
    ],
    detallesDePeso: String,
    referenciaImagen: {
      type: [String],
      required: true,
      default: [],
    },
    observaciones: String,
    firmas: {
      horaSalida: String,
      fechaSalida: String,
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

const Movimiento = mongoose.model("Movimiento", movimientoSchema);
module.exports = Movimiento;
