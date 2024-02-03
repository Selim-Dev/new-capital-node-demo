const AppError = require("../utils/AppError");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  /* email, password */
  const { email, password } = req.body;
  //1) get user by email {email:'ali@ali.com',password: '43432494mcsafokhjo34'}
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new AppError("invalid credentials", 400));
  //2) compare the password provided by the user to the hashed password stored in the database
  const isMatchPassword = await bcrypt.compare(password, user.password);
  if (!isMatchPassword) return next(new AppError("invalid credentials", 400));
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  console.log("🚀 ~ login ~ token:", token);
  //3) return user
  user.password = undefined;
  res.send({
    status: "success",
    user,
    token,
  });
};

const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("email and password are required", 400));
  const hashedPassword = await bcrypt.hash(password, 10);
  const userCreated = await User.create({ email, password: hashedPassword });
  userCreated.password = undefined;
  res.status(201).send(userCreated);
  // insert in database
};

module.exports = {
  registerUser,
  login,
};
