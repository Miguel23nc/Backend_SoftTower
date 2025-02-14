const Module = require("../../models/Module");

const getModules = async(req, res) =>{
    try {
        const modules = await Module.find()
        return res.status(200).json(modules)
    } catch (error) {
        console.log(error);
    }
} 
module.exports = getModules