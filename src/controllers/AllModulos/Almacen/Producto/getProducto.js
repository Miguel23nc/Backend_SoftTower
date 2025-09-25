const Producto = require("../../../../models/AllModulos/Almacen/Producto");

async function getProducto(req, res) {
  const { _id, descripcion, unidadDeMedida, subItem } = req.query;

  try {
    let query = {};
    if (_id) query._id = _id;
    if (descripcion) query.descripcion = descripcion;
    if (unidadDeMedida) query.unidadDeMedida = unidadDeMedida;
    if (subItem) query.subItem = subItem;

    const producto = await Producto.findOne(query);

    return res.json(producto);
  } catch (error) {
    return res
      .status(500)
      .json({ messagge: error.message || "Error al buscar el producto." });
  }
}

module.exports = getProducto;
