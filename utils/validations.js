const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().min(3).max(30).email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});
const validateLoginMiddleware = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400, error.details));
  }
  next();
};

module.exports = {
  validateLoginMiddleware,
};
