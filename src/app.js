const server = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes/index");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const app = server();
const allowedOrigins = [
  procces.env.FRONTEND_URL ,
  "http://localhost:5173", // 🌐 Frontend Webr
];

app.use(fileUpload());
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    // 🌐 Permite el Frontend Web con credenciales
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
  } else {
    // 📱 Permite cualquier otro origen (Móvil) SIN credenciales
    res.header("Access-Control-Allow-Origin", "*");
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Manejar preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(cookieParser());
app.use(server.json());
app.use("/api", routes);

module.exports = app;
