const server = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes/index");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const app = server();

app.use(fileUpload());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(server.json());
app.use("/api", routes);

module.exports = app;
