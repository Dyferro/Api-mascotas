//Imports
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

//Database Conexion
if (process.env.NODE_ENV === "test") {
  const mongoServer = new MongoMemoryServer();
  exports.dbConnect = async () => {
    const uri = await mongoServer.getUri();

    const mongooseOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(uri, mongooseOpts);
  };

  exports.dbDisconnect = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  };
} else {
  mongoose
    .connect(process.env.URL_DATABASE, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((db) => console.log("Conectado a Base de Datos"))
    .catch((err) => console.log(err));
}
