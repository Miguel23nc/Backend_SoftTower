const mongoose = require("mongoose");
const { Schema } = mongoose;

const stockSchema = new Schema(
  {
    productoId: {
      type: Schema.Types.ObjectId,
      ref: "ProductoAlmacen",
      required: true,
    },
    ubicacionId: {
      type: Schema.Types.ObjectId,
      ref: "Ubicacion",
      required: true,
    },
    movimientoId: {
      type: Schema.Types.ObjectId,
      ref: "MovimientoAlmacen",
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
      ref: "User",
    },
    actualizadoPor: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const StockAlmacen = mongoose.model("Stock", stockSchema);
module.exports = StockAlmacen;
