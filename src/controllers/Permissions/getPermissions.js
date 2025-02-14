const Permissions = require("../../models/Permissions");

const getPermissions = async (req, res) => {
    try {

        const permissionsFound = await Permissions.find();
        return res.status(201).json(
            permissionsFound
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error });
    }
}
module.exports = getPermissions