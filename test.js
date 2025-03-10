const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "switchback.proxy.rlwy.net",
  user: "root",
  password: "ILNbCusGBoAFuXHsZTMyNMfwJGpzHlhr",
  database: "railway",
  port: 3306,
  ssl: { rejectUnauthorized: false }
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to database successfully!");
  }
  connection.end();
});
