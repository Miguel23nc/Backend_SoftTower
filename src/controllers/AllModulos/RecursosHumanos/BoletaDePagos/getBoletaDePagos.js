const BoletaDePagos = require("../../../../models/RecursosHumanos/BoletaDePago");

const getBoletaDePagos = async (req, res) => {
  const { desde, hasta, empresa } = req.query;
  const query = {};
  try {
    if (desde && hasta) {
      query.fechaBoletaDePago = { $gte: desde, $lte: hasta };
    }

    const boleta = await BoletaDePagos.aggregate([
      {
        $match: {
          ...(desde && hasta
            ? { fechaBoletaDePago: { $gte: desde, $lte: hasta } }
            : {}),
        },
      },
      {
        $lookup: {
          from: "employees", // 👈 nombre de la colección Employee
          localField: "colaborador",
          foreignField: "_id",
          as: "colaborador",
        },
      },
      { $unwind: "$colaborador" },
      {
        $match: empresa ? { "colaborador.business": empresa } : {},
      },
    ]);

    if (!boleta || boleta.length === 0) {
      return res.status(404).json({ message: "Boleta de pagos no encontrada" });
    }
    return res.status(200).json(boleta);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getBoletaDePagos;
