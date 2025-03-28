const mongoose = require("mongoose");
const locationSchema = require("./LocationSchema");

const employeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    documentType: {
      type: String,
      required: true,
    },
    documentNumber: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["VISITANTE", "COLABORADOR"],
      default: "COLABORADOR",
    },
    state: {
      type: String,
      required: true,
      enum: ["ACTIVO", "INACTIVO"],
      default: "ACTIVO",
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    civilStatus: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    telephone: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    location: locationSchema,
    datestart: {
      type: String,
    },
    charge: {
      type: String,
      required: true,
    },
    funcion: {
      type: String,
      required: true,
    },
    sueldo: {
      type: Number,
      required: true,
    },
    // user: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    business: {
      type: String,
      ref: "Business",
      required: true,
    },
    sede: {
      type: String,
      required: true,
    },
    asistenciaAutomatica: {
      type: String,
      enum: ["SI", "NO"],
      default: "NO",
    },
    modules: [
      {
        name: {
          type: String,
          ref: "Module",
        },
        submodule: {
          name: {
            type: String,
            ref: "Submodule",
          },
          permissions: [
            {
              type: String,
              ref: "Permission",
            },
          ],
        },
      },
    ],
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
