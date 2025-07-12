const postProductosAlmacen = async (req, res) => {
  const { item, cantidad, descripcion, unidadDeMedida } = req.body;

  try {
    if (!item || !descripcion || !precio || !cantidad) {
      return res.status(400).json({
        message: "Faltan datos requeridos para crear el producto",
      });
    }

x
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Error al crear el producto",
    });
  }
};

module.exports = postProductosAlmacen;
