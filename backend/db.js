const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345', // <-- cámbiala por la real
  database: 'santiagoblues',
  port: 3307 // o 3307 si usaste otro puerto durante la instalación
});

module.exports = { db };
