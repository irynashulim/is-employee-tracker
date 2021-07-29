const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    //MySQL username,
    user: 'root',
    //MySQL password
    password: 'UT2021AustinTx!',
    database: 'employeeTracker'
  });

  module.exports = db;