const mongoose = require("mongoose");
const { Schema } = mongoose;

const movimientoSchema = new Schema(
  {
    movimiento: {
      type: String,
      enum: ["INGRESO", "SALIDA"],
      required: true,
    },
    correlativa: { type: String, required: true, unique: true },
    codigoIngreso: String,
    numeroDeActa: { type: String, required: true },
    contribuyente: { type: String, required: true },
    numeroDocumento: { type: Number, required: true },
    datosGenerales: {
      fecha: { type: String, required: true },
      horaIngreso: { type: String, required: true },
      recepcionadoPor: { type: String, required: true },
      dniRecepcionadoPor: { type: String, required: true },
      responsableEntrega: { type: String, required: true },
      registroOCIP: { type: String, required: true },
      estadoActa: String,
    },
    descripcionBienes: [
      {
        productoId: {
          type: Schema.Types.ObjectId,
          ref: "Producto",
          required: true,
        },
        cant: { type: Number, required: true },
        ubicacionId: {
          type: Schema.Types.ObjectId,
          ref: "Ubicacion",
          required: true,
        },
      },
    ],
    detallesDePeso: String,
    referenciaImagen: {
      type: String,
    },
    observaciones: String,
    horaSalida: String,
    fechaSalida: String,
    contratoId: {
      type: Schema.Types.ObjectId,
      ref: "Contrato",
      required: true,
    },
    sedeId: {
      type: Schema.Types.ObjectId,
      ref: "Sede",
      required: true,
    },
    creadoPor: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
  },
  { timestamps: true }
);
const Movimiento = mongoose.model("Movimiento", movimientoSchema);
module.exports = Movimiento;
