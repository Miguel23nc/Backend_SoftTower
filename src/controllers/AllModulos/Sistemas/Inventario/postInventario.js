const InventarioSistemas = require("../../../../models/AllModulos/SISTEMAS/Inventario/Inventario");

const postInventarioSistemas = async (req, res) => {
  const {
    codigo,
    categoria,
    marca,
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
      !codigo ||
      !categoria ||
      !marca ||
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
    const existingItem = await InventarioSistemas.findOne({
      codigo,
      categoria,
      marca,
      modelo,
    });
    if (existingItem) {
      return res
        .status(400)
        .json({ message: "El inventario ya existe en el sistema" });
    }

    const newInventario = new InventarioSistemas({
      codigo,
      categoria,
      marca,
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
    res.status(500).json({ message: error.message });
  }
};

module.exports = postInventarioSistemas;
