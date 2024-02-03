const express = require("express");
const path = require("path");
const fs = require("fs");
const Joi = require("joi");
const User = require("../models/User");
const {
  registerUser,
  login,
} = require("../controllers/authenticationController");
const AppError = require("../utils/AppError");
const { validateLoginMiddleware } = require("../utils/validations");
const router = express.Router();
/** Users */

// Registration
router.post("/", registerUser);
// login

router.post("/login", validateLoginMiddleware, login);

router.get("/", async (req, res, next) => {
  const users = await User.find();
  res.send(users);
});
router.patch("/:id", async (req, res) => {
  res.send([]);
  // insert in database
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  res.send({ status: "success", user });
  // insert in database
});
router.delete("/:id", (req, res) => {
  res.send({});
  // insert in database
});

module.exports = router;
