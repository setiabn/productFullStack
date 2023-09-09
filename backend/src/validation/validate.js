const { ResponseError } = require("../app/errors");

/** ==========================================================
 * @param {import('joi').ObjectSchema} schema
 * @param {*} data
 */
const validate = (schema, data) => {
  const { error, value } = schema.validate(data, { abortEarly: false });
  if (error) throw new ResponseError(400, error.message);
  return value;
};

module.exports = validate;
