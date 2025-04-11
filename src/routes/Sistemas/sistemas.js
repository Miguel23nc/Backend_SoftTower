const { Router } = require("express");
const postInventarioSistemas = require("../../controllers/AllModulos/Sistemas/Inventario/postInventario");
const getIntenarioSistemas = require("../../controllers/AllModulos/Sistemas/Inventario/getInventarios");
const patchInventarioSistemas = require("../../controllers/AllModulos/Sistemas/Inventario/patchInventario");

const sistemasRouter = Router();

sistemasRouter.post("/postInventario", postInventarioSistemas);
sistemasRouter.get("/getInventario", getIntenarioSistemas);
sistemasRouter.patch("/patchInventario", patchInventarioSistemas);
// sistemasRouter.delete("/deleteInventario", deleteInventarioSistemas);

module.exports = sistemasRouter;
