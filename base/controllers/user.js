//Imports
const express = require("express");
const User = require("../models/user");
const asyncHandler = require("../utils/asyncHandler");

const app = express();

app.post(
  '/create',
  asyncHandler(async (req, res) => {
    const data = await User.create(req.body);
    res.status(201).json({
      ok: true,
      data
    });
  })
);

app.get(
  "/userslist",
  asyncHandler(async (req, res) => {
    const data = await User.show();
    res.status(200).json({
      ok: true,
      data
    });
  })
);

app.get(
  "/user/:_id",
  asyncHandler(async (req, res, next) => {
    const data = await User.getUser(req.params._id);
    res.status(200).json({
      ok: true,
      data
    });
  })
);

app.put(
  "/modifyuser/:_id",
  asyncHandler(async (req, res) => {
    const data = await User.updateUserById(req.params._id, req.body);
    res.status(201).json({
      ok: true,
      data
    });
  })
);

app.delete(
  "/deleteuser/:_id",
  asyncHandler(async (req, res) => {
    const user = await User.deleteUserById(req.params._id);
    res.status(200).json({
      ok: true,
      user
    });
  })
);

app.post('/login', asyncHandler(async (req, res) => {
  const user = await User.loginUser(req.body);
  res.status(200).json({
    ok: true,
    user
  });
}))

module.exports = app;