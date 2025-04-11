const InventarioSistemas = require("../../../../models/AllModulos/SISTEMAS/Inventario/Inventario");

const patchInventarioSistemas = async (req, res) => {
  const {
    _id,
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
    const inventario = await InventarioSistemas.findById(_id);
    if (!inventario) {
      return res.status(404).json({ message: "Inventario no encontrado" });
    }
    const existingInventario = await InventarioSistemas.findOne({
      _id: { $ne: _id },
      name: name,
      modelo: modelo,
      especificaciones: especificaciones,
    });

    if (existingInventario) {
      return res.status(400).json({
        message:
          "Ya existe un inventario con este nombre, modelo y especificaciones",
      });
    }
    if (name) inventario.name = name;
    if (modelo) inventario.modelo = modelo;
    if (especificaciones) inventario.especificaciones = especificaciones;
    if (area) inventario.area = area;
    if (encargado) inventario.encargado = encargado;
    if (fecha) inventario.fecha = fecha;
    if (sede) inventario.sede = sede;
    if (cantidad) inventario.cantidad = cantidad;
    if (state) inventario.state = state;
    if (observacion) inventario.observacion = observacion;
    await inventario.save();

    return res.status(200).json({
      message: "Inventario editado correctamente",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = patchInventarioSistemas;
