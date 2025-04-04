const dayjs = require("dayjs");
const BoletaDePagos = require("../../../../models/RecursosHumanos/BoletaDePago");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

dayjs.extend(utc);
dayjs.extend(timezone);

const recepcionBoleta = async (req, res) => {
  const { boletaId } = req.query;

  if (boletaId) {
    const fechaRecepcion = new Date();
    const fechaRecepcionFormatted = dayjs(fechaRecepcion)
      .tz("America/Lima")
      .format("DD/MM/YYYY hh:mm A");
    await BoletaDePagos.findByIdAndUpdate(boletaId, {
      recepcion: fechaRecepcionFormatted,
    });
  }

  // Responde con una imagen vacía (1x1 pixel transparente)
  const pixel = Buffer.from(
    "R0lGODlhAQABAAAAACwAAAAAAQABAAA=", // Base64 de una imagen 1x1
    "base64"
  );
  res.writeHead(200, {
    "Content-Type": "image/gif",
    "Content-Length": pixel.length,
  });
  res.end(pixel);
};

module.exports = recepcionBoleta;
