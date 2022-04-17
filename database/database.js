const mongoose = require("mongoose");
require("../base/config/config");
const Mockgoose = require("mockgoose");

//Database Conexion
if (process.env.NODE_ENV === "test") {
  const mockgoose = new Mockgoose(mongoose);
  mockgoose.prepareStorage().then(() => {
    mongoose
      .connect(process.env.URL_DATABASE, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then((db) => console.log("Conectado a Base de Datos"))
      .catch((err) => console.log(err));
  });
} else {
  mongoose
    .connect(process.env.URL_DATABASE, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((db) => console.log("Conectado a Base de Datos"))
    .catch((err) => console.log(err));
}
