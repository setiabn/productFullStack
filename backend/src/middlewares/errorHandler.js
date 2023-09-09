const { ResponseError } = require("../app/errors");

/**
 *
 * @param {Error} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns
 */
const errorHandler = (err, req, res, next) => {
  //
  if (err instanceof ResponseError)
    return res.status(err.statusCode).json({ errors: err.message });
  //
  if (err instanceof SyntaxError)
    return res.status(400).json({ errors: err.message });

  //
  return res.sendStatus(500);
};

module.exports = errorHandler;
