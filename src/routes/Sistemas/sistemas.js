const { Router } = require("express");
const postInventarioSistemas = require("../../controllers/AllModulos/Sistemas/Inventario/postInventario");
const getIntenarioSistemas = require("../../controllers/AllModulos/Sistemas/Inventario/getInventarios");

const sistemasRouter = Router();

sistemasRouter.post("/postInventario", postInventarioSistemas);
sistemasRouter.get("/getInventario", getIntenarioSistemas);

module.exports = sistemasRouter;
