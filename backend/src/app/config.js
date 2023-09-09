require("dotenv").config();

// ==========================================================================
const config = {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_TIME: Number(process.env.SESSION_TIME) * (1000 * 60),
  NODE_ENV: process.env.NODE_ENV.toUpperCase(),
};

module.exports = config;
