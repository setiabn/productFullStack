const ResponseError = require("./errors");

/** ==========================================================
 * @param {(req:import('express').Request, res: import("express").Response, next: import("express").NextFunction) => PromiseLike<any>} func
 * @returns
 */
const reqWrapper = (func) => {
  return async (req, res, next) => {
    func(req, res, next).catch(next);
  };
};

/** =========================================================
 * @param {string[]} attrs
 * @param {*} data
 */
const filterAttrs = (attrs, data) => {
  const result = {};
  attrs.forEach((attr) => {
    result[attr] = data[attr];
  });
  return result;
};

// ==========================================================
module.exports = { reqWrapper, filterAttrs };
