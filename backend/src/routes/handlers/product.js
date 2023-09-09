const { reqWrapper, filterAttrs } = require("../../app/utils");
const validate = require("../../validation/validate");
const productValidation = require("../../validation/product");
const Product = require("../../models/Product");
const { ResponseError } = require("../../app/errors");

// =====================================================================================

// ======================================= create =========================================
exports.create = reqWrapper(async (req, res, next) => {
  const product = validate(productValidation.create, req.body);

  const prev = await Product.findOne({
    where: { productname: product.productname },
    attributes: ["productname"],
    raw: true,
  });
  if (prev) throw new ResponseError(409, "productname already exist");

  const result = await Product.create(product, { raw: true });

  const data = result;
  return res.status(200).json({ data });
});

// ===================================== getAll =============================================
exports.getAll = reqWrapper(async (req, res, next) => {
  const data = await Product.findAll({ attributes: PRODUCT_ATTRS, raw: true });
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
