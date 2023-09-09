const brcypt = require("bcrypt");

const { reqWrapper, filterAttrs } = require("../../app/utils");
const validate = require("../../validation/validate");
const authValidation = require("../../validation/auth");
const User = require("../../models/User");
const { ResponseError } = require("../../app/errors");

// ===========================================================================

const USER_ATTRS = ["uuid", "name", "username", "role"];

exports.login = reqWrapper(async (req, res, next) => {
  if (req.session?.user)
    return res.status(200).json({ data: req.session.user });

  const { username, password } = validate(authValidation.login, req.body);

  const user = await User.findOne({ where: { username }, raw: true });
  if (!user) throw new ResponseError(404, "username not found"); //   FIXME: fix error message

  const matchedPassword = brcypt.compareSync(password, user.password);
  if (!matchedPassword)
    throw new ResponseError(400, "wrong username or password");

  const data = filterAttrs(USER_ATTRS, user);
  req.session.user = data;

  return res.status(200).json({ data });
});

exports.getMe = reqWrapper(async (req, res, next) => {
  const data = req.session?.user;
  if (!data)
    return res.status(401).json({ errors: "please login to your account" });

  return res.status(200).json({ data });
});

exports.logout = reqWrapper(async (req, res, next) => {
  req.session.destroy();
  return res.status(200).json({ data: "ok" });
});
