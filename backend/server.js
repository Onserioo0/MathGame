// backend/server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQLite database.');
});

db.run('CREATE TABLE users(username TEXT PRIMARY KEY, password TEXT)', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Users table created.');
});

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Hash password
  const query = 'INSERT INTO users(username, password) VALUES(?, ?)';

  db.run(query, [username, hashedPassword], (err) => {
    if (err) {
      res.json({ status: 'failure', message: err.message });
    } else {
      res.json({ status: 'success' });
    }
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ?';

  db.get(query, [username], async (err, row) => {
    if (err) {
      res.json({ status: 'failure', message: err.message });
    } else if (row && await bcrypt.compare(password, row.password)) {
      res.json({ status: 'success' });
    } else {
      res.json({ status: 'failure', message: 'Username and/or password incorrect' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
