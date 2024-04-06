// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // Import cors module

const app = express();
const port = 3000;
const db = new sqlite3.Database(':memory:');

app.use(bodyParser.json());
app.use(cors()); 

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

app.get('/leaderboard', (req, res) => {
  // Assuming you have a table "results" with columns "username" and "score"
  const query = "SELECT username, score FROM results ORDER BY score DESC LIMIT 10"; // Adjust according to your data structure

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({status: "error", message: err.message});
      return;
    }
    res.json({status: "success", leaderboard: rows});
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
