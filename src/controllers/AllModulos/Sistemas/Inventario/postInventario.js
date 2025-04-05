const InventarioSistemas = require("../../../../models/AllModulos/SISTEMAS/Inventario/Inventario");

const postInventarioSistemas = async (req, res) => {
  const {
    name,
    area,
    encargado,
    fecha,
    sede,
    cantidad,
    state,
    descripcion,
    observacion,
  } = req.body;
  try {
    if (
      !name ||
      !area ||
      !encargado ||
      !sede ||
      !cantidad ||
      !descripcion ||
      fecha
    ) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const newInventario = new InventarioSistemas({
      name,
      area,
      encargado,
      fecha,
      sede,
      cantidad,
      state,
      descripcion,
      observacion,
    });

    await newInventario.save();
    res.status(201).json({ message: "Inventario creado", data: newInventario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el inventario" });
  }
};

module.exports = postInventarioSistemas;
