const Module = require("../../models/Module");

const createModule = async (req, res) => {
  try {
    const { name } = req.body;
    const newModule = new Module({ name });
    const savedModule = await newModule.save();
    return res.status(201).json(savedModule);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = createModule;
