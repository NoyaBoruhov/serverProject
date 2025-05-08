const express = require('express');
const app = express();

app.use(express.json());
//קבלת כל  המישתמשים מהבסיס הנתונים
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    DB.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
});

//הוספת מישתמש חדש
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    DB.query(sql, [name, email], (err, result) => {
        if (err) return res.status(500).json({ error: 'Insert failed' });
        res.status(201).json({ id: result.insertId, name, email });
    });
});

//עידכון מישתמש
app.put('/users/:id', (req, res) => {
    const { name, email } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    DB.query(sql, [id, name, email], (err, result) => {
        if (err) return res.status(500).json({ error: 'Update failed' });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
        res.json({ id, name, email });
    });
});

//מחיקת מישתמש
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    DB.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Delete failed' });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
        res.sendStatus(204); // הצלחה ללא תוכן
    });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});