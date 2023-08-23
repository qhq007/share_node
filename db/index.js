const mysql = require("mysql");
const db = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"12345",
    database:"share"
});
module.exports = db;