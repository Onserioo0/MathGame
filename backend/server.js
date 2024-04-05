// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;
const db = new sqlite3.Database(':memory:');

app.use(bodyParser.json());

// Initialize database
db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
  db.run("CREATE TABLE results (id INTEGER PRIMARY KEY, username TEXT, score INTEGER)");
});

// Registration endpoint
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const query = "INSERT INTO users (username, password) VALUES (?, ?)";
  
  db.run(query, [username, password], function(err) {
    if (err) {
      res.status(500).json({ status: "failure", message: err.message });
      return;
    }
    res.json({ status: "success" });
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT id FROM users WHERE username = ? AND password = ?";
  
  db.get(query, [username, password], (err, row) => {
    if (err) {
      res.status(500).json({ status: "failure", message: err.message });
      return;
    }
    if (row) {
      res.json({ status: "success" });
    } else {
      res.json({ status: "failure", message: "Invalid credentials" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
