const express = require('express');
let mysql = require('mysql2');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json()); // Agar bisa menerima JSON dari POST

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3309',
    password: 'Qilqil.123',
    database: 'mahasiswa'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err.stack);
        return;
    }
    console.log('Connected to MySQL database succesfully ' + db.threadId);
});

app.get('/mahasiswa', (req, res) => {
    db.query('SELECT * FROM biodata', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/mahasiswa', (req, res) => {
    const { nama, alamat, agama } = req.body;
    if (!nama || !alamat || !agama) {
        return res.status(400).json({ error: 'Nama dan NIM wajib diisi' });
    }
    db.query('INSERT INTO mahasiswa (nama, alamat, agama) VALUES (?, ?, ?)', [nama, alamat, agama], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Data mahasiswa berhasil ditambahkan', id: result.insertId });
    });
});

// Endpoint root
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
