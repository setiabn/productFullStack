const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const db = require("../app/db");
//

const User = db.define(
  "users",
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    name: DataTypes.CHAR(100),
    username: { type: DataTypes.CHAR(20), unique: true },
    password: DataTypes.CHAR(100),
    role: DataTypes.CHAR(10),
  },
  { freezeTableName: true }
);

User.beforeCreate((user) => {
  user.password = bcrypt.hashSync(user.password, 10);
});

module.exports = User;
