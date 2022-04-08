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

app.get("/userslist", async (req, res) => {
  const data = await User.show().catch((err) => {
    res.status(404).json({ ok: false, err });
  });
  res.status(200).json({ ok: true, user: data });
});

app.get("/user/:_id", async (req, res) => {
  const data = await User.getUser(req.params._id).catch((err) => {
    res.status(404).json({ ok: false, err });
  });
  res.status(200).json({ ok: true, user: data });
});

app.put("/modifyuser/:_id", async (req, res) => {
  const data = await User.updateUserById(req.params._id, req.body).catch(
    (err) => {
      res.status(404).json({ ok: false, err });
    }
  );
  res.status(201).json({ ok: true, data });
});

app.delete("/deleteuser/:_id", async (req, res) => {
  const data = await User.deleteUserById(req.params._id).catch((err) => {
    res.status(400).json({ ok: false, err });
  });
  res.status(200).json({ ok: true, data });
});

module.exports = app;
