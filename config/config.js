require("dotenv").config();

module.exports = {
  db: {
    host: process.env.DB_HOST || "switchback.proxy.rlwy.net",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "ILNbCusGBoAFuXHsZTMyNMfwJGpzHlhr",
    database: process.env.DB_NAME || "railway",
    port: process.env.DB_PORT || 50118,
  },
};
