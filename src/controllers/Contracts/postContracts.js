const Contract = require("../../models/Contracts");

const postContracts = async (req, res) => {
  const {
    typeContract,
    dateStart,
    dateEnd,
    empresa,
    colaborator,
    marcaAsistencia,
    codigoSPP,
    regimenPension,
  } = req.body;
  try {
    if (
      !typeContract ||
      !dateStart ||
      !dateEnd ||
      !empresa ||
      !empresa.ruc ||
      !empresa.razonSocial ||
      !empresa.domicilioFiscal ||
      !empresa.representative ||
      !empresa.representativeDocumentType ||
      !empresa.representativeDocumentNumber ||
      !colaborator ||
      !colaborator.name ||
      !colaborator.documentType ||
      !colaborator.documentNumber ||
      !colaborator.email ||
      !colaborator.sueldo ||
      !colaborator.charge ||
      !colaborator.address
    ) {
      return res.status(400).json({ message: "Faltan Datos" });
    }
    let newContract;
    if (typeContract && typeContract !== "CONTRATO LOCACION DE SERVICIOS") {
      if (!marcaAsistencia || !codigoSPP || !regimenPension) {
        return res.status(400).json({ message: "Faltan Datos" });
      } else {
        newContract = new Contract({
          typeContract,
          dateStart,
          dateEnd,
          empresa,
          colaborator,
        });
      }
    } else {
      newContract = new Contract({
        typeContract,
        dateStart,
        dateEnd,
        empresa,
        colaborator,
        marcaAsistencia,
        codigoSPP,
        regimenPension,
      });
    }

    const savedContract = await newContract.save();
    res.status(201).json({ message: "Contrato Creado", savedContract });
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: error.message });
  }
};

module.exports = postContracts;
