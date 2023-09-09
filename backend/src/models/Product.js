const { DataTypes } = require("sequelize");
const db = require("../app/db");
//

const User = require("./User");

//

const Product = db.define(
  "products",
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    name: DataTypes.CHAR(100),
    price: DataTypes.BIGINT,
  },
  { freezeTableName: true }
);

//
User.hasMany(Product, { as: "products", foreignKey: "userId" });
Product.belongsTo(User, { as: "user", foreignKey: "userId" });
//

module.exports = Product;
