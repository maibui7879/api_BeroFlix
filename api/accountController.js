const db = require("../models/db");
const bcrypt = require("bcrypt");

exports.getAccounts = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, name, email, age FROM users");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

exports.getAccountById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, name, email, age FROM users WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Account not found" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

exports.createAccount = async (req, res) => {
  try {
    const { name, email, age, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (name, email, age, password) VALUES (?, ?, ?, ?)", [name, email, age, hashedPassword]);
    res.status(201).json({ message: "Account created" });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const [result] = await db.query("UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?", [name, email, age, req.params.id]);
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
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) return res.status(401).json({ error: "Sai tài khoản hoặc mật khẩu" });

    const validPassword = await bcrypt.compare(password, rows[0].password);
    if (!validPassword) return res.status(401).json({ error: "Sai tài khoản hoặc mật khẩu" });

    res.json({ message: "Đăng nhập thành công" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
};
