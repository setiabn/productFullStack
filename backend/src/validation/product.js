const Joi = require("joi");

exports.create = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().integer().min(1).max(1_000_000_000).required(),
});

exports.update = Joi.object({
  name: Joi.string().min(3).max(100),
  price: Joi.number().integer().min(1).max(1_000_000_000),
}).min(1);

exports.id = Joi.object({
  id: Joi.string().uuid().required(),
});
