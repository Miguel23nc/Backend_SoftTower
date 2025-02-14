const nodemailer = require("nodemailer");
const { EMAIL_PASS, EMAIL_USER } = process.env;
const mailtrap = async (pdfBuffer, nameDoc) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "'PruebasLocales' <sistemas.tower@gmail.com>",
      to: "sistemas.tower@gmail.com", // Pporque en euedes usar cualquier correo ficticio
      subject: "PDF de Prueba",
      text: "Este es un PDF enviado en modo local.",
      attachments: [
        {
          filename: `${nameDoc}.pdf`,
          content: pdfBuffer, // Adjunta el buffer
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Correo enviado:", info.messageId);
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw new Error("Error al enviar el correo.");
  }
};

module.exports = mailtrap;
