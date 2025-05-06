const Notification = require("../../../models/Herramientas/Notification/Notificacion");

const getAllNotificaciones = async (req, res) => {
  try {
    const notificaciones = await Notification.find()
      .populate({
        path: "creator",
        select: "name lastname",
        model: "Employee",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json(notificaciones);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Error interno del servidor" });
  }
};

module.exports = getAllNotificaciones;
