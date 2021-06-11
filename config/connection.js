// Include MySQL2 libraries
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Ch00Ch00Tr@1n',
        database: 'employee_manager'
    },
    console.log('Connected to the << employee_manager >> database.')
);

module.exports = db;