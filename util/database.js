const sql = require('mysql2');

const pool = sql.createPool({
    host: 'localhost',
    user: 'root',
    database:'appointments',
    password: '#Ash28jun#'
});

module.exports = pool.promise();