const Employee = require("../../../models/Employees/Employee");
const Notification = require("../../../models/Herramientas/Notification/Notificacion");

const sendNotification = async (
  io,
  { type, title, message, creatorId, submodule, receiverId }
) => {
  try {
    const notification = new Notification({
      type,
      title,
      message,
      creator: creatorId,
      submodule: type === "SUBMODULE" ? submodule : undefined,
      receiver: type === "INDIVIDUAL" ? receiverId : undefined,
    });
    const response = await notification.save();
    if (type === "GLOBAL") {
      io.emit("nuevaNotificacion", notification);
    }

    if (type === "SUBMODULE") {
      const empleados = await Employee.find({
        "modules.submodule.name": submodule.name,
        "modules.name": submodule.module,
      });

      empleados.forEach((emp) => {
        io.to(emp._id.toString()).emit("nuevaNotificacion", notification);
      });
    }

    if (type === "INDIVIDUAL") {
      io.to(receiverId.toString()).emit("nuevaNotificacion", notification);
    }
    return response;
  } catch (error) {
    console.error("Error al enviar la notificación:", error);
    throw new Error("Error al enviar la notificación");
  }
};

module.exports = sendNotification;
