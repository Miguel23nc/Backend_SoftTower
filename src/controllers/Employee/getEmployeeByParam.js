const Employee = require("../../models/Employees/Employee");

const getEmployeeByParams = async (req, res) => {
  try {
    const { query } = req;

    const [data, total] = await Promise.all([
      Employee.find(query)
        .skip(page * limit)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 }),
      Employee.countDocuments(query),
    ]);

    return res.json({ data, total });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message || "Error al buscar Colaboradores" });
  }
};

module.exports = getEmployeeByParams;
