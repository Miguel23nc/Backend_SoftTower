const { Router } = require("express");

const register = require("../controllers/Employee/registerEmployee");
const login = require("../controllers/Employee/login");
const logout = require("../controllers/Employee/logout");
const consulApi = require("../controllers/consultApi/apiRuc");
const verifyToken = require("../controllers/auth/verifyToken");
const postPermissions = require("../controllers/Permissions/postPermissions");
const getPermissions = require("../controllers/Permissions/getPermissions");
const createModule = require("../controllers/Modules/createModule");
const createSubmodule = require("../controllers/SubModules/createSubModule");
const getSubModules = require("../controllers/SubModules/getsubModule");
const getModules = require("../controllers/Modules/getModules");
const getEmployee = require("../controllers/Employee/getEmployee");
const updateEmployeePartial = require("../controllers/Employee/updateEmployee");
const createClient = require("../controllers/Client/createClient");
const getClients = require("../controllers/Client/getClients");
const updateClient = require("../controllers/Client/updateClient");
const deleteClient = require("../controllers/Client/deleteClient");
const createCotizacion = require("../controllers/Cotización/createCotizacion");
const getCotizaciones = require("../controllers/Cotización/getCotizacion");
const deleteCotizacion = require("../controllers/Cotización/deleteCotizacion");
const updateCotizacionPartial = require("../controllers/Cotización/updateCotizacion");
const allContracts = require("../controllers/Contracts/allContracts");
const postContracts = require("../controllers/Contracts/postContracts");
const putContracts = require("../controllers/Contracts/putContracts");
const deleteContract = require("../controllers/Contracts/deleteContracts");
const getBusiness = require("../controllers/RecursosHumanos/Business/getBusiness");
const deleteBusiness = require("../controllers/RecursosHumanos/Business/deleteBusiness");
const updateBusinessPartial = require("../controllers/RecursosHumanos/Business/updateBusiness");
const createBusiness = require("../controllers/RecursosHumanos/Business/postBusiness");
const postPlantillasDeContrato = require("../controllers/RecursosHumanos/PlantillasDeContrato/postPlantillasDeContrato");
const getAllPlantillasDeContrato = require("../controllers/RecursosHumanos/PlantillasDeContrato/getAllPlantillasDeContrato");
const deletePlantillaContrato = require("../controllers/RecursosHumanos/PlantillasDeContrato/deletePlantillaContrato");
const putPlantillaDeContrato = require("../controllers/RecursosHumanos/PlantillasDeContrato/putPlantillaDeContrato");
const getAllAsistenciaColaborador = require("../controllers/RecursosHumanos/Asistencia/colaborador/getAsistenciaColaborador");
const postAsistenciaColaborador = require("../controllers/RecursosHumanos/Asistencia/colaborador/postAsistenciaColaborador");
const deleteAsistenciaColaborador = require("../controllers/RecursosHumanos/Asistencia/colaborador/deleteAsistenciaColaborador");
const getBoletaDePagos = require("../controllers/RecursosHumanos/BoletaDePagos/getBoletaDePagos");
const postBoletaDePagos = require("../controllers/RecursosHumanos/BoletaDePagos/postBoletaDePagos");
const postDatosContables = require("../controllers/RecursosHumanos/BoletaDePagos/postDatosContables");
const getDatosContables = require("../controllers/RecursosHumanos/BoletaDePagos/getDatosContables");
const patchBoleDePago = require("../controllers/RecursosHumanos/BoletaDePagos/patchBoletaDePago");
const enviarBoleta = require("../controllers/RecursosHumanos/BoletaDePagos/enviarBoleta");
const recepcionBoleta = require("../controllers/RecursosHumanos/BoletaDePagos/recibirBoleta");
const returnPdf = require("../controllers/RecursosHumanos/Asistencia/colaborador/returnPdf");
const updateAsistenciaColaborador = require("../controllers/RecursosHumanos/Asistencia/colaborador/updateAsistenciaColaborador");
const deleteBoletaDePago = require("../controllers/RecursosHumanos/BoletaDePagos/deleteBoletaDePago");
const subirBoletas = require("../controllers/RecursosHumanos/BoletaDePagos/subirBoletas");
const upload = require("../utils/multer");

const router = Router();

router.post("/registerEmployee", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/postPermissions", postPermissions);
router.post("/createModule", createModule);
router.post("/createSubModule", createSubmodule);
router.post("/createBusiness", createBusiness);
router.post("/createClient", createClient);
router.post("/createCotizacion", createCotizacion);
router.post("/createContract", postContracts);
router.post("/postPlantillasDeContrato", postPlantillasDeContrato);
router.post("/postAsistenciaColaborador", postAsistenciaColaborador);
router.post("/postBoletaDePagos", postBoletaDePagos);
router.post("/postDatosContables", postDatosContables);
router.post("/enviarBoletasDePago", enviarBoleta);
router.post("/boletajson", subirBoletas);
router.post("/returnPdf", returnPdf);

router.patch("/patchBusiness", updateBusinessPartial);
router.patch("/patchCotizacion", updateCotizacionPartial);
router.patch("/patchEmployee", updateEmployeePartial);
router.patch("/patchClient", updateClient);
router.patch("/patchContract", putContracts);
router.patch("/patchPlantillaDeContrato", putPlantillaDeContrato);
router.patch("/patchAsistenciaColaborador", updateAsistenciaColaborador);
router.patch("/patchBoletaDePago", patchBoleDePago);

router.delete("/deleteBoletaDePago", deleteBoletaDePago);
router.delete("/deleteContract", deleteContract);
router.delete("/deleteClient", deleteClient);
router.delete("/deleteCotizacion", deleteCotizacion);
router.delete("/deleteBusiness", deleteBusiness);
router.delete("/deletePlantillaContrato", deletePlantillaContrato);
router.delete("/deleteAsistenciaColaborador", deleteAsistenciaColaborador);

router.get("/recepcionBoleta", recepcionBoleta);
router.get("/getDatosContables", getDatosContables);
router.get("/getBoletaDePagos", getBoletaDePagos);
router.get("/getAllAsistenciaColaborador", getAllAsistenciaColaborador);
router.get("/getPlantillasDeContrato", getAllPlantillasDeContrato);
router.get("/allContracts", allContracts);
router.get("/getCotizaciones", getCotizaciones);
router.get("/getClients", getClients);
router.get("/getBusiness", getBusiness);
router.get("/getModules", getModules);
router.get("/getSubModules", getSubModules);
router.get("/getPermissions", getPermissions);
router.get("/auth/verify", verifyToken);
router.get("/employee", getEmployee);
router.get("/ruc", consulApi);

module.exports = router;
