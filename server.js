const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your MySQL username
    password: 'Murthu$@5555', // replace with your MySQL password
    database: 'mydb'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database.');
});

// GET method
app.get('/users', (req, res) => {
    db.query('SELECT * FROM user', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// POST method
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    db.query('INSERT INTO user (name, email) VALUES (?, ?)', [name, email], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, name, email });
    });
});

// PUT method
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    db.query('UPDATE user SET name = ?, email = ? WHERE id = ?', [name, email, id], (err) => {
        if (err) throw err;
        res.json({ id, name, email });
    });
});

// DELETE method
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM user WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'User deleted' });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
