const { Sequelize } = require("sequelize");
const config = require("./config");

// ==========================================================================

const db = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASS, {
  dialect: "mysql",
});

module.exports = db;
