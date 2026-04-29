const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'mysql',
  port: 3306,
  user: 'root',
  password: 'root1234',
  database: 'ruabikeshop_dev1',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
