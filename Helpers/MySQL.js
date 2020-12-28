const mysql = require('mysql');
const CONFIG = require('../Config/MySQL.Config');

const db = mysql.createConnection({
    host     : CONFIG.HOST,
    database : CONFIG.NAME,
    user     : CONFIG.USER,
    password : CONFIG.PASS
});

module.exports = db;