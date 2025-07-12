const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const plantillasRHSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    modulo: {
      type: String,
      required: true,
    },
    archivo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PlantillasRH = mongoose.model("PlantillasRH", plantillasRHSchema);

module.exports = PlantillasRH;
