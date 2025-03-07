const mysql = require("mysql2");
const config = require("./config/config");

const pool = mysql.createPool({ ...config.db });

pool.query("SELECT 1", (err, results) => {
  if (err) console.error("Lỗi kết nối DB:", err);
  else console.log("Kết nối MySQL thành công!");
  process.exit();
});
