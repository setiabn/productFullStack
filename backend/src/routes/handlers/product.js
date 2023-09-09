const { reqWrapper, filterAttrs } = require("../../app/utils");
const validate = require("../../validation/validate");
const productValidation = require("../../validation/product");
const Product = require("../../models/Product");
const { ResponseError } = require("../../app/errors");
const User = require("../../models/User");

// =====================================================================================
const PRODUCT_ATTRS = ["uuid", "name", "price"];
const USER_ATTRS = ["uuid", "name", "username", "role"];

// ======================================= create =========================================
exports.create = reqWrapper(async (req, res, next) => {
  const product = validate(productValidation.create, req.body);
  const userUUID = req.user.uuid;

  // convert user UUID to id
  const user = await User.findOne({
    where: { uuid: userUUID },
    attributes: ["id"],
    raw: true,
  });
  product.userId = user.id;

  const result = await Product.create(product, {
    include: [{ model: User, as: "user", attributes: USER_ATTRS }],
  });
  // FIXME: bug, return value not include "user"
  const data = filterAttrs([...PRODUCT_ATTRS, "user"], result);

  return res.status(200).json({ data });
});

// ===================================== getAll =============================================
exports.getAll = reqWrapper(async (req, res, next) => {
  // filter if not admin
  let filter = {};
  if (req.user.role != "admin") {
    // convert user UUID to id
    const user = await User.findOne({
      where: { uuid: userUUID },
      attributes: ["id"],
      raw: true,
    });
    filter = { where: { userId: id } };
  }

  const data = await Product.findAll({
    where: filter,
    attributes: PRODUCT_ATTRS,
    include: [{ as: "user", model: User, attributes: USER_ATTRS }],
  });
  return res.status(200).json({ data });
});

// ==================================== get ===========================================
exports.get = reqWrapper(async (req, res, next) => {
  const { id } = validate(productValidation.id, req.params);

  const result = await Product.findOne({
    where: { uuid: id },
    attributes: PRODUCT_ATTRS,
    raw: true,
  });
  if (!result) throw new ResponseError(404, "product id not found");

  return res.status(200).json({ data: result });
});

// ===================================== update ===========================================
exports.update = reqWrapper(async (req, res, next) => {
  const { id } = validate(productValidation.id, req.params);
  const product = validate(productValidation.update, req.body);

  const target = await Product.findOne({
    where: { uuid: id },
  });
  if (!target) throw new ResponseError(404, "product id not found");

  const result = await target.update(product);

  const data = filterAttrs(PRODUCT_ATTRS, result);
  return res.status(200).json({ data });
});

// =================================== delete ===============================================
exports.delete = reqWrapper(async (req, res, next) => {
  const { id } = validate(productValidation.id, req.params);

  const target = await Product.findOne({
    where: { uuid: id },
  });
  if (!target) throw new ResponseError(404, "product id not found");
  await target.destroy();

  return res.status(200).json({ data: "ok" });
});
