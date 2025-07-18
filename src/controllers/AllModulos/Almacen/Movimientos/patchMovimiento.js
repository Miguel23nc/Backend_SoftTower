const patchMovimiento= async (req, res) => {
    const {
        _id,
        movimiento,
        codigoIngreso,
        codigoSalida,
        contratoId,
        numeroDeActa,
        contribuyente,
        numeroDocumento,
        datosGenerales,
        descripcionBienes,
        detallesDePeso,
        referenciaImagen,
        observaciones,
        horaSalida,
        fechaSalida,
        creadoPor,
        actuadoPor,
        estadoActa,
    } = req.body;
}

module.exports = patchMovimiento;