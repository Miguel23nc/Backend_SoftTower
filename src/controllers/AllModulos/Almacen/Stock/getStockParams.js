const StockAlmacen = require("../../../../models/AllModulos/Almacen/Stock");

const getStockByParams = async (req, res) => {
  try {
    const { contratoId } = req.query;

    const query = {};
    if (contratoId) query.contratoId = contratoId;

    const Stock = await StockAlmacen.find(query)
      .populate("productoId")
      .populate("ubicacionId")
      .populate("movimientoId");

    if (!Stock) {
      return res.status(404).json({ message: "Stock no encontrada" });
    }

    return res.status(200).json(Stock);
  } catch (err) {
    console.log("Error al buscar el Stock:", err);
    
    return res
      .status(500)
      .json({ message: err.message || "Error al buscar la Stock" });
  }
};

module.exports = getStockByParams;
