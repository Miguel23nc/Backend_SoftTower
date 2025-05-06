const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["GLOBAL", "SUBMODULE", "INDIVIDUAL"],
      required: true,
    },
    submodule: {
      name: String, // Ej: "INVENTARIO"
      module: String, // Ej: "SISTEMAS"
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee", // Solo para INDIVIDUAL
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
