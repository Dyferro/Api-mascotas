//Imports
const mongoose = require("mongoose");
const express = require("express");
const bodyparser = require("body-parser");
const controllers = require("../controllers/user");

require("./config");

//Initializations
const app = express();

//
app.use(bodyparser.json());

app.use(controllers);

//Middlewares
app.use((req, res, next) => {
  const err = Error("Not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.code || 400);
  res.json({ ok: false, err: err.message });
});

//Database Conexion
mongoose
  .connect(process.env.URL_DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((db) => console.log("Conectado a Base de Datos"))
  .catch((err) => console.log(err));

//Exports
module.exports = app;
