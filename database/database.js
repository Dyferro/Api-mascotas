const mongoose = require("mongoose");

//Database Conexion
mongoose
  .connect(process.env.URL_DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((db) => console.log("Conectado a Base de Datos"))
  .catch((err) => console.log(err));