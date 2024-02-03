const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
/** Todoos */
router.get("/", (req, res) => {
  res.send([{}]);
  // insert in database
});
const verifyUser = async (req, res, next) => {
  //1) get token from header
  const token = req.headers.authorization;
  if (!token) return next(new AppError("please provide a token", 403)); // unauthorized
  //2) verify token (by the jwt package) return payload {id:234}
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  console.log(payload);
  //3) get user form database
  const user = await User.findById(payload.id);
  if (!user) return next(new AppError("invalid token", 403)); // unauthorized
  // 4) attach the user to request req.user
  req.user = user;
  next();
};
router.post("/", verifyUser, (req, res) => {
  console.log(req.user);
  const { title } = req.body;
  const todoCreated = new Todo({ title, user: req.user._id });
  res.send({ status: "user created", todo: todoCreated });
  // insert in database
});

router.patch("/:id", (req, res) => {
  res.send({});
  // insert in database
});
router.get("/:id", (req, res) => {
  res.send({});
  // insert in database
});
router.delete("/todos/:id", (req, res) => {
  res.send({});
  // insert in database
});

module.exports = router;
