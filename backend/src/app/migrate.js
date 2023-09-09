const { store } = require("../middlewares/session");
const Product = require("../models/Product");
const User = require("../models/User");

(async () => {
  store.sync();
  await User.sync();
  await Product.sync();

  const userCount = await User.count();
  if (userCount <= 0) {
    await User.create({
      name: "Admin",
      username: "admin",
      password: "password",
      role: "admin",
    });
  }
})();
