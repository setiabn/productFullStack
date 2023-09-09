const Joi = require("joi");

const USER_ROLE = ["admin", "user"];

exports.login = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  password: Joi.string().min(6).required(),
});
