const express = require('express');
const app = express();

app.use(express.json());

app.get('/posts', (req, res) => {
    const sql = 'SELECT * FROM posts';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
});

app.post('/posts', (req, res) => {
    const { title, body } = req.body;
    const sql = 'INSERT INTO posts (title, body) VALUES (?, ?)';
    db.query(sql, [title, body], (err, result) => {
        if (err) return res.status(500).json({ error: 'Insert failed' });
        res.status(201).json({ id: result.insertId, title, body });
    });
});

app.put('/posts/:id', (req, res) => {
    const { title, body } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE posts SET title = ?, body = ? WHERE id = ?';
    db.query(sql, [id, title, body], (err, result) => {
        if (err) return res.status(500).json({ error: 'Update failed' });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Post not found' });
        res.json({ id, title, body });
    });
});

app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM posts WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Delete failed' });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Post not found' });
        res.sendStatus(204); // הצלחה ללא תוכן
    });
})

const PORT = 3000;  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});