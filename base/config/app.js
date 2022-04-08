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
