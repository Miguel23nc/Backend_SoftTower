const Employee = require("../../../../models/Employees/Employee");
const BoletaDePagos = require("../../../../models/RecursosHumanos/BoletaDePago");

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const getBoletaDePagoByParams = async (req, res) => {
  const { page = 0, limit = 10, search = "" } = req.query;

  try {
    const query = {};

    if (search) {
      const safeSearch = escapeRegExp(search);
      const regex = new RegExp(safeSearch, "i");
      const colaboradores = await Employee.find({
        $or: [
          { name: regex },
          { lastname: regex },
          { business: regex },
          { charge: regex },
        ],
      }).select("_id");

      const colaboradoresIds = colaboradores.map((c) => c._id);

      // Paso 2: usar esos IDs en la búsqueda principal
      query.$or = [
        { colaborador: { $in: colaboradoresIds } },
        { state: regex },
        { fechaBoletaDePago: regex },
        { envio: regex },
        { recepcion: regex },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$correlativa" },
              regex: search,
              options: "i",
            },
          },
        },
      ];
    }

    const [data, total] = await Promise.all([
      BoletaDePagos.find(query)
        .populate("colaborador")
        .skip(page * limit)
        .limit(limit)
        .sort({ correlativa: -1 })
        .lean(),
      BoletaDePagos.countDocuments(query),
    ]);

    return res.json({ data, total });
  } catch (error) {
    console.error("Error al obtener las boletas de pago:", error);
    return res.status(500).json({
      message: error.message || "Error al obtener las boletas de pago",
    });
  }
};

module.exports = getBoletaDePagoByParams;
