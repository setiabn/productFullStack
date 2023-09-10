const { reqWrapper, filterAttrs } = require("../../app/utils");
//
const validate = require("../../validation/validate");
const userValidation = require("../../validation/user");
//
const User = require("../../models/User");
const { uuid2id } = require("../../models/utils");
//
const { ResponseError } = require("../../app/errors");

// =====================================================================================

const USER_ATTRS = ["uuid", "name", "username", "role"];

// ======================================= create =========================================
exports.create = reqWrapper(async (req, res, next) => {
  const user = validate(userValidation.create, req.body);

  // if not admin, reject
  if (req.user.role !== "admin") {
    throw new ResponseError(403, "access forbidden");
  }

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
  // if not admin, reject
  if (req.user.role !== "admin") {
    throw new ResponseError(403, "access forbidden");
  }

  const data = await User.findAll({ attributes: USER_ATTRS, raw: true });
  return res.status(200).json({ data });
});

// ==================================== get ===========================================
exports.get = reqWrapper(async (req, res, next) => {
  const { uuid } = validate(userValidation.uuid, req.params);

  const result = await User.findOne({
    where: { uuid },
    attributes: USER_ATTRS,
    raw: true,
  });
  if (!result) throw new ResponseError(404, "user id not found");

  // if not admin, make sure its the user him/her self
  if (req.user.role !== "admin") {
    const userId = await uuid2id(uuid);
    const isOwner = result.userId === userId;
    if (!isOwner) throw new ResponseError(403, "access forbidden");
  }

  return res.status(200).json({ data: result });
});

// ===================================== update ===========================================
exports.update = reqWrapper(async (req, res, next) => {
  const { uuid } = validate(userValidation.uuid, req.params);

  const user = validate(userValidation.update, req.body);

  const target = await User.findOne({ where: { uuid } });
  if (!target) throw new ResponseError(404, "user id not found");

  // if not admin, make sure its the user him/her self
  if (req.user.role !== "admin") {
    const userId = await uuid2id(uuid);
    const isOwner = target.userId === userId;
    if (!isOwner) throw new ResponseError(403, "access forbidden");
  }

  const result = await target.update(user);

  const data = filterAttrs(USER_ATTRS, result);
  return res.status(200).json({ data });
});

// =================================== delete ===============================================
exports.delete = reqWrapper(async (req, res, next) => {
  const { uuid } = validate(userValidation.uuid, req.params);

  const target = await User.findOne({
    where: { uuid },
  });
  if (!target) throw new ResponseError(404, "user id not found");

  // if not admin, make sure its the user him/her self
  if (req.user.role !== "admin") {
    const userId = await uuid2id(uuid);
    const isOwner = target.userId === userId;
    if (!isOwner) throw new ResponseError(403, "access forbidden");
  }

  // make sure admin always minimal 1
  // FIXME: what if user delete itself? force logout, or ??
  const adminCount = await User.count({ where: { role: "admin" } });
  if (adminCount <= 1 && target.role === "admin")
    throw new Error(403, "can't delete admin");

  await target.destroy();

  return res.status(200).json({ data: "ok" });
});
