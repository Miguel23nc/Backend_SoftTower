const StockAlmacen = require("../../../../models/AllModulos/Almacen/Stock");

const patchStockAlmacen = async (req, res) => {
  try {
    const {
      _id,
      productoId,
      ubicacionId,
      cantidad,
      movimientoId,
      sedeId,
      contratoId,
      actualizadoPor,
    } = req.body;
    if (!_id) {
      return res.status(400).json({
        message: "ID del Stock es requerido",
      });
    }
    console.log("cantidad", cantidad);

    const findStock = await StockAlmacen.findById(_id);
    if (productoId) findStock.productoId = productoId;
    if (ubicacionId) findStock.ubicacionId = ubicacionId;
    if (cantidad !== undefined) findStock.cantidadTotal = cantidad;
    if (movimientoId) findStock.movimientoId = movimientoId;
    if (sedeId) findStock.sedeId = sedeId;
    if (contratoId) findStock.contratoId = contratoId;
    if (actualizadoPor) findStock.actualizadoPor = actualizadoPor;
    const response = await findStock.save();

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = patchStockAlmacen;
