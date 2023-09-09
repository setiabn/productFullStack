const { ResponseError } = require("../app/errors");

const authenticated = (req, res, next) => {
  const data = req.session?.user;
  if (!data) throw new ResponseError(401, "please login to your account");

  req.user = data;
  next();
};

module.exports = authenticated;
