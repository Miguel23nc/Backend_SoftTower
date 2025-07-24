const Producto = require("../../../../models/AllModulos/Almacen/Producto");

async function getProducto(req, res) {
    const { item, _id } = req.query;

    try {
        let query = {};
        if (item) query.item = item;
        if (_id) query._id = _id;

        if (!item && !_id) {
            return res.status(400).json({ message: 'Debe proporcionar item o _id.' });
        }

        const producto = await Producto.findOne(query);


        return res.json(producto);
    } catch (error) {
        return res.status(500).json({ messagge: error.message || 'Error al buscar el producto.' });
    }
}

module.exports = getProducto;