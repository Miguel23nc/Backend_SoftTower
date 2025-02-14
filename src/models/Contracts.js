const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
  typeContract: {
    type: String,
    required: true,
  },
  state: {
    enum: ["APROBADO", "PENDIENTE"],
    default: "PENDIENTE",
    type: String,
    required: true,
  },
  dateStart: {
    type: String,
    required: true,
  },
  dateEnd: {
    type: String,
    required: true,
  },
  empresa: {
    ruc: {
      type: String,
      required: true,
    },
    razonSocial: {
      type: String,
      required: true,
    },
    domicilioFiscal: {
      type: String,
      required: true,
    },
    representative: {
      type: String,
      required: true,
    },
    representativeDocumentType: {
      type: String,
      required: true,
    },
    representativeDocumentNumber: {
      type: Number,
      required: true,
    },
  },
  colaborator: {
    name: {
      type: String,
      required: true,
    },
    documentType: {
      type: String,
      required: true,
    },
    documentNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    sueldo: {
      type: Number,
      required: true,
    },
    charge: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  marcaAsistencia: {
    type: String,
  },
  codigoSPP: {
    type: String,
  },
  regimenPension: {
    type: String,
  },
});

const Contract = mongoose.model("Contract", contractSchema);

module.exports = Contract;
