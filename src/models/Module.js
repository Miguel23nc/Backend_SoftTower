const mongoose = require("mongoose");

const moduleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Module = mongoose.model("Module", moduleSchema);
module.exports = Module;
