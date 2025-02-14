const logout = async (req, res) => {
    try {
        res.cookie("token", "", { expires: new Date(0) })
        return res.status(200).json({ message: "logou correctamente" })
    } catch (error) {
        console.log(error);
    }

}
module.exports = logout