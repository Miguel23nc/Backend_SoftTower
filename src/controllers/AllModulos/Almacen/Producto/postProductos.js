const Producto = require("../../../../models/AllModulos/Almacen/Producto");

const postProductosAlmacen = async (req, res) => {
  const {
    item,
    cantidad,
    descripcion,
    unidadDeMedida,
    pesoNeto,
    pesoBruto,
    estadoEnvase,
    subItem,
  } = req.body;

  try {
    if (!item || !descripcion || !unidadDeMedida) {
      return res.status(400).json({
        message: "Faltan datos requeridos para crear el producto",
      });
    }
    const nuevoProducto = {
      item,
      cantidad,
      descripcion,
      unidadDeMedida,
      pesoNeto,
      pesoBruto,
      estadoEnvase,
      subItem,
    };
    const response = await Producto.create(nuevoProducto);
    return res.status(201).json({
      message: "Producto creado exitosamente",
      producto: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Error al crear el producto",
    });
  }
};

module.exports = postProductosAlmacen;
