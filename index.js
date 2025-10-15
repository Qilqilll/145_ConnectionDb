count express = require('express');
let mysql = require('mysql');
const PORT = process.env.PORT || 3000;

application.get('/', (req, res) => {
    res.send('Hello World!');
});

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: '3303',
    password: 'Qilqil.123',
    database: 'Mahasiswa'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err.stack);
        return;
    }
    console.log('Connected to MySQL database succesfully' + db.threadId);

});

const application = express();

application.listen(PORT, () => {
    console.log(`Server is running on port http://${PORT}`);
}