const InventarioSistemas = require("../../../../models/AllModulos/SISTEMAS/Inventario/Inventario");

const postInventarioSistemas = async (req, res) => {
  const {
    name,
    modelo,
    especificaciones,
    area,
    encargado,
    fecha,
    sede,
    cantidad,
    state,
    observacion,
  } = req.body;
  try {
    if (
      !name ||
      !modelo ||
      !especificaciones ||
      !area ||
      !encargado ||
      !sede ||
      !cantidad ||
      !fecha ||
      !state
    ) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const newInventario = new InventarioSistemas({
      name,
      modelo,
      especificaciones,
      area,
      encargado,
      fecha,
      sede,
      cantidad,
      state,
      observacion,
    });

    await newInventario.save();
    res.status(201).json({ message: "Inventario creado", data: newInventario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = postInventarioSistemas;
