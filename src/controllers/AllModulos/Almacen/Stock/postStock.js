const StockAlmacen = require("../../../../models/AllModulos/Almacen/Stock");

const postStockAlmacen = async (req, res) => {
  const {
    productoId,
    ubicacionId,
    movimientoId,
    sedeId,
    contratoId,
    cantidad,
    creadoPor,
  } = req.body;

  try {
    if (
      !productoId ||
      !ubicacionId ||
      !movimientoId ||
      !sedeId ||
      !contratoId ||
      cantidad === undefined
    ) {
      return res.status(400).json({
        message: "Faltan datos requeridos para crear el stock",
      });
    }
    const existingStock = await StockAlmacen.findOne({
      productoId,
      ubicacionId,
      sedeId,
      contratoId,
    });

    if (existingStock) {
      return res.status(409).json({
        message:
          "Ya existe un registro de stock para este producto en esa ubicación.",
      });
    }
    const nuevaStock = {
      productoId,
      cantidad,
      ubicacionId,
      movimientoId,
      sedeId,
      contratoId,
      creadoPor: creadoPor,
    };

    const response = await StockAlmacen.create(nuevaStock);
    return res.status(201).json({
      message: "Stock creado exitosamente",
      stock: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Error al crear el stock",
    });
  }
};

module.exports = postStockAlmacen;
