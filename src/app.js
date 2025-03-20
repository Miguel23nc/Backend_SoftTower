const server = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes/index");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const app = server();
const dotenv = require("dotenv");
const verifyToken = require("./controllers/auth/midellware");
dotenv.config();
const { FRONTEND_URL } = process.env;
const allowedOrigins = [FRONTEND_URL?.toString(), "http://localhost:5173"];

app.use(fileUpload());
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }

    return next();
  }

  return verifyToken(req, res, next);
});

app.use(cookieParser());
app.use(server.json());
app.use("/api", routes);

module.exports = app;
