const Submodule = require("../../models/SubModule");

const createSubmodule = async (req, res) => {
  const { name, module } = req.body;
  try {
    const newSubmodule = new Submodule({ name, module });

    const savedSubmodule = await newSubmodule.save();
    return res.status(200).json(savedSubmodule);
  } catch (error) {
    return res.status(500).json({message : error});

  }
};

module.exports = createSubmodule;
