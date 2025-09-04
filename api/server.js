// server.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// // ✅ Connect to MySQL
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "toor", 
//   database: "cms_db",
// });

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL Database!");
});

// =============================
// CRUD Routes for Products
// =============================

// CREATE product
app.post("/products", (req, res) => {
  const { product_name, product_desc, status, created_by } = req.body;

  const query = `
    INSERT INTO Products (product_name, product_desc, status, created_by)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [product_name, product_desc, status || "Draft", created_by], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "✅ Product created successfully", product_id: result.insertId });
  });
});

// READ all products (excluding deleted ones)
app.get("/products", (req, res) => {
  const query = "SELECT * FROM Products WHERE is_deleted = FALSE";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// READ single product by ID
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM Products WHERE product_id = ? AND is_deleted = FALSE";
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: "❌ Product not found" });
    res.json(results[0]);
  });
});

// UPDATE product
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { product_name, product_desc, status, updated_by } = req.body;

  const query = `
    UPDATE Products
    SET product_name = ?, product_desc = ?, status = ?, updated_by = ?
    WHERE product_id = ? AND is_deleted = FALSE
  `;

  db.query(query, [product_name, product_desc, status, updated_by, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "❌ Product not found" });
    res.json({ message: "✅ Product updated successfully" });
  });
});

// SOFT DELETE product
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const { updated_by } = req.body;

  const query = `
    UPDATE Products
    SET is_deleted = TRUE, updated_by = ?
    WHERE product_id = ?
  `;

  db.query(query, [updated_by, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "❌ Product not found" });
    res.json({ message: "🗑️ Product soft-deleted successfully" });
  });
});

// GET live/published products (for website display)
app.get("/products/live", (req, res) => {
  const query = `
    SELECT product_id, product_name, product_desc
    FROM Products
    WHERE status = 'Published' AND is_deleted = FALSE
  `;
  
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
