const db = require("../models/db");

exports.getAccounts = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

exports.getAccountById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Account not found" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

exports.createAccount = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);
    res.status(201).json({ message: "Account created" });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const [result] = await db.query(
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
      [name, email, password, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Account not found" });
    res.json({ message: "Account updated" });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Account not found" });
    res.json({ message: "Account deleted" });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

exports.loginAccount = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password]);
    if (rows.length === 0) return res.status(401).json({ error: "Sai tài khoản hoặc mật khẩu" });
    res.json({ message: "Đăng nhập thành công" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
};
