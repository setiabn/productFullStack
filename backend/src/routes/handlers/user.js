const { reqWrapper, filterAttrs } = require("../../app/utils");
const validate = require("../../validation/validate");
const userValidation = require("../../validation/user");
const User = require("../../models/User");
const { ResponseError } = require("../../app/errors");

// =====================================================================================

const USER_ATTRS = ["uuid", "name", "username", "role"];

// ======================================= create =========================================
exports.create = reqWrapper(async (req, res, next) => {
  const user = validate(userValidation.create, req.body);

  const prev = await User.findOne({
    where: { username: user.username },
    attributes: ["username"],
    raw: true,
  });
  if (prev) throw new ResponseError(409, "username already exist");

  const result = await User.create(user, { raw: true });

  const data = filterAttrs(USER_ATTRS, result);
  return res.status(200).json({ data });
});

// ===================================== getAll =============================================
exports.getAll = reqWrapper(async (req, res, next) => {
  const data = await User.findAll({ attributes: USER_ATTRS, raw: true });
  return res.status(200).json({ data });
});

// ==================================== get ===========================================
exports.get = reqWrapper(async (req, res, next) => {
  const { id } = validate(userValidation.id, req.params);

  const result = await User.findOne({
    where: { uuid: id },
    attributes: USER_ATTRS,
    raw: true,
  });
  if (!result) throw new ResponseError(404, "user id not found");

  return res.status(200).json({ data: result });
});

// ===================================== update ===========================================
exports.update = reqWrapper(async (req, res, next) => {
  const { id } = validate(userValidation.id, req.params);
  const user = validate(userValidation.update, req.body);

  const target = await User.findOne({
    where: { uuid: id },
  });
  if (!target) throw new ResponseError(404, "user id not found");

  const result = await target.update(user);

  const data = filterAttrs(USER_ATTRS, result);
  return res.status(200).json({ data });
});

// =================================== delete ===============================================
exports.delete = reqWrapper(async (req, res, next) => {
  const { id } = validate(userValidation.id, req.params);

  const target = await User.findOne({
    where: { uuid: id },
  });
  if (!target) throw new ResponseError(404, "user id not found");
  await target.destroy();

  return res.status(200).json({ data: "ok" });
});
