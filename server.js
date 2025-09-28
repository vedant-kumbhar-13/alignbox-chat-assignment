const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();
const PORT = 3000;


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', 
    database: 'chat_app'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('MySQL Connected...');
});

app.use(express.static(path.join(__dirname)));
app.use(express.json());


app.get('/api/messages', (req, res) => {
    let sql = 'SELECT * FROM messages ORDER BY timestamp ASC';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});


app.post('/api/messages', (req, res) => {
   
    const { message, sender } = req.body;
    
    if (!message || !sender) {
        return res.status(400).send({ error: 'Message and sender are required.' });
    }
    
    let post = { message, sender };
    let sql = 'INSERT INTO messages SET ?';
    db.query(sql, post, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Database error.' });
        }
        res.status(201).send({ status: 'Message saved', insertId: result.insertId });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

