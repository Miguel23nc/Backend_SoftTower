const mongoose = require("mongoose");
const { Schema } = mongoose;

const stockSchema = new Schema(
  {
    productoId: {
      type: Schema.Types.ObjectId,
      ref: "ProductoAlmacen",
      required: true,
    },
    cantidadTotal: {
      type: Number,
    },
    cantidadDisponible: {
      type: Number,
    },
    movimientoId: {
      type: Schema.Types.ObjectId,
      ref: "Movimiento",
      required: true,
    },
    sedeId: {
      type: Schema.Types.ObjectId,
      ref: "Sede",
      required: true,
    },
    contratoId: {
      type: Schema.Types.ObjectId,
      ref: "Contrato",
      required: true,
    },

    creadoPor: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    actualizadoPor: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
  },
  {
    timestamps: true,
  }
);

const StockAlmacen = mongoose.model("Stock", stockSchema);
module.exports = StockAlmacen;
