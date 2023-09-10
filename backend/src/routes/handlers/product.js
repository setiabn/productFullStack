const { reqWrapper, filterAttrs } = require("../../app/utils");
//
const validate = require("../../validation/validate");
const productValidation = require("../../validation/product");
//
const Product = require("../../models/Product");
const User = require("../../models/User");
const { uuid2id } = require("../../models/utils");
//
const { ResponseError } = require("../../app/errors");

// =====================================================================================
const PRODUCT_ATTRS = ["uuid", "name", "price"];
const USER_ATTRS = ["uuid", "name", "username", "role"];

// ======================================= create =========================================
exports.create = reqWrapper(async (req, res, next) => {
  const product = validate(productValidation.create, req.body);
  const userUUID = req.user.uuid;

  // convert user UUID to id
  const userId = await uuid2id(userUUID);
  if (!userId)
    throw new ResponseError(
      403,
      "wrong access token, try login to your account again"
    );

  product.userId = userId;

  const result = await Product.create(product, { raw: true });
  const data = filterAttrs([...PRODUCT_ATTRS], result);
  data.user = req.user;

  return res.status(200).json({ data });
});

// ===================================== getAll =============================================
exports.getAll = reqWrapper(async (req, res, next) => {
  let data = [];

  // if not admin, only return product owned by user
  if (req.user.role != "admin") {
    const uuid = req.user.uuid;
    const user = await User.findOne({
      where: { uuid },
      include: { model: Product, attributes: PRODUCT_ATTRS },
    });

    user.toJSON().products.forEach((d) => {
      d.user = req.user;
      data.push(d);
    });

    // else, return all product
  } else {
    data = await Product.findAll({
      attributes: PRODUCT_ATTRS,
      include: [{ as: "user", model: User, attributes: USER_ATTRS }],
    });
  }

  return res.status(200).json({ data });
});

// ==================================== get ===========================================
exports.get = reqWrapper(async (req, res, next) => {
  const { uuid } = validate(productValidation.uuid, req.params);

  const result = await Product.findOne({
    where: { uuid },
    attributes: PRODUCT_ATTRS,
    include: { model: User, as: "user", attributes: USER_ATTRS },
  });
  if (!result) throw new ResponseError(404, "product id not found");

  return res.status(200).json({ data: result });
});

// ===================================== update ===========================================
exports.update = reqWrapper(async (req, res, next) => {
  const { uuid } = validate(productValidation.uuid, req.params);
  const product = validate(productValidation.update, req.body);

  // find the product
  const target = await Product.findOne({
    where: { uuid },
    include: { model: User, as: "user", attributes: USER_ATTRS },
  });
  if (!target) throw new ResponseError(404, "product id not found");

  // if not admin, make sure its the product owner
  if (req.user.role !== "admin") {
    const userId = await uuid2id(req.user.uuid);
    const isOwner = target.userId === userId;
    if (!isOwner) throw new ResponseError(403, "access forbidden");
  }

  const result = await target.update(product);

  const data = filterAttrs(PRODUCT_ATTRS, result);
  data.user = result.user;
  return res.status(200).json({ data });
});

// =================================== delete ===============================================
exports.delete = reqWrapper(async (req, res, next) => {
  const { uuid } = validate(productValidation.uuid, req.params);

  const target = await Product.findOne({
    where: { uuid },
  });
  if (!target) throw new ResponseError(404, "product id not found");

  // if not admin, make sure its the product owner
  if (req.user.role !== "admin") {
    const userId = await uuid2id(req.user.uuid);
    const isOwner = target.userId === userId;
    if (!isOwner) throw new ResponseError(403, "access forbidden");
  }

  await target.destroy();

  return res.status(200).json({ data: "ok" });
});
