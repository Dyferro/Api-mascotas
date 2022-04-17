//Imports
const express = require("express");
const bodyparser = require("body-parser");
const controllers = require("../controllers/user");

require("./config");
require("../../database/database");

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

console.log(process.env.NODE_ENV);

//Exports
module.exports = app;
