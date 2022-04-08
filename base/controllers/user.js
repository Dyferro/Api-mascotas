//Imports
const express = require("express");
const User = require("../models/user");

const app = express();

app.post("/create", async (req, res) => {
  const data = await User.create(req.body).catch((err) => {
    res.status(400).json({ ok: false, err });
  });
  res.status(201).json({ ok: true, data });
});

module.exports = app;
