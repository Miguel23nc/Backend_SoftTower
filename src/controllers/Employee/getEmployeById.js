const Employee = require("../../models/Employees/Employee");

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee) {
      console.log("Employee not found");

      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json(employee);
  } catch (error) {
    console.log("Error in getEmployeeById", error);

    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = getEmployeeById;
