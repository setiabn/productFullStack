const Joi = require("joi");

const USER_ROLE = ["admin", "user"];

exports.create = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  username: Joi.string().min(3).max(20).required(),
  password: Joi.string().min(6).required(),
  role: Joi.valid(...USER_ROLE).required(),
});

exports.update = Joi.object({
  name: Joi.string().min(3).max(100),
  username: Joi.string().min(3).max(20),
  password: Joi.string().min(6),
  role: Joi.valid(...USER_ROLE),
}).min(1);

exports.id = Joi.object({
  id: Joi.string().uuid().required(),
});
