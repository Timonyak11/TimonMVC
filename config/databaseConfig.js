const Mysql = require('../system/node_modules/mysql2');

const database = Mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'R00tP@ss123',
    database: 'users',
});

module.exports = database;