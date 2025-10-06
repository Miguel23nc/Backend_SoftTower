const Producto = require("../../../../models/AllModulos/Almacen/Producto");

const postProductosAlmacen = async (req, res) => {
  const { descripcion, unidadDeMedida, subItem } = req.body;

  try {
    if (!descripcion || !unidadDeMedida) {
      return res.status(400).json({
        message: "Faltan datos requeridos para crear el producto",
      });
    }
    const nuevoProducto = {
      descripcion,
      unidadDeMedida,
      subItem,
    };
    const response = await Producto.create(nuevoProducto);
    return res.status(201).json({
      message: "Producto creado exitosamente",
      producto: response,
    });
  } catch (error) {
    console.log("Error al crear el producto:", error);
    
    return res.status(500).json({
      message: error.message || "Error al crear el producto",
    });
  }
};

module.exports = postProductosAlmacen;
