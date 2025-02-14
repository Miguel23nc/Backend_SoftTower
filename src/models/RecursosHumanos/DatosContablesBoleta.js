const mongoose = require("mongoose");

const datosContablesSchema = new mongoose.Schema({
  codigoPlame: {
    type: String,
    required: true,
    unique: true,
  },
  cuentaContable: {
    type: String,
  },
  concepto: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
});

const DatosContables = mongoose.model("DatosContables", datosContablesSchema);
module.exports = DatosContables;
