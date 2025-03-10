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
    const { username, password } = req.body;
    await db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
    res.status(201).json({ message: "Account created" });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const { username, password } = req.body;
    const [result] = await db.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, req.params.id]);
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
